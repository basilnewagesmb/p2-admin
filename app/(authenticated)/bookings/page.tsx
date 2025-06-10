"use client";

import { Chip, ChipProps } from "@heroui/chip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { columns, users } from "../dashboard/data";

import { Input } from "@heroui/input";
import Link from "next/link";
import { Pagination } from "@heroui/pagination";
import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { User } from "@heroui/user";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function Users() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <Link href={`/users/${user.id}`}>
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            />
          </Link>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            label="Search"
            labelPlacement="inside"
            className="w-full"
          />
        </div>
      </div>
      <div className="overflow-auto w-full">
        <Table aria-label="Users table with custom cells" isStriped removeWrapper>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id} className="hover:bg-gray-100">
                {(columnKey) => (
                  <TableCell
                    className="first:rounded-l-lg last:rounded-r-lg"
                  >
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>
      <div className="flex justify-center md:justify-end w-full">
        <Pagination total={10} initialPage={1} />
      </div>
    </div>
  );
}
