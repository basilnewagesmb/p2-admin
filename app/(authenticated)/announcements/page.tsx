"use client";
import { useState } from "react";
import AnnouncementTable from "./(components)/AnnouncementTable";
import AnnouncementModal from "./(components)/AnnouncementModal";

export default function AnnouncementsPage() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>

            <AnnouncementTable setModalOpen={setModalOpen} />
            <AnnouncementModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
} 