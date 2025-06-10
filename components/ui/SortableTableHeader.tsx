"use client";

import { ArrowDownUp, MoveDown, MoveUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Head {
    name: string;
    key: string;
    sortable?: boolean;
    className?: string;
}

interface SortableTableHeaderProps {
    heads: Head[];
    basePath: string; // e.g. "/users"
}

export function SortableTableHeader({ heads, basePath }: SortableTableHeaderProps) {
    const [sortState, setSortState] = useState<{ key: string; dir: string } | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const sort = searchParams.get("sort");
        if (sort) {
            const [key, dir] = sort.split(",");
            if (key && dir) {
                setSortState({ key, dir });
            }
        } else {
            setSortState(null);
        }
    }, [searchParams]);

    const handleSortClick = (head: Head) => {
        const query = new URLSearchParams(searchParams.toString());
        const current = sortState?.key === head.key ? sortState?.dir : null;

        let nextDir: string | null;
        if (current === "asc") nextDir = "desc";
        else if (current === "desc") nextDir = null;
        else nextDir = "asc";

        if (nextDir) {
            query.set("sort", `${head.key},${nextDir}`);
        } else {
            query.delete("sort");
        }

        router.replace(`${basePath}?${query.toString()}`, { scroll: false });
    };

    return (
        <thead>
            <tr>
                {/* <th className="px-6 py-6">#</th> */}
                {heads.map((head, idx) => {
                    const isSorted = sortState?.key === head.key;
                    const dir = sortState?.dir;

                    return (
                        <th
                            key={idx}
                            className={`px-3 py-3 cursor-pointer first:rounded-l-lg last:rounded-r-lg  ${head.className ?? ""} bg-default-100`}
                            onClick={() => head.sortable && handleSortClick(head)}
                        >
                            <div className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 ">
                                <span>{head.name}</span>
                                {head.sortable && !isSorted && (
                                    <ArrowDownUp className="text-[#00000030] dark:text-[#ffffff30]" size={15} />
                                )}
                                {head.sortable && isSorted && dir === "asc" && (
                                    <MoveUp className="text-[#00000090] dark:text-[#ffffff90]" size={15} />
                                )}
                                {head.sortable && isSorted && dir === "desc" && (
                                    <MoveDown className="text-[#00000090] dark:text-[#ffffff90]" size={15} />
                                )}
                            </div>
                        </th>

                    );
                })}
            </tr>
        </thead>
    );
}
