"use client";

import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";

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

  const receiptsData = [
    {
      id: 1,
      item: "Shower Set",
      company: "IBD Hardware",
      date: "10 Jan 2025 - 10:30am",
      amount: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      item: "Wall Bricks",
      company: "IBD Hardware",
      date: "10 Jan 2025 - 10:30am",
      amount: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      item: "Shower Set",
      company: "IBD Hardware",
      date: "10 Jan 2025 - 10:30am",
      amount: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      item: "Pipe and Tap",
      company: "IBD Hardware",
      date: "10 Jan 2025 - 10:30am",
      amount: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      item: "Shower Set",
      company: "IBD Hardware",
      date: "10 Jan 2025 - 10:30am",
      amount: "$85.00",
      image: "/placeholder.svg?height=80&width=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b p-4">
      <div className="mx-auto max-w-md">
        {/* Tab Navigation */}
        <div className="mb-6 flex rounded-lg bg-black/20 p-1">
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "logs"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-orange-200 hover:text-white"
            }`}
          >
            Logs
          </button>
          <button
            onClick={() => setActiveTab("receipts")}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
              activeTab === "receipts"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-orange-200 hover:text-white"
            }`}
          >
            Receipts
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === "logs" && (
            <>
              {logsData.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl bg-black/20 p-4 backdrop-blur-sm"
                >
                  {/* Date Circle */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                      {log.date}
                    </div>
                    <div className="mt-1 text-center text-xs text-orange-200">
                      {log.month}
                      <br />
                      {log.year}
                    </div>
                  </div>

                  {/* Log Details */}
                  <div className="flex-1">
                    <div className="mb-2 inline-block rounded-full bg-gray-600/50 px-3 py-1 text-sm text-white">
                      {log.duration}
                    </div>
                    <div className="mb-2 text-white">
                      <span className="font-medium">IN : {log.timeIn}</span>
                      <span className="mx-2">|</span>
                      <span className="font-medium">OUT : {log.timeOut}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-orange-200">
                      <MapPin className="h-4 w-4" />
                      {log.location}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "receipts" && (
            <>
              {receiptsData.map((receipt) => (
                <div
                  key={receipt.id}
                  className="flex items-center gap-4 rounded-xl bg-black/20 p-4 backdrop-blur-sm"
                >
                  {/* Receipt Image */}
                  <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-300">
                    <Image
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/960px-ReceiptSwiss.jpg"
                      }
                      alt={receipt.item}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Receipt Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {receipt.item}
                    </h3>
                    <p className="text-orange-200">{receipt.company}</p>
                    <div className="mt-1 flex items-center gap-1 text-sm text-orange-200">
                      <Clock className="h-4 w-4" />
                      {receipt.date}
                    </div>
                    <div className="mt-2 inline-block rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                      {receipt.amount}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
