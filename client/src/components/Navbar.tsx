import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { HandCoins, LogOut, Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../@/components/ui/dropdown-menu";
import { Menubar } from "./Menubar";
import { useTheme } from "./theme-provider";
import { Button } from "../@/components/ui/button";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { isSignedIn, user } = useUser();

  return (
    <ul className="flex flex-wrap items-center p-4 gap-3 justify-between sticky top-0 z-10 backdrop-blur-3xl text-xs border-b">
      <li className=" items-center gap-4 hidden lg:block">
        <p className="flex gap-2 justify-center items-center text-lg font-semibold leading-none tracking-tight">
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
              <Button className="p-2 bg-background border rounded-full hover:bg-accent text-foreground">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isSignedIn && (
                <DropdownMenuItem className="flex gap-2 hover:bg-inherit">
                  <span>{user.fullName}</span>
                </DropdownMenuItem>
              )}
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
