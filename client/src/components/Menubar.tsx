import * as React from "react";

import { cn } from "../@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const components: { title: string; href: string; description?: string }[] = [
  {
    href: "/dashboard?tab=stocks",
    title: "Stocks",
    description: "View your stocks",
  },
  {
    href: "/dashboard?tab=web3",
    title: "Web3",
    description: "Keep track of your web3 transactions",
  },
  {
    href: "/dashboard?tab=expenses",
    title: "Expenses",
  },
];

export function Menubar() {
  return (
    <NavigationMenu className="text-xs">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            Dashboard
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-1 w-3/4 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-transparent">
              {components.map((component) => (
                <ListItem
                  className="bg-transparent"
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="https://github.com/rahulsm20/tradewise" target="blank_">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Github <ArrowUpRight className="h-4 w-4" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          to={href || ""}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
