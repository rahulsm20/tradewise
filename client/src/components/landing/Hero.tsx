import { HandCoins } from "lucide-react";
import Image from "../image";

const Hero = () => {
  return (
    <div className="flex flex-col gap-5 mx-40 items-center justify-center">
      <div className="my-10 p-5 flex flex-col gap-5 items-center ">
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
      <section className="flex flex-col md:flex-row items-center transition ease-in-out delay-150 duration-300 p-10">
        <p className="flex text-7xl">Analyse your investments</p>
        <Image
          src="dark-stocks-2.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block "
        />
        <Image
          src="light-stocks-2.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
      </section>
      <section className="flex flex-col-reverse transition ease-in-out delay-150 md:flex-row items-center p-10">
        <Image
          src="dark-web3.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block  hover:-translate-y-1 transition-transform duration-300 hover:shadow-md shadow-gray-50"
        />
        <Image
          src="light-web3.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
        <p className="flex text-7xl">
          Make and track web3 transactions with ease
        </p>
      </section>
      <section className="flex flex-col-reverse transition ease-in-out delay-150 md:flex-row items-center p-10">
        <p className="flex text-5xl md:text-7xl">
          Keep up on the latest news and trends
        </p>
        <Image
          src="home.PNG"
          className="w-full md:w-1/2 rounded-lg hidden dark:block"
        />
        <Image
          src="light-home.PNG"
          className="w-full md:w-1/2 rounded-lg dark:hidden"
        />
      </section>
    </div>
  );
};

export default Hero;
