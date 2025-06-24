"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function SettingsPage() {
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    // TODO: Fetch current user email and setEmail

    const handleEmailChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailLoading(true);
        // TODO: Call API to update email
        setTimeout(() => {
            setEmail(newEmail);
            setEmailLoading(false);
        }, 1000);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordLoading(true);
        // TODO: Call API to update password
        setTimeout(() => {
            setPassword("");
            setConfirmPassword("");
            setCurrentPassword("");
            setPasswordLoading(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-center p-6">
            <div className="w-full max-w-lg space-y-8">
                <Card className="p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Edit Email</h2>
                    <form onSubmit={handleEmailChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Current Email</label>
                            <Input
                                value={email}
                                disabled
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">New Email</label>
                            <Input
                                type="email"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={emailLoading} className="w-full bg-[#FF791A] text-white py-2 rounded-md hover:bg-[#FF791A] transition duration-200">
                            {emailLoading ? "Updating..." : "Update Email"}
                        </Button>
                    </form>
                </Card>
                <Divider className="my-4" />
                <Card className="p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Current Password</label>
                            <Input
                                type="password"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">New Password</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full"
                                required
                            />
                        </div>
                        <Button type="submit" disabled={passwordLoading} className="w-full bg-[#FF791A] text-white py-2 rounded-md hover:bg-[#FF791A] transition duration-200">
                            {passwordLoading ? "Changing..." : "Change Password"}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
} 