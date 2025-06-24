import React, { useState } from "react";
import { Bell, Send } from "lucide-react";
import { Button } from "@heroui/button";

interface AnnouncementModalProps {
    open: boolean;
    onClose: () => void;
}

const audienceOptions = ["All Stylists", "Customers"];

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ open, onClose }) => {
    const [audience, setAudience] = useState(audienceOptions[0]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative">
                <div className="flex flex-col items-center mb-4">
                    <div className="bg-blue-100 rounded-full p-4 mb-2">
                        <Bell size={40} />
                    </div>
                    <h2 className="text-lg font-semibold">Send Broadcast Message</h2>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Enter title <span className="text-xs text-gray-400">{21 - title.length} characters left</span></label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        maxLength={21}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Enter broadcast message <span className="text-xs text-gray-400">max 147 characters</span></label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        maxLength={147}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Enter broadcast message"
                        rows={3}
                    />
                </div>
                <div className="flex justify-between">
                    <Button color="default" onPress={onClose}>Close</Button>
                    <Button color="primary" startContent={<Send size={16} />}>Send Broadcast</Button>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementModal; 