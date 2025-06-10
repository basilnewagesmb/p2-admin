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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";

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
  { name: "Item", uid: "item" },
  { name: "Company", uid: "company" },
  { name: "Date", uid: "date" },
  { name: "Amount", uid: "amount" },
  { name: "Receipt", uid: "image" },
];

const receiptsData = [
  {
    id: 1,
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

  const handleReceiptClick = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReceipt(null);
  };
  return (
    <div className={`flex flex-col gap-6 ${!detailPage && " px-4 "} py-4`}>
      {!detailPage && <SearchableHeader name="Receipts " />}
      <Table>
        <TableHeader>
          {columns
            .filter((column) => !(detailPage && column.uid === "user"))
            .map((column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            ))}
        </TableHeader>
        <TableBody>
          {receiptsData.map((item) => (
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
                    ) : column.uid === "image" ? (
                      <div onClick={() => handleReceiptClick(item)}>
                        <Image
                          src={item.image}
                          alt={`Receipt for ${item.item}`}
                          width={50}
                          height={50}
                          className="rounded-md object-cover cursor-pointer hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : (
                      (() => {
                        switch (column.uid) {
                          case "item":
                            return item.item;
                          case "company":
                            return item.company;
                          case "date":
                            return item.date;
                          case "amount":
                            return item.amount;
                          default:
                            return "";
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
