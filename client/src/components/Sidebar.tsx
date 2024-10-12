import { Home, LineChartIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const activeTab = useLocation().pathname;

  const tabs = [
    {
      url: "/",
      name: "Home",
      icon: <Home className="w-4 h-4" />,
    },
    {
      url: "/dashboard",
      name: "Dashboard",
      icon: <LineChartIcon className="w-4 h-4" />,
    },
    {
      url: "/settings",
      name: "Settings",
    },
  ];

  return (
    <div className="sticky overflow-x-scroll md:overflow-hidden text-sm w-1/2 h-screen border-r m-0 ">
      <ul className="flex flex-col gap-5 mt-3 items-center">
        {tabs.map((tab) => {
          return (
            <Link
              key={tab.url}
              to={tab.url}
              className={`${
                tab.url === activeTab
                  ? "bg-slate-100 dark:bg-zinc-800"
                  : "hover:dark:bg-zinc-800 hover:bg-slate-100"
              } p-2 rounded-md flex items-center gap-3 w-40 text-sm`}
            >
              <div>{tab?.icon}</div>
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
