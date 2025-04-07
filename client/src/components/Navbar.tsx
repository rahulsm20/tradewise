import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { SignInButton } from "@clerk/clerk-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { HandCoins, LogOut, Menu, Moon, Sun } from "lucide-react";
import LogoutButton from "./logout";
import { Menubar } from "./Menubar";
import { useTheme } from "./theme-provider";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const { isAuthenticated, user } = useAuth0();
  return (
    <ul className="flex flex-wrap items-center p-4 gap-3 justify-between sticky top-0 z-10 backdrop-blur-3xl bg-slate-50/70 dark:bg-zinc-950/70 text-xs">
      <li className=" items-center gap-4 hidden lg:block">
        <p className="flex gap-2 justify-center items-center text-lg font-semibold leading-none tracking-tight">
          <HandCoins /> Tradewise
        </p>
      </li>
      <Menubar />
      <ul className="flex gap-5 items-center justify-center">
        {user && user?.picture && (
          <li className="hidden md:block">
            <Avatar>
              <AvatarImage src={user?.picture} alt={user?.name} />
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
          </li>
        )}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="p-2 bg-background border rounded-[--radius] hover:bg-accent text-foreground">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex gap-2 hover:bg-inherit border-b">
                {isAuthenticated && (
                  <span>
                    {user?.name || user?.nickname || user?.email || "User"}
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="flex gap-2"
                onClick={() =>
                  theme == "light" ? setTheme("dark") : setTheme("light")
                }
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <button>
                  <span>Toggle theme</span>
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2">
                <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                {isAuthenticated ? <LogoutButton /> : <SignInButton />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </ul>
  );
};

export default Navbar;
