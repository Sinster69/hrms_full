import React, { useState, useEffect } from "react";
import { punchIn, punchOut, getDashboard } from "../../api";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { Sidebar } from "../dashboard/Sidebar";
import { HeaderBar } from "../dashboard/HeaderBar";
import { GreetingHero } from "../dashboard/GreetingHero";
import { AttendanceChart } from "../dashboard/AttendanceChart";
import { LeaveCard } from "../dashboard/LeaveCard";
import { UpcomingEvents } from "../dashboard/UpcomingEvents";
import { TaskCard } from "../dashboard/TaskCard";
import { AnnouncementCard } from "../dashboard/AnnouncementCard";
import { QuickActions } from "../dashboard/QuickActions";
import { DashboardSkeleton } from "../dashboard/DashboardSkeleton";
import { useDashboard } from "../../hooks/useDashboard";


const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [liveSeconds, setLiveSeconds] = useState(0);
  const { data, loading, error } = useDashboard();

  useEffect(() => {
    if (data) {
      setDashboardData(data);

      // 🔥 convert "HH:MM" → seconds
    const [h, m] = data.attendance.hoursToday.split(":");
    const seconds = parseInt(h) * 3600 + parseInt(m) * 60;

    setLiveSeconds(seconds);

    // detect punch state
    const isWorking = data.attendance?.hoursToday !== "0:00";
    setIsPunchedIn(isWorking);
    }
  }, [data]);

  useEffect(() => {
  let interval;

  if (isPunchedIn) {
    interval = setInterval(() => {
      setLiveSeconds((prev) => prev + 1);
    }, 1000);
  }

    return () => clearInterval(interval);
  }, [isPunchedIn]);

  useEffect(() => {
    let syncInterval;

    if (isPunchedIn) {
      syncInterval = setInterval(async () => {
        try {
          const updated = await getDashboard();

          // 🔥 convert backend "HH:MM" → seconds
          const seconds = updated.attendance.totalSeconds;
          setLiveSeconds(seconds);
          
        } catch (err) {
          console.error("Sync failed", err);
        }
      }, 30000); // every 30 sec
    }

    return () => clearInterval(syncInterval);
  }, [isPunchedIn]);

  const handlePunchToggle = async () => {
  if (isPunchedIn) {
    await punchOut();
  } else {
    await punchIn();
  }

  // 🔥 fetch fresh dashboard data
  const updated = await getDashboard();
  setDashboardData(updated);

  setIsPunchedIn((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <Sidebar activeItem={activeNav} onNavClick={setActiveNav} collapsed={false} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderBar
          userName="Marcus Sterling"
          userRole="Senior Product Designer"
          avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
        />

        {loading ? (
          <DashboardSkeleton />
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 font-semibold mb-2">{error}</p>
              <button
                className="text-blue-600 text-sm underline"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        ) : dashboardData ? (
          <div
            className="flex-1 overflow-y-auto px-6 py-6"
            style={{
              backgroundColor: "#F4F6FB",
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <GreetingHero
              userName="Marcus"
              isPunchedIn={isPunchedIn}
              onPunchToggle={handlePunchToggle}
            />

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="lg:col-span-2 space-y-5">
                <motion.div variants={cardVariants}>
                  <AttendanceChart
                    hoursToday={
                      isPunchedIn
                        ? formatTime(liveSeconds)
                        : dashboardData?.attendance.hoursToday
                    }
                    avgStart={dashboardData?.attendance.avgStart}
                    chartData={dashboardData?.attendance.chartData}
                    recentLogs={dashboardData?.attendance.recentLogs}
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  variants={cardVariants}
                >
                  {dashboardData?.leave.map((leave) => (
                    <LeaveCard
                      key={leave.id}
                      label={leave.label}
                      days={leave.days}
                      status={leave.status}
                      statusColor={leave.statusColor}
                      accentColor={leave.accentColor}
                      icon={leave.icon}
                    />
                  ))}
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  variants={cardVariants}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className="font-bold text-gray-900 text-base"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Your Focus
                    </h3>
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => console.log("more tasks options")}
                    >
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>
                  </div>
                  <p
                    className="text-xs text-gray-400 mb-3"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {dashboardData?.tasks.length} Priority items for this week
                  </p>
                  <div>
                    {dashboardData?.tasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        icon={task.icon}
                        title={task.title}
                        description={task.description}
                        dueInfo={task.dueInfo}
                        priority={task.priority}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-5">
                <motion.div variants={cardVariants}>
                  <QuickActions />
                </motion.div>

                <motion.div variants={cardVariants}>
                  <UpcomingEvents events={dashboardData?.events} />
                </motion.div>

                <motion.div
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  variants={cardVariants}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="font-bold text-gray-900 text-base"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Announcements
                    </h3>
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => console.log("announcement settings")}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {dashboardData?.announcements.map((announcement) => (
                      <AnnouncementCard
                        key={announcement.id}
                        category={announcement.category}
                        categoryColor={announcement.categoryColor}
                        headline={announcement.headline}
                        date={announcement.date}
                      />
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                    <button
                      className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      onClick={() => console.log("see all archived news")}
                    >
                      See all archived news
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
