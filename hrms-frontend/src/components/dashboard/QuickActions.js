import React from "react";
import { Receipt, CalendarOff, GraduationCap, ChevronRight } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: Receipt,
      label: "View My Payslip",
      variant: "primary",
      onClick: () => console.log("payslip clicked"),
    },
    {
      icon: CalendarOff,
      label: "Request Leave",
      variant: "secondary",
      onClick: () => console.log("request leave clicked"),
    },
    {
      icon: GraduationCap,
      label: "Visit LMS Portal",
      variant: "secondary",
      onClick: () => console.log("lms portal clicked"),
    },
  ];

  return (
    <div className="space-y-2.5">
      {actions.map((action, index) => {
        const Icon = action.icon;
        const isPrimary = action.variant === "primary";

        return (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-sm hover:shadow-md"
            style={{
              backgroundColor: isPrimary ? "#1A2B5F" : "#FFFFFF",
              border: isPrimary ? "none" : "1px solid #E5E7EB",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: isPrimary ? "rgba(255,255,255,0.15)" : "#F4F6FB",
                }}
              >
                <Icon size={16} className={isPrimary ? "text-white" : "text-gray-600"} />
              </div>
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isPrimary ? "#FFFFFF" : "#1F2937",
                }}
              >
                {action.label}
              </span>
            </div>
            <ChevronRight
              size={16}
              className={isPrimary ? "text-white/60" : "text-gray-300"}
            />
          </button>
        );
      })}
    </div>
  );
}
