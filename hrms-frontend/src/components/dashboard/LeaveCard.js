import React from "react";
import { Scissors, BriefcaseMedical, CalendarCheck, ChevronRight } from "lucide-react";

const iconMap = {
  scissors: Scissors,
  "briefcase-medical": BriefcaseMedical,
  "calendar-check": CalendarCheck,
};

export function LeaveCard({ label, days, status, statusColor, accentColor, icon }) {
  const Icon = iconMap[icon] || Scissors;

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentColor}`}>
          <Icon size={18} />
        </div>
        <ChevronRight size={16} className="text-gray-300" />
      </div>
      <div
        className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em" }}
      >
        {label}
      </div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span
          className="font-extrabold text-gray-900"
          style={{
            fontSize: "2.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1,
          }}
        >
          {days.toFixed(1)}
        </span>
        <span
          className="text-sm text-gray-400 font-medium"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Days
        </span>
      </div>
      <div
        className={`text-xs font-semibold ${statusColor}`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {status}
      </div>
    </div>
  );
}
