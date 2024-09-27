import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { HandCoins } from "lucide-react";
import { ModeToggle } from "../components/dark-mode-toggle";
import Hero from "../components/landing/Hero";
import TWFooter from "../components/TWFooter";
import { Button } from "../@/components/ui/button";

const Landing = () => {
  return (
    <div className="landing text-end flex flex-col gap-10 body">
      <div className="flex flex-wrap items-center p-4 gap-3 justify-around sticky top-0 z-10 backdrop-blur-3xl text-xs">
        <p className="flex gap-2 justify-center items-center text-lg">
          <HandCoins />
          Tradewise
        </p>
        <div className="flex gap-5">
          <SignInButton>
            <Button variant="outline" className="rounded-full">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline" className="rounded-full">
              Sign Up
            </Button>
          </SignUpButton>
          <ModeToggle />
        </div>
      </div>
      <Hero />
      <TWFooter />
    </div>
  );
};

export default Landing;
