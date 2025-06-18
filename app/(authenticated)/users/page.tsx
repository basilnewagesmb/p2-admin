"use client";
import { Chip, ChipProps } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getAllUsers } from "@/actions/user.action";
import React, { useState, useEffect } from "react";
import { User } from "@heroui/user";
import { SortableTableHeader } from "@/components/ui/SortableTableHeader";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";
import { formatPhoneNumber } from "@/lib/utils";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import Link from "next/link";
import { DateRangePickerComponent } from "@/components/ui/DateRangePicker";
import { Select, SelectItem } from "@heroui/select";
import StatusFilterSelect from "./(components)/StatusFilterSelect";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  warning: "warning",
};

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

export default function Users({ searchParams }: ISearchParams) {
  const { page: queryPage, q, sort, status, from, to, role } = searchParams;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const page = queryPage ? +queryPage : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUsers(offset, limit, q, {
          sort: sort ? sort.split(",") : [],
          status: status || "",
          from: from || "",
          to: to || "",
          role: role || "",
        });
        setUsers(data?.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [offset, limit, q, sort, status, from, to, role]);

  // Filter users based on username
  useEffect(() => {
    const filtered = users.filter((user) =>
      user?.name?.toLowerCase().includes(usernameFilter.toLowerCase()) ||
      user?.email?.toLowerCase().includes(usernameFilter.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, usernameFilter]);

  const tableHeaders = [
    { name: "S.No", key: "sno", sortable: false },
    { name: "Name", key: "name", sortable: true },
    { name: "Phone", key: "phone", sortable: false },
    { name: "Status", key: "status", sortable: false },
    { name: "Created At", key: "created_at", sortable: true },
    { name: "Actions", key: "", sortable: false },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-6 px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <DateRangePickerComponent name="All Users" />
          <div className="w-full md:w-64">
            <StatusFilterSelect status={status} />
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <div className="flex flex-col md:flex-row gap-4">
        <DateRangePickerComponent name="All Users" />
        <div className="w-full md:w-64">
          <StatusFilterSelect status={status} />
        </div> <div className="w-full max-w-xs">
          <Input
            type="text"
            placeholder="Filter by username or email..."
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            className="w-full"
            size="lg"
          />
        </div>
      </div>

      {/* Search Section */}


      <div className="overflow-auto w-full border-1 p-3 rounded-lg">
        <Table>
          <SortableTableHeader heads={tableHeaders} basePath="/users" />
          <TableBody>
            {filteredUsers.map((user: any, index: number) => (
              <TableRow key={user.id}>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>
                  <Link href={`/users/${user?.uid}`}>
                    <User
                      avatarProps={{
                        src: user?.avatar,
                      }}
                      description={user?.email}
                      name={user?.name || "Unknown user"}
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  {/* ({user?.phone_code})  */}
                  {formatPhoneNumber(user?.phone)}
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="dot"
                    className=""
                    color={
                      statusColorMap[user?.active ? "active" : "paused"] ||
                      "default"
                    }
                  >
                    {user?.active ? "Active" : "Blocked"}
                  </Chip>
                </TableCell>
                <TableCell>
                  {new Date(user?.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2 justify-center">
                    <Tooltip content="Details">
                      <Link href={`/users/${user?.uid}`}>
                        <span className="mr- text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center md:justify-end w-full">
        <PaginationClient
          totalPages={Math.ceil((filteredUsers.length || users.length) / limit)}
          currentPage={page}
        />
      </div>
    </div>
  );
}
