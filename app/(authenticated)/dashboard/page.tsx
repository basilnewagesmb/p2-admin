"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Button } from "@heroui/button";
import { User } from "@heroui/user";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

const stats = [
  {
    title: "Users",
    value: "322",
    lastMonth: "22",
    growth: "80%",
  },
  {
    title: "Logs",
    value: "140",
    lastMonth: "20",
    growth: "120%",
  },
  {
    title: "Receipts",
    value: "$300K",
    lastMonth: "$22K",
    growth: "120%",
  },
];

const columns = [
  { name: "User", uid: "user" },
  { name: "Date", uid: "date" },
  { name: "In Time", uid: "in" },
  { name: "Out Time", uid: "out" },
  { name: "Duration", uid: "duration" },
  { name: "Location", uid: "location" },
];

const logs = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "30 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "📍 3614 Ray Court, Laurinburg",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    date: "29 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "📍 3614 Ray Court, Laurinburg",
  },
  {
    id: 3,
    user: {
      name: "Mark Taylor",
      email: "mark@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    date: "28 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "📍 3614 Ray Court, Laurinburg",
  },
  // ...add more as needed
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 px-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {stats.map((item, index) => (
          <Card
            key={index}
            className="w-full p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-zinc-900 border border-default-200"
          >
            <CardHeader className="flex items-center justify-between pb-1">
              <h4 className="text-base font-semibold text-gray-700 dark:text-gray-200">
                {item.title}
              </h4>
            </CardHeader>

            <CardBody className="px-3 py-1 text-2xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-semibold">Recent Logs</h2>
        <Table aria-label="Recent Logs with User Info">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {logs.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {column.uid === "user" ? (
                      <User
                        name={item.user.name}
                        description={item.user.email}
                        avatarProps={{
                          radius: "full",
                          src: item.user.avatar,
                        }}
                      />
                    ) : (
                      // Ensure the value is rendered as a string
                      String(item[column.uid as keyof typeof item] ?? "")
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
