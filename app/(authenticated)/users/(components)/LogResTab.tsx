"use client";

import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Receipts from "../../receipts/page";
import Logs from "../../logs/page";

export default function LogResTab() {
  const [activeTab, setActiveTab] = useState("logs");

  const logsData = [
    {
      date: 30,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
    {
      date: 29,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
    {
      date: 28,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
    {
      date: 27,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
    {
      date: 26,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
    {
      date: 25,
      month: "Jun",
      year: "2025",
      duration: "8h 30m",
      timeIn: "08:00",
      timeOut: "17:00",
      location: "3614 Ray Court, Laurinburg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b p-4">
      <div className="mx-auto ">
        {/* Tab Navigation */}
        <div className="mb-6 flex rounded-lg bg-white/10 backdrop-blur-md p-1 shadow-lg">
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "logs"
                ? "bg-[#FF791A] text-white shadow-lg"
                : "text-[#FF791A] hover:text-white"
            }`}
          >
            Logs
          </button>
          <button
            onClick={() => setActiveTab("receipts")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "receipts"
                ? "bg-[#FF791A] text-white shadow-lg"
                : "text-[#FF791A] hover:text-white"
            }`}
          >
            Receipts
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "logs" && <Logs detailPage={true} />}

          {activeTab === "receipts" && <Receipts detailPage={true} />}
        </div>
      </div>
    </div>
  );
}
