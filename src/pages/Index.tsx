import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, Clock, Wallet, HelpCircle, X, Settings } from "lucide-react";
import { toast } from "sonner";
import SignInModal from "@/components/SignInModal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FundingOptions } from "@/components/FundingOptions";
import { MascotIllustration } from "@/components/MascotIllustration";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"verify" | "onboarding" | "dashboard">("verify");
  const [onboardingSlide, setOnboardingSlide] = useState(1);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showFundingOptions, setShowFundingOptions] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const handleSignIn = () => {
    console.log("User signed in successfully");
    setCurrentStep("onboarding");
  };

  const handleNextSlide = () => {
    if (onboardingSlide < 3) {
      setOnboardingSlide(prev => prev + 1);
    } else {
      setCurrentStep("dashboard");
      toast.success("Welcome to MAGBot! You're all set to start.");
    }
  };

  const handleBuy = () => {
    console.log("Buy button clicked");
    toast.info("Buy feature coming soon!");
    setShowFundingOptions(true);
  };

  const handleSend = () => {
    console.log("Send button clicked");
    toast.info("Send feature coming soon!");
  };

  const handleLoan = () => {
    console.log("Loan button clicked");
    toast.info("Loan feature coming soon!");
  };

  const renderOnboardingSlide = () => {
    const slides = [
      {
        title: "Welcome to MAGBot",
        description: "Your gateway to gas-free loans on Base. Let's get you started with a quick tour!",
        buttonText: "Next"
      },
      {
        title: "Verify & Borrow",
        description: "Use World ID to verify your identity and unlock higher loan limits. Start with small amounts to build trust.",
        buttonText: "Continue"
      },
      {
        title: "Ready to Begin",
        description: "You're all set! Start by checking your wallet and exploring available loan options.",
        buttonText: "Get Started"
      }
    ];

    const currentSlide = slides[onboardingSlide - 1];

    return (
      <div className="space-y-8 animate-fade-up p-6">
        <div className="relative">
          <MascotIllustration step={onboardingSlide as 1 | 2 | 3} />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === onboardingSlide ? "bg-brand-turquoise w-4" : "bg-brand-skyBlue"
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-brand-text-primary">
            {currentSlide.title}
          </h2>
          <p className="text-brand-text-secondary">
            {currentSlide.description}
          </p>
          <Button
            className="w-full bg-main-gradient hover:scale-105 transition-all duration-300 text-white rounded-full py-6 shadow-lg"
            onClick={handleNextSlide}
          >
            {currentSlide.buttonText}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] font-['Bai_Jamjuree'] bg-radial-gradient">
      <div className="max-w-md mx-auto relative">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center p-4 border-b border-white/20 backdrop-blur-sm bg-white/50 sticky top-0 z-10">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="h-6 w-6 text-brand-text-primary" />
          </button>
          <h1 className="text-xl font-semibold text-brand-text-primary p-1 rounded bg-gradient-to-r from-brand-turquoise to-brand-coral bg-[length:100%_2px] bg-no-repeat bg-bottom">
            MAGBot
          </h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings className="h-6 w-6 text-brand-text-primary" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {currentStep === "verify" && (
            <div className="space-y-8 text-center animate-fade-up">
              <div className="w-24 h-24 mx-auto bg-main-gradient rounded-xl flex items-center justify-center p-1 shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                  <img src="/lovable-uploads/b46231ff-456c-4295-be5d-1c49f557cea5.png" alt="World ID Logo" className="w-16 h-16" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-medium mb-2 text-brand-text-secondary p-1 rounded bg-gradient-to-r from-brand-turquoise to-brand-coral bg-[length:100%_2px] bg-no-repeat bg-bottom">
                  Sign in with World ID to secure a loan against your identity
                </h2>
                <p className="text-brand-text-secondary text-sm">To start exploring MAGBot</p>
              </div>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-main-gradient hover:scale-105 transition-all duration-300 text-white rounded-full py-6 shadow-lg"
                  onClick={() => setShowSignInModal(true)}
                >
                  Sign in with World ID
                </Button>
                <p className="text-xs text-brand-text-secondary">
                  By clicking, you agree with <button className="text-brand-coral hover:underline">Terms</button>
                </p>
              </div>
            </div>
          )}

          {currentStep === "onboarding" && renderOnboardingSlide()}

          {currentStep === "dashboard" && (
            <div className="animate-fade-up">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2 text-brand-text-primary">$43.04</h2>
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex justify-center gap-4">
                    <Button 
                      className="rounded-full bg-brand-skyBlue text-brand-text-primary px-8 hover:bg-main-gradient hover:text-white hover:scale-105 transition-all duration-300"
                      onClick={handleBuy}
                    >
                      Buy
                    </Button>
                    <Button 
                      className="rounded-full bg-brand-skyBlue text-brand-text-primary px-8 hover:bg-main-gradient hover:text-white hover:scale-105 transition-all duration-300"
                      onClick={handleSend}
                    >
                      Send
                    </Button>
                  </div>
                  <Button
                    className="rounded-full bg-brand-skyBlue text-brand-text-primary px-8 mx-auto w-fit hover:bg-main-gradient hover:text-white hover:scale-105 transition-all duration-300"
                    onClick={handleLoan}
                  >
                    Get a Loan
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Worldcoin", symbol: "WLD", balance: "16.24", change: "-5.65%" },
                  { name: "Dollars", symbol: "USDC.E", balance: "0.00", change: "+0.01%" },
                  { name: "Bitcoin", symbol: "WBTC", balance: "0.00", change: "-3.03%" },
                  { name: "Ethereum", symbol: "WETH", balance: "0.00", change: "-3.46%" },
                ].map((token) => (
                  <div key={token.symbol} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-main-gradient p-[1px]">
                          <div className="w-full h-full rounded-full bg-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-text-primary">{token.name}</h3>
                          <p className="text-sm text-brand-text-secondary">{token.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand-text-primary">${token.balance}</p>
                        <p className={`text-sm ${token.change.startsWith("+") ? "text-brand-success" : "text-brand-error"}`}>
                          {token.change}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <SignInModal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          onSignIn={handleSignIn}
        />

        {/* Bottom Sheet for Funding Options */}
        <Sheet open={showFundingOptions} onOpenChange={setShowFundingOptions}>
          <SheetContent side="bottom" className="h-[400px]">
            <FundingOptions onClose={() => setShowFundingOptions(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Index;