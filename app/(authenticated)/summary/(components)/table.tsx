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

import { Select, SelectItem } from "@heroui/select";

import {
  ArrowBigRight,
  ArrowDown,
  ArrowRight,
  ArrowUpWideNarrow,
} from "lucide-react";
import { DateRangePickerComponent } from "@/components/ui/DateRangePicker";

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

export default function SummeryTable() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"logs" | "receipts">("logs");
  const [usernameFilter, setUsernameFilter] = useState("");

  const columns = [
    { name: "S.No", uid: "sno" },
    { name: "", uid: "expand" },
    { name: "Employee Name", uid: "user" },
    { name: "Email", uid: "email" },
    { name: "Date Range", uid: "dateRange" },
    { name: "Worked Days", uid: "totalDays" },
    { name: "Total Hours", uid: "totalHours" },
    { name: "Total Receipt Amount", uid: "totalReceiptAmount" },
    { name: "Actions", uid: "actions" },
  ];

  const logColumns = [
    { name: "S.No", uid: "sno" },
    { name: "Date", uid: "date" },
    { name: "In Time", uid: "in" },
    { name: "Out Time", uid: "out" },
    { name: "Duration", uid: "duration" },
    { name: "Tasks", uid: "tasks" },
    { name: "Location", uid: "location" },
  ];

  const receiptColumns = [
    { name: "S.No", uid: "sno" },
    { name: "Date", uid: "date" },
    { name: "Receipt No", uid: "receiptNo" },
    { name: "Amount", uid: "amount" },
    { name: "Category", uid: "category" },
    { name: "Status", uid: "status" }
  ];

  // Sample data with user summaries and their individual logs
  const userSummaries = [
    {
      id: 1,
      user: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      totalDays: 3,
      totalHours: "25h 30m",
      totalTasks: 12,
      logs: [
        {
          id: 101,
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
          id: 102,
          date: "29 Jun 2025",
          in: "08:15",
          out: "17:15",
          duration: "8h 30m",
          tasks: [
            { name: "Painting", hours: "4h 00m" },
            { name: "Electrical Work", hours: "3h 00m" },
            { name: "Cleaning", hours: "1h 30m" },
          ],
          location: "📍 3614 Ray Court, Laurinburg",
        },
        {
          id: 103,
          date: "28 Jun 2025",
          in: "08:00",
          out: "16:30",
          duration: "8h 30m",
          tasks: [
            { name: "Painting", hours: "2h 30m" },
            { name: "Plumbing", hours: "3h 00m" },
            { name: "Carpentry", hours: "2h 00m" },
            { name: "Cleaning", hours: "1h 00m" },
          ],
          location: "📍 3614 Ray Court, Laurinburg",
        },
      ],
      receipts: [
        {
          id: 1001,
          date: "30 Jun 2025",
          receiptNo: "REC-001",
          amount: "$150.00",
          category: "Materials",
          status: "Approved",
        },
        {
          id: 1002,
          date: "29 Jun 2025",
          receiptNo: "REC-002",
          amount: "$75.50",
          category: "Tools",
          status: "Pending",
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      totalDays: 2,
      totalHours: "17h 00m",
      totalTasks: 6,
      logs: [
        {
          id: 201,
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
          id: 202,
          date: "28 Jun 2025",
          in: "08:30",
          out: "17:00",
          duration: "8h 30m",
          tasks: [
            { name: "Carpentry", hours: "5h 00m" },
            { name: "Landscaping", hours: "2h 30m" },
            { name: "Cleaning", hours: "1h 00m" },
          ],
          location: "📍 3614 Ray Court, Laurinburg",
        },
      ],
      receipts: [
        {
          id: 2001,
          date: "29 Jun 2025",
          receiptNo: "REC-003",
          amount: "$100.00",
          category: "Labor",
          status: "Approved",
        },
        {
          id: 2002,
          date: "28 Jun 2025",
          receiptNo: "REC-004",
          amount: "$50.00",
          category: "Materials",
          status: "Pending",
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Mark Taylor",
        email: "mark@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      totalDays: 1,
      totalHours: "8h 30m",
      totalTasks: 3,
      logs: [
        {
          id: 301,
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
      ],
      receipts: [
        {
          id: 3001,
          date: "28 Jun 2025",
          receiptNo: "REC-005",
          amount: "$75.00",
          category: "Labor",
          status: "Approved",
        },
      ],
    },
  ];

  // Filter user summaries based on username
  const filteredUserSummaries = userSummaries.filter((summary) =>
    summary.user.name.toLowerCase().includes(usernameFilter.toLowerCase())
  );

  const handleTasksClick = (log: any) => {
    setSelectedUser(log);
    setIsModalOpen(true);
  };

  const toggleUserExpansion = (userId: number) => {
    const newExpandedUsers = new Set(expandedUsers);
    if (newExpandedUsers.has(userId)) {
      newExpandedUsers.delete(userId);
    } else {
      newExpandedUsers.add(userId);
    }
    setExpandedUsers(newExpandedUsers);
  };

  return (
    <div className={`flex flex-col gap-6 ${" px-4 "} py-4`}>
      <div className="flex justify-between items-center gap-4">
        <DateRangePickerComponent name="Summary Reports" />
        <div className="w-full max-w-xs">
          <Input
            type="text"
            placeholder="Filter by username..."
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            className="w-full" size="lg"
          />
        </div>
      </div>
      <div className="overflow-auto w-full border-1 p-3 rounded-lg">
        <Table aria-label="User Summary with Expandable Logs">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.uid} className="font-semibold">
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserSummaries.map((userSummary, index) => (
              <React.Fragment key={userSummary.id}>
                {/* Main User Row */}
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      onClick={() => toggleUserExpansion(userSummary.id)}
                    >
                      {expandedUsers.has(userSummary.id) ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <User
                      name={userSummary.user.name}
                      description={userSummary.user.email}
                      avatarProps={{
                        radius: "full",
                        src: userSummary.user.avatar,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {userSummary.user.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {userSummary.logs[0]?.date} - {userSummary.logs[userSummary.logs.length - 1]?.date}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="flat" color="default">
                      {userSummary.totalDays} days
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-[#FF791A]">
                      {userSummary.totalHours}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      ${userSummary.receipts.reduce((total: number, receipt: any) =>
                        total + parseFloat(receipt.amount.replace('$', '')), 0).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="View Details">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onClick={() => toggleUserExpansion(userSummary.id)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Print Summary">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                        // onClick={() => window.print()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 6 2 18 2 18 9" />
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                            <rect x="6" y="14" width="12" height="8" />
                          </svg>
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Logs Table */}
                {expandedUsers.has(userSummary.id) && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="p-0 bg-gray-50 dark:bg-gray-900"
                    >
                      <div className="p-4">
                        <div className="mb-3 flex justify-between items-center">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Logs for {userSummary.user.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant={viewMode === "logs" ? "solid" : "flat"}
                              color="primary"
                              className="text-white"
                              onClick={() => setViewMode("logs")}
                            >
                              Logs
                            </Button>
                            <Button
                              size="sm"
                              variant={viewMode === "receipts" ? "solid" : "flat"}
                              color="primary" className="text-white"

                              onClick={() => setViewMode("receipts")}
                            >
                              Receipts
                            </Button>
                          </div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          {viewMode === "logs" ? (
                            <Table aria-label={`Logs for ${userSummary.user.name}`}>
                              <TableHeader>
                                <TableRow>
                                  {logColumns.map((column) => (
                                    <TableCell
                                      key={column.uid}
                                      className="font-medium text-xs bg-gray-100 dark:bg-gray-800"
                                    >
                                      {column.name}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {userSummary.logs.map((log, index) => (
                                  <TableRow key={log.id} className="text-sm">
                                    <TableCell className="py-2">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {index + 1}
                                      </span>
                                    </TableCell>
                                    {logColumns.slice(1).map((column) => (
                                      <TableCell
                                        key={column.uid}
                                        className="py-2"
                                      >
                                        {column.uid === "tasks" ? (
                                          <Button
                                            size="sm"
                                            variant="flat"
                                            color="primary"
                                            onClick={() => handleTasksClick(log)}
                                          >
                                            <span className="text-[#FF791A]">
                                              {log.tasks.length} Tasks
                                            </span>
                                          </Button>
                                        ) : (
                                          String(
                                            log[column.uid as keyof typeof log] ??
                                            ""
                                          )
                                        )}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <Table aria-label={`Receipts for ${userSummary.user.name}`}>
                              <TableHeader>
                                <TableRow>
                                  {receiptColumns.map((column) => (
                                    <TableCell
                                      key={column.uid}
                                      className="font-medium text-xs bg-gray-100 dark:bg-gray-800"
                                    >
                                      {column.name}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {userSummary.receipts?.map((receipt, index) => (
                                  <TableRow key={receipt.id} className="text-sm">
                                    <TableCell className="py-2">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {index + 1}
                                      </span>
                                    </TableCell>
                                    {receiptColumns.slice(1).map((column) => (
                                      <TableCell
                                        key={column.uid}
                                        className="py-2"
                                      >
                                        {column.uid === "status" ? (
                                          <Chip
                                            size="sm"
                                            variant="flat"
                                            color={
                                              receipt.status === "Approved"
                                                ? "success"
                                                : "warning"
                                            }
                                          >
                                            {receipt.status}
                                          </Chip>
                                        ) : (
                                          String(
                                            receipt[column.uid as keyof typeof receipt] ??
                                            ""
                                          )
                                        )}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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
            <h3 className="text-lg font-semibold">Tasks Details</h3>
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
  );
}
