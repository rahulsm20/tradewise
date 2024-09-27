import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { HandCoins, LogOut, Menu, Moon, Sun } from "lucide-react";
import { Menubar } from "./Menubar";
import { useTheme } from "./theme-provider";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { isSignedIn, user } = useUser();

  return (
    <ul className="flex flex-wrap items-center p-4 gap-3 justify-between sticky top-0 z-10 backdrop-blur-3xl text-xs border-b">
      <li className="flex items-center gap-4">
        <p className="flex gap-2 justify-center items-center text-lg title font-semibold">
          <HandCoins /> Tradewise
        </p>
      </li>
      <Menubar />
      <ul className="flex gap-5 items-center justify-center">
        {user && user?.imageUrl && (
          <li className="hidden md:block">
            <img src={user?.imageUrl} className="rounded-full h-8" />
          </li>
        )}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex gap-2"
                onClick={() =>
                  theme == "light" ? setTheme("dark") : setTheme("light")
                }
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Toggle theme</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                {isSignedIn ? <SignOutButton /> : <SignInButton />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </ul>
  );
};

export default Navbar;
