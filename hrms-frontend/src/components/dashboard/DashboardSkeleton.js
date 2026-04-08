import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <aside
        className="hidden md:flex md:w-44 md:flex-col"
        style={{ backgroundColor: "#1A2B5F" }}
      >
        <div className="h-16 border-b border-white/10" />
        <div className="space-y-3 px-4 py-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-10 animate-pulse rounded-lg bg-white/10" />
          ))}
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="h-16 border-b border-gray-200 bg-white" />
        <div className="flex-1 space-y-5 p-6">
          <div className="h-24 animate-pulse rounded-2xl bg-white" />
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <div className="h-80 animate-pulse rounded-2xl bg-white" />
              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-40 animate-pulse rounded-2xl bg-white" />
                ))}
              </div>
              <div className="h-72 animate-pulse rounded-2xl bg-white" />
            </div>
            <div className="space-y-5">
              <div className="h-44 animate-pulse rounded-2xl bg-white" />
              <div className="h-64 animate-pulse rounded-2xl bg-white" />
              <div className="h-72 animate-pulse rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
