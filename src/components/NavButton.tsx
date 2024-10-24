import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavButtonProps {
  icon: LucideIcon;
  label: string;
  href?: string;
}

export function NavButton({ icon: Icon, label, href }: NavButtonProps) {
  return (
    <Button
      className="rounded-full"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
