// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title MagnifyWorld
 * @dev A contract for managing NFT-backed loans with different tiers
 * @notice This contract allows users to mint NFTs and use them as collateral for loans
 * @custom:security-contact security@magnifyworld.com
 */
contract MagnifyWorld is ERC721, Ownable, ReentrancyGuard {
    // State Variables
    uint256 private _tokenIds;
    IERC20 public immutable loanToken;
    uint256 public tierCount;

    // Mappings
    mapping(uint256 => uint256) public nftToTier;
    mapping(uint256 => Tier) public tiers;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256) public hasNFT;

    /**
     * @dev Tier structure defining loan parameters for each tier
     * @param loanAmount The amount that can be borrowed in this tier
     * @param interestRate Interest rate in basis points (1/100th of a percent)
     * @param loanPeriod Duration of the loan in seconds
     */
    struct Tier {
        uint256 loanAmount;
        uint256 interestRate;
        uint256 loanPeriod;
    }

    /**
     * @dev Loan structure containing active loan details
     * @param amount The borrowed amount
     * @param startTime Timestamp when the loan was initiated
     * @param isActive Whether the loan is currently active
     * @param interestRate Interest rate for this specific loan
     * @param loanPeriod Duration of this specific loan
     */
    struct Loan {
        uint256 amount;
        uint256 startTime;
        bool isActive;
        uint256 interestRate;
        uint256 loanPeriod;
    }

    // Events
    event TierAdded(
        uint256 indexed tierId,
        uint256 loanAmount,
        uint256 interestRate,
        uint256 loanPeriod
    );
    event TierUpdated(
        uint256 indexed tierId,
        uint256 newLoanAmount,
        uint256 newInterestRate,
        uint256 newLoanPeriod
    );
    event LoanRequested(
        uint256 indexed tokenId,
        uint256 amount,
        address borrower
    );
    event LoanRepaid(
        uint256 indexed tokenId,
        uint256 repaymentAmount,
        address borrower
    );
    event NFTMinted(uint256 indexed tokenId, address to, uint256 tier);
    event NFTUpgraded(
        uint256 indexed tokenId,
        uint256 newTierId,
        address owner
    );

    // Errors
    error InvalidTierParameters();
    error TierDoesNotExist();
    error UserAlreadyHasNFT();
    error NFTDoesNotExist();
    error NotNFTOwner();
    error LoanAlreadyActive();
    error InsufficientContractBalance();
    error TransferFailed();
    error LoanNotActive();
    error LoanExpired();
    error InsufficientAllowance();
    error NoContractBalance();

    /**
     * @dev Constructor to initialize the contract and create default tiers
     * @param _loanToken Address of the ERC20 token used for loans
     */
    constructor(
        address _loanToken
    ) ERC721("MagnifyWorld", "MAGWORLD") Ownable(msg.sender) {
        if (_loanToken == address(0)) revert("Invalid token address");
        loanToken = IERC20(_loanToken);

        // Create default tiers
        // Tier 1: 1 token, 2.5% interest, 30 days
        tiers[1] = Tier(1 * 1e6, 250, 30 days);
        emit TierAdded(1, 1 * 1e6, 250, 30 days);

        // Tier 2: 5 tokens, 2% interest, 60 days
        tiers[2] = Tier(5 * 1e6, 200, 60 days);
        emit TierAdded(2, 5 * 1e6, 200, 60 days);

        // Tier 3: 10 tokens, 1.5% interest, 90 days
        tiers[3] = Tier(10 * 1e6, 150, 90 days);
        emit TierAdded(3, 10 * 1e6, 150, 90 days);

        // Set initial tier count
        tierCount = 3;
    }

    /**
     * @dev Internal function to validate tier parameters
     * @param loanAmount Amount that can be borrowed
     * @param interestRate Interest rate in basis points
     * @param loanPeriod Loan duration in seconds
     */
    function _checkTier(
        uint256 loanAmount,
        uint256 interestRate,
        uint256 loanPeriod
    ) private pure returns (bool) {
        return loanAmount > 0 && interestRate > 0 && loanPeriod > 0;
    }

    /**
     * @dev Adds a new tier with specified parameters
     * @param loanAmount Amount that can be borrowed in this tier
     * @param interestRate Interest rate in basis points
     * @param loanPeriod Loan duration in seconds
     */
    function addTier(
        uint256 loanAmount,
        uint256 interestRate,
        uint256 loanPeriod
    ) external onlyOwner {
        if (!_checkTier(loanAmount, interestRate, loanPeriod))
            revert InvalidTierParameters();

        tierCount++;
        tiers[tierCount] = Tier(loanAmount, interestRate, loanPeriod);

        emit TierAdded(tierCount, loanAmount, interestRate, loanPeriod);
    }

    /**
     * @dev Updates an existing tier's parameters
     * @param tierId ID of the tier to update
     * @param newLoanAmount New loan amount
     * @param newInterestRate New interest rate
     * @param newLoanPeriod New loan period
     */
    function updateTier(
        uint256 tierId,
        uint256 newLoanAmount,
        uint256 newInterestRate,
        uint256 newLoanPeriod
    ) external onlyOwner {
        if (tierId > tierCount) revert TierDoesNotExist();
        if (!_checkTier(newLoanAmount, newInterestRate, newLoanPeriod))
            revert InvalidTierParameters();

        tiers[tierId] = Tier(newLoanAmount, newInterestRate, newLoanPeriod);

        emit TierUpdated(tierId, newLoanAmount, newInterestRate, newLoanPeriod);
    }

    /**
     * @dev Mints a new NFT to the specified address with the given tier
     * @param to Address to mint the NFT to
     * @param tierId Tier ID to assign to the NFT
     */
    function mintNFT(address to, uint256 tierId) external onlyOwner {
        if (tierId == 0 || tierId > tierCount) revert InvalidTierParameters();
        if (hasNFT[to] > 0) revert UserAlreadyHasNFT();

        _tokenIds++;
        _safeMint(to, _tokenIds);
        nftToTier[_tokenIds] = tierId;
        hasNFT[to] = _tokenIds;

        emit NFTMinted(_tokenIds, to, tierId);
    }

    /**
     * @dev Upgrades an existing NFT to a new tier
     * @param tokenId ID of the NFT to upgrade
     * @param newTierId New tier ID to assign
     */
    function upgradeNFT(uint256 tokenId, uint256 newTierId) external onlyOwner {
        try this.ownerOf(tokenId) returns (address) {
            // Token exists, proceed
        } catch {
            revert NFTDoesNotExist();
        }

        if (newTierId == 0 || newTierId > tierCount)
            revert InvalidTierParameters();

        nftToTier[tokenId] = newTierId;

        emit NFTUpgraded(tokenId, newTierId, ownerOf(tokenId));
    }

    /**
     * @dev Checks if an address owns a specific NFT
     * @param owner Address to check
     * @param tokenId Token ID to verify
     * @return bool True if the address owns the NFT
     */
    function checkOwnership(
        address owner,
        uint256 tokenId
    ) public view returns (bool) {
        return ownerOf(tokenId) == owner;
    }

    /**
     * @dev Override of _update to prevent NFT transfers
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = super._update(to, tokenId, auth);
        if (from != address(0) && to != address(0))
            revert("NFTs cannot be transferred");
        return from;
    }

    /**
     * @dev Allows NFT owner to request a loan based on their tier
     * @notice This function automatically uses the NFT associated with the msg.sender
     */
    function requestLoan() external nonReentrant {
        uint256 tokenId = hasNFT[msg.sender];
        if (tokenId == 0) revert NotNFTOwner();
        if (loans[tokenId].isActive) revert LoanAlreadyActive();

        uint256 tId = nftToTier[tokenId];
        if (tId == 0 || tId > tierCount) revert InvalidTierParameters();

        // Check if the tokenId actually exists in the contract
        if (ownerOf(tokenId) != msg.sender) revert NotNFTOwner();

        Tier memory t = tiers[tId];
        if (loanToken.balanceOf(address(this)) < t.loanAmount)
            revert InsufficientContractBalance();

        // Check for potential overflow in loan amount calculation
        uint256 maxLoanAmount = type(uint256).max;
        if (t.loanAmount > maxLoanAmount) revert("Loan amount too high");

        // Check if the contract's balance is sufficient even after accounting for other loans
        uint256 totalLoanedOut = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (loans[i].isActive) {
                totalLoanedOut += loans[i].amount;
            }
        }
        if (totalLoanedOut + t.loanAmount > loanToken.balanceOf(address(this)))
            revert InsufficientContractBalance();

        loans[tokenId] = Loan(
            t.loanAmount,
            block.timestamp,
            true,
            t.interestRate,
            t.loanPeriod
        );

        if (!loanToken.transfer(msg.sender, t.loanAmount))
            revert TransferFailed();

        emit LoanRequested(tokenId, t.loanAmount, msg.sender);
    }

    /**
     * @dev Allows borrower to repay their loan
     * @param tokenId ID of the NFT used as collateral
     */
    function repayLoan(uint256 tokenId) external nonReentrant {
        if (!loans[tokenId].isActive) revert LoanNotActive();
        if (msg.sender != ownerOf(tokenId)) revert NotNFTOwner();

        Loan memory loan = loans[tokenId];
        if (block.timestamp > loan.startTime + loan.loanPeriod)
            revert LoanExpired();

        uint256 interest = (loan.amount * loan.interestRate) / 10000;
        uint256 total = loan.amount + interest;

        if (loanToken.allowance(msg.sender, address(this)) < total)
            revert InsufficientAllowance();
        if (!loanToken.transferFrom(msg.sender, address(this), total))
            revert TransferFailed();

        loans[tokenId].isActive = false;

        emit LoanRepaid(tokenId, total, msg.sender);
    }

    /**
     * @dev Allows owner to withdraw accumulated loan tokens
     */
    function withdrawLoanToken() external onlyOwner {
        uint256 balance = loanToken.balanceOf(address(this));
        if (balance == 0) revert NoContractBalance();

        if (!loanToken.transfer(msg.sender, balance)) revert TransferFailed();
    }

    /**
     * @dev Returns all active loans for a specific address
     * @param wallet Address to check
     * @return uint256[] Array of token IDs with active loans
     */
    function fetchLoansByAddress(
        address wallet
    ) external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](_tokenIds);
        uint256 count = 0;

        for (uint256 i = 1; i <= _tokenIds; i++) {
            if (ownerOf(i) == wallet && loans[i].isActive) {
                result[count++] = i;
            }
        }

        uint256[] memory loansForWallet = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            loansForWallet[i] = result[i];
        }

        return loansForWallet;
    }

    /**
     * @dev Returns detailed information about a specific loan
     * @param tokenId ID of the NFT/loan to query
     * @return amountBorrowed The original borrowed amount
     * @return dueDate Timestamp when the loan is due
     * @return totalDue Total amount due including interest
     */
    function fetchLoanInfo(
        uint256 tokenId
    )
        external
        view
        returns (uint256 amountBorrowed, uint256 dueDate, uint256 totalDue)
    {
        if (!loans[tokenId].isActive) revert LoanNotActive();

        Loan memory loan = loans[tokenId];
        return (
            loan.amount,
            loan.startTime + loan.loanPeriod,
            loan.amount + ((loan.amount * loan.interestRate) / 10000)
        );
    }
}
