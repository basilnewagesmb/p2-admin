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
import {
  Select,
  SelectItem,
} from "@heroui/select";

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
  { name: "S.No", uid: "serial" },
  { name: "User", uid: "user" },
  { name: "Job Name", uid: "jobName" },
  { name: "Task Type", uid: "taskType" },
  { name: "Item", uid: "item" },
  { name: "Company", uid: "company" },
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
    item: "Shower Set",
    company: "IBD Hardware",
    date: "10 Jan 2025 - 10:30am",
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
    item: "Wall Bricks",
    company: "IBD Hardware",
    date: "09 Jan 2025 - 2:15pm",
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
    item: "Power Drill Kit",
    company: "Tool Master Pro",
    date: "08 Jan 2025 - 11:45am",
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
    item: "Pipe and Tap Set",
    company: "Plumbing Solutions",
    date: "07 Jan 2025 - 4:20pm",
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
    item: "Paint Supplies",
    company: "ColorWorks Inc",
    date: "06 Jan 2025 - 9:30am",
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
  item: string;
  company: string;
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
  const uniqueJobNames = Array.from(new Set(receiptsData.map(receipt => receipt.jobName)));
  const uniqueTaskTypes = Array.from(new Set(receiptsData.map(receipt => receipt.taskType)));

  // Filter receipts based on selected filters
  const filteredReceipts = receiptsData.filter(receipt => {
    const matchesJobName = !selectedJobName || receipt.jobName === selectedJobName;
    const matchesTaskType = !selectedTaskType || receipt.taskType === selectedTaskType;
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

  const handlePrintReceipt = (receipt: Receipt) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${receipt.item}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt-header { text-align: center; margin-bottom: 30px; }
            .receipt-details { margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
            .detail-label { font-weight: bold; }
            .amount { font-size: 1.2em; font-weight: bold; }
            .receipt-image { text-align: center; margin: 20px 0; }
            .receipt-image img { max-width: 300px; height: auto; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-header">
            <h1>Receipt</h1>
            <h2>${receipt.company}</h2>
          </div>
          
          <div class="receipt-details">
            <div class="detail-row">
              <span class="detail-label">Customer:</span>
              <span>${receipt.user.name}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${receipt.user.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Item:</span>
              <span>${receipt.item}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${receipt.date}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="amount">${receipt.amount}</span>
            </div>
          </div>
          
          <div class="receipt-image">
            <img src="${receipt.image}" alt="Receipt Image" />
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className={`flex flex-col gap-6 ${!detailPage && " px-4 "} py-4`}>
      <div className="flex justify-between items-center gap-4">
        <DateRangePickerComponent name={!detailPage ? "All Receipts" : ""} />
        <div className="flex justify-between gap-4">
          <Select
            label="Filter by Job Name"
            placeholder="Select Job Name"
            selectedKeys={selectedJobName ? [selectedJobName] : []}
            onChange={(e) => setSelectedJobName(e.target.value)}
            className="w-[200px]" size="sm"

          >
            <SelectItem key="" textValue="">All Jobs</SelectItem>
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
            placeholder="Select Task Type"
            selectedKeys={selectedTaskType ? [selectedTaskType] : []}
            onChange={(e) => setSelectedTaskType(e.target.value)}
            className="w-[200px]"
            size="sm"
          >
            <SelectItem key="" textValue="">All Tasks</SelectItem>
            <>
              {uniqueTaskTypes.map((taskType) => (
                <SelectItem key={taskType} textValue={taskType}>
                  {taskType}
                </SelectItem>
              ))}
            </>
          </Select>
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
                  <TableCell key={column.uid}>
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
                      <div className="text-sm text-default-600">{item.taskType}</div>
                    ) : column.uid === "item" ? (
                      item.item
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
                    ) : (
                      (() => {
                        switch (column.uid) {
                          case "company":
                            return item.company;
                          case "date":
                            return item.date;
                          case "amount":
                            return item.amount;
                          default:
                            return null;
                        }
                      })()
                    )}
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
                {selectedReceipt.item} - {selectedReceipt.company}
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
                    alt={`Receipt for ${selectedReceipt.item}`}
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
                        Item:
                      </span>
                      <p className="text-foreground">{selectedReceipt.item}</p>
                    </div>
                    <div>
                      <span className="font-medium text-default-700">
                        Company:
                      </span>
                      <p className="text-foreground">
                        {selectedReceipt.company}
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
