"use client";
import { Chip, ChipProps } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/actions/user.action";
import React, { useState } from "react";
import { User } from "@heroui/user";
import { SortableTableHeader } from "@/components/ui/SortableTableHeader";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";
import { formatPhoneNumber } from "@/lib/utils";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { DateRangePickerComponent } from "@/components/ui/DateRangePicker";
import { Download } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";

interface ISearchParams {
  searchParams: {
    page: number;
    q: string;
    fromDate: string;
    toDate: string;
    sort?: string;
    language?: string;
    status?: string;
    from: string;
    to: string;
    role: string;
  };
}

export default function Logs({ detailPage = false }: { detailPage?: boolean }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameFilter, setUsernameFilter] = useState("");

  const columns = [
    { name: "#", uid: "sno" },
    { name: "User", uid: "user" },
    { name: "Date", uid: "date" },
    { name: "In Time", uid: "in" },
    { name: "Out Time", uid: "out" },
    { name: "Duration", uid: "duration" },
    { name: "Job Name", uid: "jobName" },
    { name: "Tasks", uid: "tasks" },
    { name: "Checkin Location", uid: "checkinLocation" },
    { name: "Checkout Location", uid: "checkoutLocation" },
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
      checkoutDate: "30 Jun 2025", // Same date checkout
      in: "08:00",
      out: "17:00",
      duration: "8h 30m",
      tasks: [
        {
          jobName: "Tapville",
          tasks: [
            { name: "Painting", hours: "3h 00m" },
            { name: "Electrical Work", hours: "2h 30m" },
          ],
        },
      ],
      checkinLocation: "3614 Ray Court, Laurinburg",
      checkoutLocation: "1234 Main St, Laurinburg",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      date: "29 Jun 2025",
      checkoutDate: "01 Jul 2025", // Different date checkout
      in: "08:00",
      out: "02:00",
      duration: "18h 00m",
      tasks: [
        {
          jobName: "Edgewood Elementary",
          tasks: [
            { name: "Carpentry", hours: "4h 00m" },
            { name: "Landscaping", hours: "2h 00m" },
          ],
        },
      ],
      checkinLocation: "3614 Ray Court, Laurinburg",
      checkoutLocation: "5678 Oak St, Laurinburg",
    },
    {
      id: 3,
      user: {
        name: "Mark Taylor",
        email: "mark@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      date: "28 Jun 2025",
      checkoutDate: "29 Jun 2025", // Different date checkout
      in: "23:00",
      out: "07:00",
      duration: "8h 00m",
      tasks: [
        {
          jobName: "Oakmont Houses",
          tasks: [
            { name: "Electrical Work", hours: "2h 45m" },
            { name: "Plumbing", hours: "3h 15m" },
          ],
        },
      ],
      checkinLocation: "3614 Ray Court, Laurinburg",
      checkoutLocation: "9101 Pine St, Laurinburg",
    },
  ];

  // Filter logs based on username
  const filteredLogs = logs.filter((log) =>
    log.user.name.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  const handleTasksClick = (item: any) => {
    setSelectedUser(item);
    setIsModalOpen(true);
  };

  const getTotalTasksCount = (tasks: any[]) => {
    return tasks.reduce((total, job) => total + job.tasks.length, 0);
  };

  // Helper function to check if checkout date is different from checkin date
  const isCheckoutDateDifferent = (
    checkinDate: string,
    checkoutDate: string
  ) => {
    return checkinDate !== checkoutDate;
  };

  // Helper function to get primary job name (first job or combined if multiple)
  const getPrimaryJobName = (tasks: any[]) => {
    if (tasks.length === 0) return "No Job";
    if (tasks.length === 1) return tasks[0].jobName;
    return `${tasks[0].jobName} (+${tasks.length - 1} more)`;
  };

  // Helper function to format the out time with date if different
  const formatOutTime = (
    outTime: string,
    checkinDate: string,
    checkoutDate: string
  ) => {
    if (isCheckoutDateDifferent(checkinDate, checkoutDate)) {
      return (
        <div className="flex flex-col">
          <span>{outTime}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {checkoutDate}
          </span>
        </div>
      );
    }
    return outTime;
  };

  const handleExport = () => {
    // Create CSV data
    const csvData = [];

    // Add header
    csvData.push([
      "#",
      "User Name",
      "User Email",
      "Date",
      "In Time",
      "Out Time",
      "Checkout Date",
      "Duration",
      "Job Name",
      "Total Tasks",
      "Checkin Location",
      "Checkout Location",
    ]);

    // Add data rows
    filteredLogs.forEach((log, index) => {
      csvData.push([
        index + 1,
        log.user.name,
        log.user.email,
        log.date,
        log.in,
        log.out,
        log.checkoutDate,
        log.duration,
        getPrimaryJobName(log.tasks),
        getTotalTasksCount(log.tasks),
        log.checkinLocation,
        log.checkoutLocation,
      ]);
    });

    // Convert to CSV string
    const csvString = csvData
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Create and download file
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "logs_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [selectedJobName, setSelectedJobName] = useState<string>("");

  const receiptsData = [
    {
      id: 1,
      jobName: "Tapville",
      taskType: "Painting",
      purpose: "Paint supplies for bathroom renovation",
      date: "10 Jan 2025",
      amount: "$85.00",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop",
      user: {
        name: "Sarah Mitchell",
        email: "sarah.mitchell@example.com",
        avatar: "https://i.pravatar.cc/150?img=47",
      },
    },
    {
      id: 2,
      jobName: "Gristhouse",
      taskType: "Drywall",
      purpose: "Wall materials for interior finishing",
      date: "09 Jan 2025",
      amount: "$240.00",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
      user: {
        name: "Marcus Rodriguez",
        email: "marcus.rodriguez@example.com",
        avatar: "https://i.pravatar.cc/150?img=33",
      },
    },
    {
      id: 3,
      jobName: "Edgewood Elementary",
      taskType: "Demo",
      purpose: "Demolition tools for classroom renovation",
      date: "08 Jan 2025",
      amount: "$156.00",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
      user: {
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        avatar: "https://i.pravatar.cc/150?img=28",
      },
    },
    {
      id: 4,
      jobName: "4800",
      taskType: "Plumbing",
      purpose: "Plumbing fixtures for kitchen installation",
      date: "07 Jan 2025",
      amount: "$95.00",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop",
      user: {
        name: "David Chen",
        email: "david.chen@example.com",
        avatar: "https://i.pravatar.cc/150?img=15",
      },
    },
    {
      id: 5,
      jobName: "Oakmont Houses",
      taskType: "Painting",
      purpose: "Exterior paint for house renovation",
      date: "06 Jan 2025",
      amount: "$67.50",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
      user: {
        name: "Olivia Johnson",
        email: "olivia.johnson@example.com",
        avatar: "https://i.pravatar.cc/150?img=41",
      },
    },
  ];
  const uniqueJobNames = Array.from(
    new Set(receiptsData.map((receipt) => receipt.jobName))
  );

  return (
    <div className={`flex flex-col gap-6 ${!detailPage && " px-4 "} py-4`}>
      {/* Search and Export Section */}
      <div className="flex justify-between items-end gap-4">
        {
          <DateRangePickerComponent
            name={!detailPage ? "All Log Entries" : ""}
          />
        }
        <div className="flex justify-between gap-4 w-[70%]">
          <Select
            label="Filter by Job Name"
            selectedKeys={selectedJobName ? [selectedJobName] : []}
            onChange={(e) => setSelectedJobName(e.target.value)}
            size="sm"
          >
            <SelectItem key="" textValue="">
              All Jobs
            </SelectItem>
            <>
              {uniqueJobNames.map((jobName) => (
                <SelectItem key={jobName} textValue={jobName}>
                  {jobName}
                </SelectItem>
              ))}
            </>
          </Select>
          {!detailPage && (
            <div className="w-full max-w-xs">
              <Input
                type="text"
                placeholder="Filter by username..."
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
                size="lg"
              />
            </div>
          )}
          <Tooltip content="Export Logs">
            <Button
              isIconOnly
              size="lg"
              variant="solid"
              color="primary"
              onClick={handleExport}
            >
              <Download className="h-5 w-5" />
            </Button>
          </Tooltip>
        </div>
      </div>

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
            {filteredLogs.map((item, index) => (
              <TableRow key={item.id}>
                {columns
                  .filter((column) => !(detailPage && column.uid === "user"))
                  .map((column) => (
                    <TableCell
                      key={column.uid}
                      className={
                        column.uid === "checkinLocation" ||
                        column.uid === "checkoutLocation"
                          ? "max-w-[80px] "
                          : ""
                      }
                    >
                      {column.uid === "sno" ? (
                        index + 1
                      ) : column.uid === "user" ? (
                        <User
                          name={item.user.name}
                          description={item.user.email}
                          avatarProps={{
                            radius: "full",
                            src: item.user.avatar,
                          }}
                        />
                      ) : column.uid === "out" ? (
                        formatOutTime(item.out, item.date, item.checkoutDate)
                      ) : column.uid === "jobName" ? (
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-gray-100">
                            {getPrimaryJobName(item.tasks)}
                          </span>
                          {item.tasks.length > 1 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Multiple jobs
                            </span>
                          )}
                        </div>
                      ) : column.uid === "tasks" ? (
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          onClick={() => handleTasksClick(item)}
                        >
                          <span className="text-[#FF791A]">
                            {getTotalTasksCount(item.tasks)} Tasks
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
      <div className="flex justify-center md:justify-end w-full">
        <PaginationClient totalPages={1} currentPage={1} />
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
              {selectedUser &&
                isCheckoutDateDifferent(
                  selectedUser.date,
                  selectedUser.checkoutDate
                ) && (
                  <span className="block text-xs text-gray-400">
                    Checkout: {selectedUser.checkoutDate}
                  </span>
                )}
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6">
              {selectedUser?.tasks?.map((jobGroup: any, index: number) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-semibold text-lg text-primary">
                    {jobGroup.jobName}
                  </h4>
                  <div className="space-y-2">
                    {jobGroup.tasks.map((task: any, taskIndex: number) => (
                      <div
                        key={taskIndex}
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
  );
}
