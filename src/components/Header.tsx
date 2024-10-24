import { ModeToggle } from "@/components/ModeToggle";
import { NavButton } from "@/components/NavButton";
import { urls } from "@/constants";
import { File, HomeIcon, UsersRound } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
      <nav className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href={urls.HOME} label="Home" icon={HomeIcon} />

          <div className="hidden sm:block">
            <Link
              href={urls.HOME}
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
          <NavButton
            href={urls.CUSTOMERS}
            label="Customers"
            icon={UsersRound}
          />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
