import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

const ToggleBlockContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const ToggleBlock = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cn(className)}>
      <ToggleBlockContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
      </ToggleBlockContext.Provider>
    </div>
  );
};

export const ToggleBlockTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(ToggleBlockContext);

  if (!context) {
    throw new Error("ToggleBlockTrigger must be used within a ToggleBlock");
  }

  const { isOpen, setIsOpen } = context;

  return (
    <button
      className={cn("flex items-center gap-x-1 text-sm", className)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <Icon name="Play" size={10} className={cn(isOpen && "rotate-90")} />
      {children}
    </button>
  );
};

export const ToggleBlockContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const context = useContext(ToggleBlockContext);

  if (!context) {
    throw new Error("ToggleBlockContent must be used within a ToggleBlock");
  }

  const { isOpen } = context;

  if (!isOpen) return null;

  return <div className={cn("text-sm", className)}>{children}</div>;
};
