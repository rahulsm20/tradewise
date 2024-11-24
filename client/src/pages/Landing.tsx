import { HandCoins } from "lucide-react";
import { ModeToggle } from "../components/dark-mode-toggle";
import Hero from "../components/landing/Hero";
import LoginButton from "../components/login";
import TWFooter from "../components/TWFooter";

const Landing = () => {
  return (
    <div className="landing text-end flex flex-col gap-10">
      <div className="flex flex-wrap items-center p-4 gap-3 justify-around sticky top-0 z-10 backdrop-blur-3xl text-xs">
        <p className="flex gap-2 justify-center items-center text-lg">
          <HandCoins />
          Tradewise
        </p>
        <div className="flex gap-5">
          <LoginButton />
          <ModeToggle />
        </div>
      </div>
      <Hero />
      <TWFooter />
    </div>
  );
};

export default Landing;
