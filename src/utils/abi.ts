export const abi = [
  {
    inputs: [
      { internalType: "address", name: "_obligationNotes", type: "address" },
      { internalType: "address", name: "_lendingKeys", type: "address" },
      { internalType: "uint256", name: "_loanOriginationFee", type: "uint256" },
      { internalType: "address", name: "_platformWallet", type: "address" },
      { internalType: "address", name: "_initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  { inputs: [], name: "AlreadyInitialized", type: "error" },
  { inputs: [], name: "AmountIsZero", type: "error" },
  { inputs: [], name: "CallerIsNotBorrower", type: "error" },
  { inputs: [], name: "CallerIsNotLender", type: "error" },
  { inputs: [], name: "CallerIsNotLendingDeskOwner", type: "error" },
  { inputs: [], name: "ERC20IsZeroAddr", type: "error" },
  { inputs: [], name: "EnforcedPause", type: "error" },
  { inputs: [], name: "ExpectedPause", type: "error" },
  { inputs: [], name: "FailedInnerCall", type: "error" },
  { inputs: [], name: "InsufficientLendingDeskBalance", type: "error" },
  { inputs: [], name: "InterestRateTooHigh", type: "error" },
  { inputs: [], name: "InvalidInterest", type: "error" },
  { inputs: [], name: "InvalidLendingDeskId", type: "error" },
  { inputs: [], name: "InvalidLoanId", type: "error" },
  { inputs: [], name: "InvalidNFTCollection", type: "error" },
  { inputs: [], name: "LendingDeskIsNotActive", type: "error" },
  { inputs: [], name: "LendingDeskIsNotEmpty", type: "error" },
  { inputs: [], name: "LendingDeskIsNotFrozen", type: "error" },
  { inputs: [], name: "LendingKeysIsZeroAddr", type: "error" },
  { inputs: [], name: "LoanAmountTooHigh", type: "error" },
  { inputs: [], name: "LoanAmountTooLow", type: "error" },
  { inputs: [], name: "LoanDurationTooHigh", type: "error" },
  { inputs: [], name: "LoanDurationTooLow", type: "error" },
  { inputs: [], name: "LoanHasDefaulted", type: "error" },
  { inputs: [], name: "LoanHasNotDefaulted", type: "error" },
  { inputs: [], name: "LoanIsNotActive", type: "error" },
  { inputs: [], name: "LoanMustBeActiveForMin1Hour", type: "error" },
  { inputs: [], name: "LoanPaymentExceedsDebt", type: "error" },
  { inputs: [], name: "MaxAmountIsLessThanMin", type: "error" },
  { inputs: [], name: "MaxDurationIsLessThanMin", type: "error" },
  { inputs: [], name: "MaxInterestIsLessThanMin", type: "error" },
  { inputs: [], name: "MinAmountIsZero", type: "error" },
  { inputs: [], name: "MinDurationIsZero", type: "error" },
  { inputs: [], name: "MinInterestIsZero", type: "error" },
  { inputs: [], name: "NewOwnerIsZeroAddress", type: "error" },
  { inputs: [], name: "NoHandoverRequest", type: "error" },
  { inputs: [], name: "ObligationNotesIsZeroAddr", type: "error" },
  { inputs: [], name: "PlatformWalletIsZeroAddr", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "Unauthorized", type: "error" },
  { inputs: [], name: "UnsupportedNFTCollection", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "DefaultedLoanLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountDeposited",
        type: "uint256",
      },
    ],
    name: "LendingDeskLiquidityDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountWithdrawn",
        type: "uint256",
      },
    ],
    name: "LendingDeskLiquidityWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
    ],
    name: "LendingDeskLoanConfigRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "nftCollection", type: "address" },
          {
            internalType: "bool",
            name: "nftCollectionIsErc1155",
            type: "bool",
          },
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "maxAmount", type: "uint256" },
          { internalType: "uint32", name: "minInterest", type: "uint32" },
          { internalType: "uint32", name: "maxInterest", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint32", name: "maxDuration", type: "uint32" },
        ],
        indexed: false,
        internalType: "struct IMagnifyCashV1.LoanConfig[]",
        name: "loanConfigs",
        type: "tuple[]",
      },
    ],
    name: "LendingDeskLoanConfigsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "freeze", type: "bool" },
    ],
    name: "LendingDeskStateSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanOriginationFee",
        type: "uint256",
      },
    ],
    name: "LoanOriginationFeeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountPaid",
        type: "uint256",
      },
      { indexed: false, internalType: "bool", name: "resolved", type: "bool" },
    ],
    name: "LoanPaymentMade",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "erc20",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialBalance",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "nftCollection", type: "address" },
          {
            internalType: "bool",
            name: "nftCollectionIsErc1155",
            type: "bool",
          },
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "maxAmount", type: "uint256" },
          { internalType: "uint32", name: "minInterest", type: "uint32" },
          { internalType: "uint32", name: "maxInterest", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint32", name: "maxDuration", type: "uint32" },
        ],
        indexed: false,
        internalType: "struct IMagnifyCashV1.LoanConfig[]",
        name: "loanConfigs",
        type: "tuple[]",
      },
    ],
    name: "NewLendingDeskInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "lendingDeskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftCollection",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "NewLoanInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "OwnershipHandoverCanceled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pendingOwner",
        type: "address",
      },
    ],
    name: "OwnershipHandoverRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "platformWallet",
        type: "address",
      },
    ],
    name: "PlatformWalletSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "obligationNotes",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lendingKeys",
        type: "address",
      },
    ],
    name: "ProtocolInitialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "cancelOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pendingOwner", type: "address" },
    ],
    name: "completeOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lendingDeskId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "depositLendingDeskLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_loanId", type: "uint256" }],
    name: "getLoanAmountDue",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_erc20", type: "address" },
      { internalType: "uint256", name: "_depositAmount", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "nftCollection", type: "address" },
          {
            internalType: "bool",
            name: "nftCollectionIsErc1155",
            type: "bool",
          },
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "maxAmount", type: "uint256" },
          { internalType: "uint32", name: "minInterest", type: "uint32" },
          { internalType: "uint32", name: "maxInterest", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint32", name: "maxDuration", type: "uint32" },
        ],
        internalType: "struct IMagnifyCashV1.LoanConfig[]",
        name: "_loanConfigs",
        type: "tuple[]",
      },
    ],
    name: "initializeNewLendingDesk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint64", name: "_lendingDeskId", type: "uint64" },
      { internalType: "address", name: "_nftCollection", type: "address" },
      { internalType: "uint256", name: "_nftId", type: "uint256" },
      { internalType: "uint32", name: "_duration", type: "uint32" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint32", name: "_maxInterestAllowed", type: "uint32" },
    ],
    name: "initializeNewLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lendingDeskIdCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "lendingDeskLoanConfigs",
    outputs: [
      { internalType: "address", name: "nftCollection", type: "address" },
      { internalType: "bool", name: "nftCollectionIsErc1155", type: "bool" },
      { internalType: "uint256", name: "minAmount", type: "uint256" },
      { internalType: "uint256", name: "maxAmount", type: "uint256" },
      { internalType: "uint32", name: "minInterest", type: "uint32" },
      { internalType: "uint32", name: "maxInterest", type: "uint32" },
      { internalType: "uint32", name: "minDuration", type: "uint32" },
      { internalType: "uint32", name: "maxDuration", type: "uint32" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "lendingDesks",
    outputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      {
        internalType: "enum IMagnifyCashV1.LendingDeskStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lendingKeys",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_loanId", type: "uint256" }],
    name: "liquidateDefaultedLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "loanIdCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "loanOriginationFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "loans",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "amountPaidBack", type: "uint256" },
      { internalType: "address", name: "nftCollection", type: "address" },
      { internalType: "uint64", name: "startTime", type: "uint64" },
      { internalType: "uint256", name: "nftId", type: "uint256" },
      { internalType: "uint64", name: "lendingDeskId", type: "uint64" },
      { internalType: "uint32", name: "duration", type: "uint32" },
      { internalType: "uint32", name: "interest", type: "uint32" },
      {
        internalType: "enum IMagnifyCashV1.LoanStatus",
        name: "status",
        type: "uint8",
      },
      { internalType: "bool", name: "nftCollectionIsErc1155", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "bool", name: "_resolve", type: "bool" },
    ],
    name: "makeLoanPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "obligationNotes",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "result", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "pendingOwner", type: "address" },
    ],
    name: "ownershipHandoverExpiresAt",
    outputs: [{ internalType: "uint256", name: "result", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "platformWallet",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lendingDeskId", type: "uint256" },
      { internalType: "address", name: "_nftCollection", type: "address" },
    ],
    name: "removeLendingDeskLoanConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestOwnershipHandover",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lendingDeskId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "nftCollection", type: "address" },
          {
            internalType: "bool",
            name: "nftCollectionIsErc1155",
            type: "bool",
          },
          { internalType: "uint256", name: "minAmount", type: "uint256" },
          { internalType: "uint256", name: "maxAmount", type: "uint256" },
          { internalType: "uint32", name: "minInterest", type: "uint32" },
          { internalType: "uint32", name: "maxInterest", type: "uint32" },
          { internalType: "uint32", name: "minDuration", type: "uint32" },
          { internalType: "uint32", name: "maxDuration", type: "uint32" },
        ],
        internalType: "struct IMagnifyCashV1.LoanConfig[]",
        name: "_loanConfigs",
        type: "tuple[]",
      },
    ],
    name: "setLendingDeskLoanConfigs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lendingDeskId", type: "uint256" },
      { internalType: "bool", name: "_freeze", type: "bool" },
    ],
    name: "setLendingDeskState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanOriginationFee", type: "uint256" },
    ],
    name: "setLoanOriginationFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_paused", type: "bool" }],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_platformWallet", type: "address" },
    ],
    name: "setPlatformWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_lendingDeskId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "withdrawLendingDeskLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
