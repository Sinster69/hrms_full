import React from "react";
import { Calendar, Clock, LogIn, LogOut } from "lucide-react";
import { useClock } from "../../hooks/useClock";

export function GreetingHero({ userName, isPunchedIn, onPunchToggle }) {
  const { greeting, formattedTime, formattedDate } = useClock();

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1
          className="font-extrabold text-gray-900 mb-1"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            lineHeight: 1.15,
          }}
        >
          {greeting}, {userName}
        </h1>
        <div
          className="flex items-center gap-4 text-sm text-gray-500 mt-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-400" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-gray-400" />
            {formattedTime}
          </span>
        </div>
      </div>

      <button
        onClick={onPunchToggle}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg flex-shrink-0"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          backgroundColor: isPunchedIn ? "#16A34A" : "#1A2B5F",
        }}
      >
        {isPunchedIn ? (
          <>
            <LogOut size={16} />
            Punch Out
          </>
        ) : (
          <>
            <LogIn size={16} />
            Punch In
          </>
        )}
      </button>
    </div>
  );
}
