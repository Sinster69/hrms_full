import React from "react";
import {
  LayoutDashboard,
  UserCircle,
  CalendarOff,
  Banknote,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Receipt,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import { navItems } from "../../data/dashboardData";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  "user-circle": UserCircle,
  "calendar-off": CalendarOff,
  banknote: Banknote,
  "trending-up": TrendingUp,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  claims: Receipt,
  receipt: Receipt,
};

export function Sidebar({ activeItem, onNavClick, collapsed = false }) {
  return (
    <aside
      className="flex flex-col h-full"
      style={{
        backgroundColor: "#1A2B5F",
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255,255,255,0.012) 10px,
          rgba(255,255,255,0.012) 11px
        )`,
        width: collapsed ? "64px" : "176px",
        minWidth: collapsed ? "64px" : "176px",
        transition: "width 0.3s ease",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-5 border-b border-white/10"
        style={{ minHeight: "64px" }}
      >
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{
            backgroundColor: "#2563EB",
            width: "32px",
            height: "32px",
          }}
        >
          <Building2 size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div
              className="text-white font-bold text-sm leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              WorkHive
            </div>
            <div className="text-white/50 text-xs">Enterprise Suite</div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left relative group transition-all duration-200"
              style={{
                backgroundColor: isActive ? "rgba(37, 99, 235, 0.18)" : "transparent",
                borderLeft: isActive ? "3px solid #2563EB" : "3px solid transparent",
                paddingLeft: "13px",
              }}
            >
              <Icon
                size={18}
                className={isActive ? "text-blue-400" : "text-white/50 group-hover:text-white/80"}
                style={{ flexShrink: 0 }}
              />
              {!collapsed && (
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {item.label}
                </span>
              )}
              {!isActive && (
                <span
                  className="absolute inset-0 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="py-3 border-t border-white/10">
        {[
          { id: "settings", label: "Settings", Icon: Settings },
          { id: "logout", label: "Logout", Icon: LogOut },
        ].map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => console.log(`${id} clicked`)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left group transition-all duration-200"
          >
            <Icon
              size={18}
              className="text-white/40 group-hover:text-white/70"
              style={{ flexShrink: 0 }}
            />
            {!collapsed && (
              <span
                className="text-sm text-white/40 group-hover:text-white/70 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {label}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
