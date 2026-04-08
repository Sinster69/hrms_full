import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ArrowRight } from "lucide-react";

export function AttendanceChart({ hoursToday, avgStart, chartData, recentLogs }) {
  const maxDay = chartData.reduce(
    (max, day) => (day.hours > max.hours ? day : max),
    chartData[0]
  );

  return (
    <div
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
      style={{ animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3
            className="font-bold text-gray-900 text-base"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Attendance Insight
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Your activity over the last 7 days
          </p>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-md"
          style={{
            backgroundColor: "#DCFCE7",
            color: "#16A34A",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          ON TRACK
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div
          className="rounded-lg p-3 border"
          style={{ backgroundColor: "#F8FAFF", borderColor: "#E0E8FF" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{
              color: "#6B7280",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            Hours Today
          </div>
          <div
            className="font-extrabold"
            style={{
              fontSize: "2rem",
              color: "#1A2B5F",
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1,
            }}
          >
            {hoursToday}
          </div>
        </div>
        <div
          className="rounded-lg p-3 border"
          style={{ backgroundColor: "#F8FAFF", borderColor: "#E0E8FF" }}
        >
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{
              color: "#6B7280",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            Avg. Start
          </div>
          <div
            className="font-extrabold"
            style={{
              fontSize: "2rem",
              color: "#2563EB",
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1,
            }}
          >
            {avgStart}
          </div>
        </div>
      </div>

      <div className="mb-4" style={{ height: "100px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barSize={28}
            margin={{ top: 4, right: 0, bottom: 0, left: -20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 11,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
              }}
            />
            <YAxis hide />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.day}
                  fill={entry.day === maxDay.day ? "#1A2B5F" : "#BFDBFE"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-4">
        <div
          className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Recent Logs
        </div>
        <div className="space-y-1.5">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between">
              <span
                className="text-sm text-gray-700"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {log.date}
              </span>
              <span
                className="text-sm font-medium text-gray-500"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {log.timeRange}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        className="flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"
        style={{ color: "#2563EB", fontFamily: "'Space Grotesk', sans-serif" }}
        onClick={() => console.log("view attendance history")}
      >
        View Attendance History
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
