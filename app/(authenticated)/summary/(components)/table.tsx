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
import { Image } from "@heroui/image";

import { Select, SelectItem } from "@heroui/select";

import {
  ArrowBigRight,
  ArrowDown,
  ArrowRight,
  ArrowUpWideNarrow,
  Download,
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
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const columns = [
    { name: "#", uid: "sno" },
    { name: "", uid: "expand" },
    { name: "Employee Name", uid: "user" },
    { name: "Date Range", uid: "dateRange" },
    { name: "#Worked Days", uid: "totalDays" },
    { name: "Total Hours", uid: "totalHours" },
    { name: "Total Receipt Amount", uid: "totalReceiptAmount" },
    { name: "Actions", uid: "actions" },
  ];

  const logColumns = [
    { name: "#", uid: "sno" },
    { name: "Date", uid: "date" },
    { name: "In Time", uid: "in" },
    { name: "Out Time", uid: "out" },
    { name: "Duration", uid: "duration" },
    { name: "Tasks", uid: "tasks" },
    { name: "Location", uid: "location" },
  ];

  const receiptColumns = [
    { name: "#", uid: "serial" },
    { name: "User", uid: "user" },
    { name: "Job Name", uid: "jobName" },
    { name: "Task Type", uid: "taskType" },
    { name: "Purpose Of Purchase", uid: "purpose" },
    { name: "Date", uid: "date" },
    { name: "Amount", uid: "amount" },
    { name: "Receipt", uid: "image" },
    { name: "Actions", uid: "actions" },
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
          location: "3614 Ray Court, Laurinburg",
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
          location: "3614 Ray Court, Laurinburg",
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
          location: "3614 Ray Court, Laurinburg",
        },
      ],
      receipts: [
        {
          id: 1001,
          jobName: "Tapville",
          taskType: "Painting",
          purpose: "Paint supplies for bathroom renovation",
          date: "30 Jun 2025",
          amount: "$150.00",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop",
          user: {
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        },
        {
          id: 1002,
          jobName: "Gristhouse",
          taskType: "Drywall",
          purpose: "Wall materials for interior finishing",
          date: "29 Jun 2025",
          amount: "$75.50",
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
          user: {
            name: "John Doe",
            email: "john@example.com",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
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
          location: "3614 Ray Court, Laurinburg",
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
          location: "3614 Ray Court, Laurinburg",
        },
      ],
      receipts: [
        {
          id: 2001,
          jobName: "Edgewood Elementary",
          taskType: "Demo",
          purpose: "Demolition tools for classroom renovation",
          date: "29 Jun 2025",
          amount: "$100.00",
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
          user: {
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        },
        {
          id: 2002,
          jobName: "4800",
          taskType: "Plumbing",
          purpose: "Plumbing fixtures for kitchen installation",
          date: "28 Jun 2025",
          amount: "$50.00",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=280&fit=crop",
          user: {
            name: "Jane Smith",
            email: "jane@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
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
          location: "3614 Ray Court, Laurinburg",
        },
      ],
      receipts: [
        {
          id: 3001,
          jobName: "Oakmont Houses",
          taskType: "Painting",
          purpose: "Exterior paint for house renovation",
          date: "28 Jun 2025",
          amount: "$75.00",
          image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=280&fit=crop",
          user: {
            name: "Mark Taylor",
            email: "mark@example.com",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
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

  const handleReceiptClick = (receipt: any) => {
    setSelectedReceipt(receipt);
    setIsReceiptModalOpen(true);
  };

  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false);
    setSelectedReceipt(null);
  };

  const handlePrintReceipt = (receipt: any) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (!printWindow) {
      alert('Please allow popups to print the receipt');
      return;
    }

    // Generate the HTML content for the receipt
    const receiptHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt - ${receipt.purpose}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            padding: 20px;
          }
          
          .receipt-container {
            max-width: 600px;
            margin: 0 auto;
            border: 2px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .receipt-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          
          .receipt-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: bold;
          }
          
          .receipt-header p {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .receipt-body {
            padding: 30px 20px;
            background: white;
          }
          
          .receipt-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          
          .receipt-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding: 8px 0;
          }
          
          .detail-label {
            font-weight: 600;
            color: #555;
            flex: 1;
          }
          
          .detail-value {
            font-weight: 500;
            color: #333;
            flex: 2;
            text-align: right;
          }
          
          .amount-highlight {
            font-size: 24px;
            font-weight: bold;
            color: #27ae60;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            border: 2px solid #27ae60;
          }
          
          .receipt-image {
            text-align: center;
            margin: 20px 0;
          }
          
          .receipt-image img {
            max-width: 200px;
            max-height: 300px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          
          .receipt-footer {
            text-align: center;
            padding: 20px;
            background: #f8f9fa;
            border-top: 2px solid #eee;
            color: #666;
            font-size: 14px;
          }
          
          .print-date {
            margin-top: 10px;
            font-style: italic;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .receipt-container {
              border: none;
              box-shadow: none;
            }
            
            .receipt-header {
              background: #667eea !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
            
            .amount-highlight {
              background: #f8f9fa !important;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="receipt-header">
            <h1>RECEIPT</h1>
            <p>Purchase Confirmation</p>
          </div>
          
          <div class="receipt-body">
            <div class="receipt-section">
              <div class="section-title">Customer Information</div>
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${receipt.user.name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${receipt.user.email}</span>
              </div>
            </div>
            
            <div class="receipt-section">
              <div class="section-title">Job Details</div>
              <div class="detail-row">
                <span class="detail-label">Job Name:</span>
                <span class="detail-value">${receipt.jobName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Task Type:</span>
                <span class="detail-value">${receipt.taskType}</span>
              </div>
            </div>
            
            <div class="receipt-section">
              <div class="section-title">Purchase Information</div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${receipt.date}</span>
              </div>
            </div>
            
            <div class="amount-highlight">
              Total Amount: ${receipt.amount}
            </div>
            
            <div class="receipt-image">
              <img src="${receipt.image}" alt="Receipt Image" onerror="this.style.display='none'">
            </div>
          </div>
          
          <div class="receipt-footer">
            <p>Thank you for your business!</p>
            <div class="print-date">
              Printed on: ${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
            </div>
          </div>
        </div>
        
        <script>
          // Auto-print when the page loads
          window.onload = function() {
            window.print();
            // Close the window after printing (optional)
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `;

    // Write the HTML content to the new window
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Focus on the print window
    printWindow.focus();
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

  const handleExport = () => {
    // Expand all users first
    const allUserIds = userSummaries.map(summary => summary.id);
    setExpandedUsers(new Set(allUserIds));

    // Wait longer for the DOM to update, then export
    setTimeout(() => {
      // Create CSV data
      const csvData = [];

      // Add header
      csvData.push([
        '#',
        'Employee Name',
        'Email',
        'Date Range',
        '#Worked Days',
        'Total Hours',
        'Total Receipt Amount'
      ]);

      // Add data rows
      filteredUserSummaries.forEach((userSummary, index) => {
        const totalReceiptAmount = userSummary.receipts.reduce((total: number, receipt: any) =>
          total + parseFloat(receipt.amount.replace('$', '')), 0).toFixed(2);

        csvData.push([
          index + 1,
          userSummary.user.name,
          userSummary.user.email,
          `${userSummary.logs[0]?.date} - ${userSummary.logs[userSummary.logs.length - 1]?.date}`,
          userSummary.totalDays,
          userSummary.totalHours,
          `$${totalReceiptAmount}`
        ]);
      });

      // Convert to CSV string
      const csvString = csvData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

      // Create and download file
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'summary_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  };

  return (
    <div className={`flex flex-col gap-6 ${" px-4 "} py-4`}>
      {/* Print styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          
          .print-container {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
            page-break-inside: auto !important;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid #ddd !important;
            padding: 8px !important;
            text-align: left !important;
            page-break-inside: avoid !important;
          }
          
          .print-table tr {
            page-break-inside: avoid !important;
            page-break-after: auto !important;
          }
          
          .print-expanded-content {
            display: block !important;
            page-break-inside: avoid !important;
          }
          
          .print-hidden {
            display: none !important;
          }
          
          .print-button {
            display: none !important;
          }
          
          .print-tooltip {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex justify-between items-center gap-4 print-hidden">
        <DateRangePickerComponent name="Summary Reports" />
        <div className="flex items-center gap-4">
          <div className="w-full max-w-xs">
            <Input
              type="text"
              placeholder="Filter by username..."
              value={usernameFilter}
              onChange={(e) => setUsernameFilter(e.target.value)}
              className="w-[200px]" size="lg"
            />
          </div>
          <Tooltip content="Export Summary Table">
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
      <div className="overflow-auto w-full border-1 p-3 rounded-lg print-container">
        <Table aria-label="User Summary with Expandable Logs" className="print-table">
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
                    <div className="flex items-center gap-2 print-hidden">
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

                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Logs Table */}
                {expandedUsers.has(userSummary.id) && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="p-0 bg-gray-50 dark:bg-gray-900 print-expanded-content"
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
                                    <TableCell className="py-2">
                                      <User
                                        name={receipt.user.name}
                                        description={receipt.user.email}
                                        avatarProps={{
                                          src: receipt.user.avatar,
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell className="py-2">
                                      <div className="font-semibold">{receipt.jobName}</div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                      <div className="text-sm text-default-600">{receipt.taskType}</div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                      <div className="text-sm text-default-600">{receipt.purpose}</div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                      {receipt.date}
                                    </TableCell>
                                    <TableCell className="py-2">
                                      {receipt.amount}
                                    </TableCell>
                                    <TableCell className="py-2">
                                      <div onClick={() => handleReceiptClick(receipt)}>
                                        <Image
                                          alt="Receipt"
                                          className="object-cover cursor-pointer"
                                          src={receipt.image}
                                          width={40}
                                          height={40}
                                        />
                                      </div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                      <div className="flex gap-2">
                                        <Button
                                          isIconOnly
                                          size="sm"
                                          variant="light"
                                          color="primary"
                                          onPress={() => handlePrintReceipt(receipt)}
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
                                      </div>
                                    </TableCell>
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
      <div className="flex justify-center md:justify-end w-full print-hidden">
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

      {/* Receipt Preview Modal */}
      <Modal
        isOpen={isReceiptModalOpen}
        onClose={closeReceiptModal}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">Receipt Preview</h3>
            {selectedReceipt && (
              <p className="text-sm text-default-600">
                {selectedReceipt.jobName} - {selectedReceipt.taskType}
              </p>
            )}
          </ModalHeader>
          <ModalBody>
            {selectedReceipt && (
              <div className="flex flex-col gap-4">
                {/* Receipt Image */}
                <div className="flex justify-center">
                  <Image
                    src={selectedReceipt.image}
                    alt={`Receipt for ${selectedReceipt.purpose}`}
                    width={400}
                    height={600}
                    className="rounded-lg object-contain shadow-lg"
                  />
                </div>

                {/* Receipt Details */}
                <div className="bg-default-100 dark:bg-default-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-foreground">
                    Receipt Details
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-default-700">
                        Customer:
                      </span>
                      <p className="text-foreground">
                        {selectedReceipt.user.name}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-default-700">
                        Email:
                      </span>
                      <p className="text-foreground">
                        {selectedReceipt.user.email}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-default-700">
                        Purpose:
                      </span>
                      <p className="text-foreground">{selectedReceipt.purpose}</p>
                    </div>
                    <div>
                      <span className="font-medium text-default-700">
                        Date:
                      </span>
                      <p className="text-foreground">{selectedReceipt.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-default-700">
                        Amount:
                      </span>
                      <p className="text-foreground font-semibold text-lg">
                        {selectedReceipt.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={closeReceiptModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
