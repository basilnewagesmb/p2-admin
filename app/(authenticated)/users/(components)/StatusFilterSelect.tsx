'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select, SelectItem } from '@heroui/select'; // replace with your actual import path
import React from 'react';

export default function StatusFilterSelect({ status }: { status?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        const value = e.target.value;

        if (value) {
            params.set('status', value);
        } else {
            params.delete('status');
        }

        params.set('page', '1');

        // Use the new router.push for client-side navigation
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select
            label="Filter by Status"
            placeholder="Select status"
            selectedKeys={status ? [status] : []}
            onChange={handleChange}
        >
            <SelectItem key="">All</SelectItem>
            <SelectItem key="active">Active</SelectItem>
            <SelectItem key="blocked">Blocked</SelectItem>
        </Select>
    );
}
