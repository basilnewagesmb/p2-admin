"use client";
import { SetStateAction, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { Image } from "@heroui/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";
import { DateRangePickerComponent } from "@/components/ui/DateRangePicker";
import { Download } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";

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

type Receipt = {
  id: number;
  jobName: string;
  taskType: string;
  purpose: string;
  date: string;
  amount: string;
  image: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

export default function Receipts({
  detailPage = false,
}: {
  detailPage?: boolean;
}) {
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobName, setSelectedJobName] = useState<string>("");
  const [selectedTaskType, setSelectedTaskType] = useState<string>("");

  // Get unique job names and task types for filters
  const uniqueJobNames = Array.from(
    new Set(receiptsData.map((receipt) => receipt.jobName))
  );
  const uniqueTaskTypes = Array.from(
    new Set(receiptsData.map((receipt) => receipt.taskType))
  );

  // Filter receipts based on selected filters
  const filteredReceipts = receiptsData.filter((receipt) => {
    const matchesJobName =
      !selectedJobName || receipt.jobName === selectedJobName;
    const matchesTaskType =
      !selectedTaskType || receipt.taskType === selectedTaskType;
    return matchesJobName && matchesTaskType;
  });

  const handleReceiptClick = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReceipt(null);
  };

  const handleExport = () => {
    // Create CSV data
    const csvData = [];

    // Add header
    csvData.push([
      "#",
      "User Name",
      "User Email",
      "Job Name",
      "Task Type",
      "Purpose of Purchase",
      "Date",
      "Amount",
    ]);

    // Add data rows
    filteredReceipts.forEach((receipt, index) => {
      csvData.push([
        index + 1,
        receipt.user.name,
        receipt.user.email,
        receipt.jobName,
        receipt.taskType,
        receipt.purpose,
        receipt.date,
        receipt.amount,
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
    link.setAttribute("download", "receipts_report.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintReceipt = (receipt: any) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("Please allow popups to print the receipt");
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
              <div class="section-title">User Information</div>
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
              Printed on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  return (
    <div className={`flex flex-col gap-6 ${!detailPage && " px-4 "} py-4`}>
      <div className="flex justify-between items-center gap-4">
        <DateRangePickerComponent name={!detailPage ? "All Receipts" : ""} />
        <div className="flex justify-between gap-4">
          <Select
            label="Filter by Job Name"
            selectedKeys={selectedJobName ? [selectedJobName] : []}
            onChange={(e) => setSelectedJobName(e.target.value)}
            className="w-[200px]"
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

          <Select
            label="Filter by Task Type"
            selectedKeys={selectedTaskType ? [selectedTaskType] : []}
            onChange={(e) => setSelectedTaskType(e.target.value)}
            className="w-[200px]"
            size="sm"
          >
            <SelectItem key="" textValue="">
              All Tasks
            </SelectItem>
            <>
              {uniqueTaskTypes.map((taskType) => (
                <SelectItem key={taskType} textValue={taskType}>
                  {taskType}
                </SelectItem>
              ))}
            </>
          </Select>

          {!detailPage && (
            <Tooltip content="Export Receipts">
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
          )}
        </div>
      </div>

      <Table>
        <TableHeader>
          {columns
            .filter((column) => !(detailPage && column.uid === "user"))
            .map((column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            ))}
        </TableHeader>
        <TableBody>
          {filteredReceipts.map((item, index) => (
            <TableRow key={item.id}>
              {columns
                .filter((column) => !(detailPage && column.uid === "user"))
                .map((column) => (
                  <TableCell
                    key={column.uid}
                    className={`${column.uid === "date" ? "w-[150px]" : ""}`}
                  >
                    {column.uid === "serial" ? (
                      index + 1
                    ) : column.uid === "user" ? (
                      <User
                        name={item.user.name}
                        description={item.user.email}
                        avatarProps={{
                          src: item.user.avatar,
                        }}
                      />
                    ) : column.uid === "jobName" ? (
                      <div className="font-semibold">{item.jobName}</div>
                    ) : column.uid === "taskType" ? (
                      <div className="text-sm text-default-600">
                        {item.taskType}
                      </div>
                    ) : column.uid === "purpose" ? (
                      <div className="text-sm text-default-600">
                        {item.purpose}
                      </div>
                    ) : column.uid === "date" ? (
                      item.date
                    ) : column.uid === "amount" ? (
                      item.amount
                    ) : column.uid === "image" ? (
                      <div onClick={() => handleReceiptClick(item)}>
                        <Image
                          alt="Receipt"
                          className="object-cover cursor-pointer"
                          src={item.image}
                          width={40}
                          height={40}
                        />
                      </div>
                    ) : column.uid === "actions" ? (
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="primary"
                          onPress={() => handlePrintReceipt(item)}
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
                    ) : null}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center md:justify-end w-full">
        <PaginationClient
          totalPages={Math.ceil(receiptsData.length / 10)}
          currentPage={1}
        />
      </div>

      {/* Receipt Preview Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
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
                        User:
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
                      <p className="text-foreground">
                        {selectedReceipt.purpose}
                      </p>
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
            <Button color="primary" onPress={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
