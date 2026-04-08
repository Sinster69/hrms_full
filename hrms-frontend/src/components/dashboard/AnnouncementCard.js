import React from "react";
import { ArrowRight } from "lucide-react";

export function AnnouncementCard({ category, categoryColor, headline, date }) {
  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <div
        className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${categoryColor}`}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: "0.1em",
        }}
      >
        {category}
      </div>
      <p
        className="text-sm font-semibold text-gray-800 leading-snug mb-2"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {headline}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-xs text-gray-400"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {date}
        </span>
        <button
          className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors hover:underline"
          style={{ color: "#2563EB", fontFamily: "'Space Grotesk', sans-serif" }}
          onClick={() => console.log("read more:", headline)}
        >
          Read More
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
