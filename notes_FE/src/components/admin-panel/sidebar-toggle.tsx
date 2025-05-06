import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  const { i18n } = useTranslation();
  return (
    <div
      className={`invisible text-black lg:visible absolute top-[12px] z-20 ${i18n.language === "ar" ? "left-[16px]" : "right-[16px]"
        }`}
    >
      <Button
        onClick={() => setIsOpen?.()}
        className="w-8 h-8 rounded-md"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
