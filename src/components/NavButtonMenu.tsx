import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavButtonMenuProps {
  icon: LucideIcon;
  label: string;
  choices: {
    title: string;
    href: string;
  }[];
}

export function NavButtonMenu({
  icon: Icon,
  label,
  choices,
}: NavButtonMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {choices.map(({ href, title }) => (
          <DropdownMenuItem key={title} asChild>
            <Link href={href}>{title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
