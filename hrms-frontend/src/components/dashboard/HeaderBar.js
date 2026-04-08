import React from "react";
import { Search, Bell } from "lucide-react";

export function HeaderBar({ userName, userRole, avatarUrl }) {
  return (
    <header
      className="flex items-center justify-between px-6 border-b border-gray-200 bg-white"
      style={{ height: "64px", minHeight: "64px" }}
    >
      <div className="flex-1" />

      <div className="flex-1 max-w-sm">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search tasks or files..."
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-full border border-gray-200 bg-gray-50 text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition-all"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            onChange={(event) => console.log("search:", event.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => console.log("notifications clicked")}
        >
          <Bell size={20} className="text-gray-600" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#EF4444" }}
          />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <div
              className="text-sm font-semibold text-gray-800"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {userName}
            </div>
            <div className="text-xs text-gray-500">{userRole}</div>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-blue-600">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "#1A2B5F" }}
              >
                {userName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
