import React from "react";
import { ClipboardList, BookOpen, Shield } from "lucide-react";

const iconMap = {
  "clipboard-list": ClipboardList,
  "book-open": BookOpen,
  shield: Shield,
};

const priorityConfig = {
  CRITICAL: {
    label: "CRITICAL",
    bg: "#FFF1F2",
    text: "#BE123C",
    border: "#FECDD3",
  },
  POLICY: {
    label: "POLICY",
    bg: "#EEF2FF",
    text: "#3730A3",
    border: "#C7D2FE",
  },
  LEARNING: {
    label: "LEARNING",
    bg: "#F0FDFA",
    text: "#0D9488",
    border: "#99F6E4",
  },
};

export function TaskCard({ icon, title, description, dueInfo, priority, index }) {
  const Icon = iconMap[icon] || ClipboardList;
  const config = priorityConfig[priority];

  return (
    <div
      className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#F4F6FB" }}
      >
        <Icon size={17} className="text-gray-500" />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-semibold text-gray-800 truncate"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </div>
        <div
          className="text-xs text-gray-400 mt-0.5"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {description} {"\u2022"} {dueInfo}
        </div>
      </div>

      <span
        className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
        style={{
          backgroundColor: config.bg,
          color: config.text,
          border: `1px solid ${config.border}`,
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.06em",
        }}
      >
        {config.label}
      </span>
    </div>
  );
}
