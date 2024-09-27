import { useAuth } from "@clerk/clerk-react";
import { ArrowUpRight, HandCoins } from "lucide-react";

const TWFooter = () => {
  const { isSignedIn } = useAuth();
  const socials = [
    {
      name: "Github",
      url: "https://github.com/rahulsm20/tradewise",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/rahulsm_",
    },
  ];
  const sections = [
    {
      name: "Stocks",
      url: "/dashboard?tab=stocks",
    },
    {
      name: "Web3",
      url: "/dashboard?tab=web3",
    },
    {
      name: "Expenses",
      url: "/dashboard?tab=expenses",
    },
  ];
  return (
    <footer className="border-t p-5 mt-10 gap-3 flex justify-around items-start bottom-0">
      <div className="flex flex-col gap-2">
        <p className="text-lg text-start flex gap-2">
          <HandCoins /> Tradewise
        </p>
        <span className="text-sm text-zinc-500">
          Manage all your assets in one place.
        </span>
        <div className="flex flex-col gap-3">
          <ul className="flex gap-2 list-disc ">
            {socials.map(({ name, url }) => (
              <li key={name} className="flex gap-2">
                <a
                  href={url}
                  key={name}
                  target="_blank"
                  className=" dark:text-zinc-300 hover:underline flex"
                >
                  {name}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="flex gap-2 text-zinc-500 text-xs">© 2024 Tradewise</p>
      </div>
      {isSignedIn && (
        <div className="grid grid-cols-2 text-start">
          {sections.map(({ name, url }) => (
            <a href={url} key={name} className="font-semibold hover:underline">
              {name}
            </a>
          ))}
          {/* <ul className="flex gap-2 list-disc">
        {sections.map(({ name, subsections, url }) => (
          <li key={name} className="flex flex-col gap-2">
          <a href={url} key={name} className={`text-md dark:text-zinc-300`}>
          {name}
          </a>
          {subsections.length > 0 && (
            <ul className="flex flex-col gap-2 list-disc">
            {subsections.map(({ name, url }) => (
              <li key={name} className="flex gap-2">
              <a
              href={url}
              key={name}
              className="text-sm dark:text-zinc-300 hover:underline"
              >
              {name}
              </a>
              </li>
              ))}
              </ul>
              )}
              </li>
              ))}
              </ul> */}
        </div>
      )}
    </footer>
  );
};

export default TWFooter;
