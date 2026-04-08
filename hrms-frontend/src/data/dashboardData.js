export const attendanceData = [
  { day: "MON", hours: 8.5 },
  { day: "TUE", hours: 7.8 },
  { day: "WED", hours: 9.2 },
  { day: "THU", hours: 5.7 },
];

export const recentLogs = [
  { date: "Oct 23, Wed", timeRange: "09:02 - 18:15" },
  { date: "Oct 22, Tue", timeRange: "08:50 - 17:45" },
  { date: "Oct 21, Mon", timeRange: "09:15 - 19:02" },
];

export const leaveData = [
  {
    id: "paid",
    label: "PAID LEAVE",
    days: 14.5,
    status: "2 requested this month",
    statusColor: "text-blue-600",
    accentColor: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
    icon: "scissors",
  },
  {
    id: "sick",
    label: "SICK LEAVE",
    days: 6.0,
    status: "Healthy & stable",
    statusColor: "text-green-600",
    accentColor: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
    icon: "briefcase-medical",
  },
  {
    id: "casual",
    label: "CASUAL LEAVE",
    days: 3.0,
    status: "Expires in 42 days",
    statusColor: "text-orange-500",
    accentColor: "bg-orange-50 text-orange-600",
    borderColor: "border-orange-200",
    icon: "calendar-check",
  },
];

export const upcomingEvents = [
  {
    id: 1,
    month: "NOV",
    day: "01",
    title: "Diwali Holiday",
    subtitle: "Full Company Holiday",
  },
  {
    id: 2,
    month: "NOV",
    day: "02",
    title: "Townhall Q4",
    subtitle: "Virtual \u2022 10:00 AM IST",
  },
  {
    id: 3,
    month: "NOV",
    day: "20",
    title: "Team Offsite",
    subtitle: "Green Valley Resort",
  },
];

export const tasks = [
  {
    id: 1,
    icon: "clipboard-list",
    title: "Complete Self-Appraisal",
    description: "Q3 Performance cycle",
    dueInfo: "Due by Friday",
    priority: "CRITICAL",
  },
  {
    id: 2,
    icon: "book-open",
    title: "Read New Remote Policy",
    description: "HR Compliance Update",
    dueInfo: "5 min read",
    priority: "POLICY",
  },
  {
    id: 3,
    icon: "shield",
    title: "Security Awareness Training",
    description: "Learning Path",
    dueInfo: "Mandatory",
    priority: "LEARNING",
  },
];

export const announcements = [
  {
    id: 1,
    category: "COMPANY NEWS",
    categoryColor: "text-blue-600",
    headline: "Nexus HRMS version 2.4 is now live with enhanced AI search.",
    date: "Oct 22, 2024",
  },
  {
    id: 2,
    category: "CULTURE",
    categoryColor: "text-teal-600",
    headline: "Meet our 12 new hires joining the Engineering team!",
    date: "Oct 20, 2024",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
  { id: "self-service", label: "Self Services", icon: "user-circle" },
  { id: "leave", label: "Leave", icon: "calendar-off" },
  { id: "payroll", label: "Payroll", icon: "banknote" },
  { id: "performance", label: "Performance", icon: "trending-up" },
  { id: "careers", label: "Careers", icon: "briefcase" },
  { id: "lms", label: "LMS", icon: "graduation-cap" },
  { id: "claims", label: "Claims", icon: "receipt" },
];
