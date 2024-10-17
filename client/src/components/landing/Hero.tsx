import { HandCoins } from "lucide-react";
import Image from "../image";
import { Card } from "../../@/components/ui/card";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-3xl md:text-7xl">{children}</h2>;
};

const Hero = () => {
  return (
    <div className="flex flex-col gap-10 px-10 mx-10 items-center justify-center body">
      <LandingHeader />
      <Card>
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
      </Card>
      <Card>
        <section className="flex flex-col-reverse md:flex-row items-center p-5 md:p-10 gap-5">
          <Image
            src="web3_dark.PNG"
            className="w-full md:w-1/2 rounded-lg hidden dark:block "
          />
          <Image
            src="web3_light.PNG"
            className="w-full md:w-1/2 rounded-lg dark:hidden"
          />
          <SectionTitle>
            {" "}
            Make and track web3 transactions with ease
          </SectionTitle>
        </section>
      </Card>
      <Card>
        <section className="flex flex-col md:flex-row items-center  p-5 md:p-10 gap-10">
          <SectionTitle>
            Analyse your expenses with the help of visualizations
          </SectionTitle>
          <div className="flex flex-row flex-wrap gap-10 w-full md:w-1/2">
            <Image
              src="expense_dark.PNG"
              className="w-full rounded-lg hidden dark:block "
            />
            <Image
              src="expense2_dark.PNG"
              className="w-full rounded-lg hidden dark:block "
            />
            <Image
              src="expense_light.PNG"
              className="w-full rounded-lg dark:hidden"
            />
            <Image
              src="expense2_light.PNG"
              className="w-full rounded-lg dark:hidden"
            />
          </div>
        </section>
      </Card>
      <Card>
        <section className="flex flex-col-reverse md:flex-row items-center p-5 md:p-10 gap-5">
          <Image
            src="home_dark.PNG"
            className="w-full md:w-1/2 rounded-lg hidden dark:block"
          />
          <Image
            src="home_light.PNG"
            className="w-full md:w-1/2 rounded-lg dark:hidden"
          />
          <SectionTitle> Keep up on the latest news and trends</SectionTitle>
        </section>
      </Card>
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
