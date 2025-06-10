import { Chip, ChipProps } from "@heroui/chip";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getAllUsers } from "@/actions/user.action";
import React from "react";
import { User } from "@heroui/user";
import { SortableTableHeader } from "@/components/ui/SortableTableHeader";
import { SearchableHeader } from "@/components/ui/SearchableHeader";
import { PaginationClient } from "@/components/ui/PaginationClient";
import { formatPhoneNumber } from "@/lib/utils";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/icons";
import Link from "next/link";

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

export default async function Users({ searchParams }: ISearchParams) {
  const { page: queryPage, q, sort, status, from, to, role } = searchParams;

  const page = queryPage ? +queryPage : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const data = await getAllUsers(offset, limit, q, {
    sort: sort ? sort.split(",") : [],
    status: status || "",
    from: from || "",
    to: to || "",
    role: role || "",
  });
  const users = data?.users || [];
  const tableHeaders = [
    { name: "Name", key: "name", sortable: true },
    { name: "Phone", key: "phone", sortable: false },
    { name: "Role", key: "role", sortable: false },
    { name: "Status", key: "status", sortable: false },
    { name: "Created At", key: "created_at", sortable: true },
    { name: "Actions", key: "", sortable: false },
  ];
  return (
    <div className="flex flex-col gap-6 px-4 py-4">
      <SearchableHeader name="Users" />
      <div className="overflow-auto w-full border-1 p-3 rounded-lg">
        <Table>
          <SortableTableHeader heads={tableHeaders} basePath="/users" />
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
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
                <TableCell>{user?.role}</TableCell>
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
                  <div className="relative flex items-center gap-2 justify-start">
                    <Tooltip content="Details">
                      <Link href={`/users/${user?.uid}`}>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Edit">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
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
          totalPages={Math.ceil(data.count / limit)}
          currentPage={page}
        />
      </div>
    </div>
  );
}
