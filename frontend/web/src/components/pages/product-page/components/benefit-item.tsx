import { LucideIcon } from "lucide-react";

type BenefitItemProps = {
  text: string;
  icon: LucideIcon;
};

export function BenefitItem({ text, icon: Icon }: BenefitItemProps) {
  return (
    <div className="text-sm items-center flex gap-2">
      <Icon className="text-accent h-4 w-4" />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
