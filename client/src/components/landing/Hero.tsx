import { HandCoins } from "lucide-react";
import Image from "../image";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-3xl md:text-7xl">{children}</h2>;
};

const Hero = () => {
  return (
    <div className="flex flex-col gap-5 px-10 mx-10 items-center justify-center">
      <LandingHeader />
      <section className="flex flex-col md:flex-row items-center p-5 md:p-10 gap-5">
        <SectionTitle>Analyse your investments</SectionTitle>
        <Image
          src="stock_dark.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block "
        />
        <Image
          src="stock_light.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
      </section>
      <section className="flex flex-col md:flex-row items-center p-5 md:p-10 gap-5">
        <Image
          src="dark-web3.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block "
        />
        <Image
          src="light-web3.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
        <SectionTitle> Make and track web3 transactions with ease</SectionTitle>
      </section>
      <section className="flex flex-col-reverse md:flex-row items-center p-5 md:p-10 gap-5">
        <SectionTitle> Keep up on the latest news and trends</SectionTitle>
        <Image
          src="home_dark.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block"
        />
        <Image
          src="home_light.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
      </section>
    </div>
  );
};

const LandingHeader = () => {
  return (
    <div className=" flex flex-col gap-5 items-center">
      <h1 className="text-5xl md:text-9xl flex flex-col">
        <span className="flex gap-5 items-center justify-center title font-semibold">
          <HandCoins className="h-20 w-20" />
          Tradewise
        </span>
        <span className="text-5xl md:text-7xl text-wrap">
          The all-in-one finance app
        </span>
      </h1>
      <p>
        Whether it's stocks, crypto or assets of any form, we've got you
        covered.
      </p>
    </div>
  );
};

export default Hero;
