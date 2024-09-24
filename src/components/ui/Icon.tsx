import { cn } from "@/lib/utils";
import { icons } from "lucide-react";

interface Props {
  name: keyof typeof icons;
  color?: string;
  size?: string | number;
  className?: string;
}

const Icon = ({ name, color, size, className }: Props) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={cn(className)} />;
};

export default Icon;
