"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

const columns = [
  { name: "Date", uid: "date" },
  { name: "In Time", uid: "in" },
  { name: "Out Time", uid: "out" },
  { name: "Duration", uid: "duration" },
  { name: "Location", uid: "location" },
];

const logs = [
  {
    id: 1,
    date: "30 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
  {
    id: 2,
    date: "29 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
  {
    id: 3,
    date: "28 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
  {
    id: 4,
    date: "27 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
  {
    id: 5,
    date: "26 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
  {
    id: 6,
    date: "25 Jun 2025",
    in: "08:00",
    out: "17:00",
    duration: "8h 30m",
    location: "3614 Ray Court, Laurinburg",
  },
];

export default function RecentLogs() {
  return (
    <Table aria-label="Recent Logs Table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
      </TableHeader>
      <TableBody items={logs}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
