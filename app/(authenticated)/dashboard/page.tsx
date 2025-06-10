"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";

import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

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

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns = [
    { name: "User", uid: "user" },
    { name: "Date", uid: "date" },
    { name: "In Time", uid: "in" },
    { name: "Out Time", uid: "out" },
    { name: "Duration", uid: "duration" },
    { name: "Tasks", uid: "tasks" },
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
      tasks: [
        { name: "Painting", hours: "3h 00m" },
        { name: "Electrical Work", hours: "2h 30m" },
        { name: "Plumbing", hours: "2h 00m" },
        { name: "Cleaning", hours: "1h 00m" },
      ],
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
      tasks: [
        { name: "Carpentry", hours: "4h 00m" },
        { name: "Landscaping", hours: "2h 00m" },
        { name: "Cleaning", hours: "2h 30m" },
      ],
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
      tasks: [
        { name: "Electrical Work", hours: "2h 45m" },
        { name: "Plumbing", hours: "3h 15m" },
        { name: "Carpentry", hours: "2h 30m" },
      ],
      location: "📍 3614 Ray Court, Laurinburg",
    },
  ];
  const handleTasksClick = (item: any) => {
    setSelectedUser(item);
    setIsModalOpen(true);
  };
  const detailPage = false; // Assuming this is set based on the context of the page

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
        <div className="overflow-auto w-full border-1 p-3 rounded-lg">
          <Table aria-label="Recent Logs with User Info">
            <TableHeader>
              <TableRow>
                {columns
                  .filter((column) => !(detailPage && column.uid === "user"))
                  .map((column) => (
                    <TableCell key={column.uid} className="font-semibold">
                      {column.name}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((item) => (
                <TableRow key={item.id}>
                  {columns
                    .filter((column) => !(detailPage && column.uid === "user"))
                    .map((column) => (
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
                        ) : column.uid === "tasks" ? (
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            onClick={() => handleTasksClick(item)}
                          >
                            <span className="text-[#FF791A]">
                              {" "}
                              {item.tasks.length} Tasks
                            </span>
                          </Button>
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

        {/* Tasks Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">
                Tasks for {selectedUser?.user?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedUser?.date} • {selectedUser?.duration}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                {selectedUser?.tasks?.map((task: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {task.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#FF791A] dark:text-[#FF791A]">
                        {task.hours}
                      </span>
                    </div>
                  </div>
                ))}

                {selectedUser?.tasks?.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No tasks recorded for this day
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
