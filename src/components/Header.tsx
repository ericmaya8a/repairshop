import { ModeToggle } from "@/components/ModeToggle";
import { NavButton } from "@/components/NavButton";
import { NavButtonMenu } from "@/components/NavButtonMenu";
import { Button } from "@/components/ui/button";
import { urls } from "@/constants";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { File, HomeIcon, LogOut, UsersRound } from "lucide-react";
import Link from "next/link";

const customerChoices = [
  { title: "Search Customers", href: urls.CUSTOMERS },
  { title: "New Customers", href: `${urls.CUSTOMERS}/form` },
];

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <nav className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href={urls.TICKETS} label="Home" icon={HomeIcon} />

          <div className="hidden sm:block">
            <Link
              href={urls.TICKETS}
              className="flex justify-center items-center gap-2 ml-0"
              title="Home"
            >
              <h1 className="text-xl font-bold m-0 mt-1">
                Computer Repair Shop
              </h1>
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <NavButton href={urls.TICKETS} label="Tickets" icon={File} />
          <NavButtonMenu
            icon={UsersRound}
            label="Customers Menu"
            choices={customerChoices}
          />
          <ModeToggle />
          <Button
            className="rounded-full"
            variant="ghost"
            size="icon"
            aria-label="LogOut"
            title="LogOut"
            asChild
          >
            <LogoutLink postLogoutRedirectURL={urls.LOGIN}>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </nav>
    </header>
  );
}
