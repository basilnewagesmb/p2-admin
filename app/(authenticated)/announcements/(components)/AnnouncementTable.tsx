import React, { useState } from "react";
import { Button } from "@heroui/button";
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
import { Plus, Trash2 } from "lucide-react";

interface Announcement {
    id: number;
    title: string;
    message: string;
    date: string;
}

const mockData: Announcement[] = [
    { id: 1, title: "Test Push", message: "Test", date: "01/07/2025 1:31 PM" },
    { id: 2, title: "Test Push", message: "Test Success", date: "01/07/2025 1:30 PM" },
    { id: 3, title: "Another", message: "Another message", date: "01/07/2025 1:29 PM" },
    { id: 4, title: "Sample", message: "Sample message", date: "01/07/2025 1:28 PM" },
    { id: 5, title: "Hello", message: "Hello world", date: "01/07/2025 1:27 PM" },
    { id: 6, title: "Foo", message: "Bar", date: "01/07/2025 1:26 PM" },
    { id: 7, title: "Test 7", message: "Msg 7", date: "01/07/2025 1:25 PM" },
    { id: 8, title: "Test 8", message: "Msg 8", date: "01/07/2025 1:24 PM" },
    { id: 9, title: "Test 9", message: "Msg 9", date: "01/07/2025 1:23 PM" },
    { id: 10, title: "Test 10", message: "Msg 10", date: "01/07/2025 1:22 PM" },
    { id: 11, title: "Test 11", message: "Msg 11", date: "01/07/2025 1:21 PM" },
];

const columns = [
    { name: "#", uid: "serial" },
    { name: "Title", uid: "title" },
    { name: "Message", uid: "message" },
    { name: "Date", uid: "date" },
    { name: "Actions", uid: "actions" },
];

const PAGE_SIZE = 5;

interface AnnouncementTableProps {
    setModalOpen: (open: boolean) => void;
}

const AnnouncementTable: React.FC<AnnouncementTableProps> = ({ setModalOpen }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [announcements, setAnnouncements] = useState<Announcement[]>(mockData);

    // Filter and paginate
    const filtered = announcements.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.message.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handleDelete = (id: number) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
    };

    return (
        <div className="flex flex-col gap-6 px-4 py-4">
            <div className="flex justify-between items-center">
                <SearchableHeader name="Announcements" onlyLabel={true} />
                <Button
                    color="primary"
                    startContent={<Plus size={16} />}
                    onClick={() => setModalOpen(true)}
                >
                    Send Announcements
                </Button>
            </div>
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {paginated.map((item, index) => (
                        <TableRow key={item.id}>
                            {columns.map((column) => (
                                <TableCell key={column.uid}>
                                    {column.uid === "serial" ? (
                                        <div className="text-sm text-default-600">{(currentPage - 1) * PAGE_SIZE + index + 1}</div>
                                    ) : column.uid === "title" ? (
                                        <div className="font-semibold">{item.title}</div>
                                    ) : column.uid === "message" ? (
                                        <div className="max-w-xs truncate">{item.message}</div>
                                    ) : column.uid === "date" ? (
                                        <div className="text-sm text-default-600">{item.date}</div>
                                    ) : column.uid === "actions" ? (
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            color="danger"
                                            onPress={() => handleDelete(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    ) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-center md:justify-end w-full">
                <PaginationClient
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default AnnouncementTable; 