import React from "react";
import { CalendarDays } from "lucide-react";

export function UpcomingEvents({ events }) {
  return (
    <div className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: "#0F1C3F" }}>
      <div className="flex items-center justify-between mb-4">
        <h3
          className="font-bold text-white text-base"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Upcoming
        </h3>
        <button
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          onClick={() => console.log("event calendar clicked")}
        >
          <CalendarDays size={12} />
          EVENT CALENDAR
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3">
            <div
              className="flex flex-col items-center justify-center rounded-lg flex-shrink-0"
              style={{
                backgroundColor: "#1A2B5F",
                width: "46px",
                height: "46px",
                minWidth: "46px",
              }}
            >
              <span
                className="text-white/50 font-bold leading-none"
                style={{
                  fontSize: "9px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.06em",
                }}
              >
                {event.month}
              </span>
              <span
                className="text-white font-extrabold leading-none mt-0.5"
                style={{
                  fontSize: "18px",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {event.day}
              </span>
            </div>
            <div className="min-w-0">
              <div
                className="text-white text-sm font-semibold leading-tight truncate"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {event.title}
              </div>
              <div
                className="text-white/40 text-xs mt-0.5 truncate"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {event.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
