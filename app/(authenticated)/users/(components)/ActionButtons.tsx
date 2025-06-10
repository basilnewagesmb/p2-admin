"use client";
import React from "react";
import { confirmationToast, errorToast, successToast } from "@/lib/toaster";
import {
  AlertCircle,
  Ban,
  Check,
  CheckCircle,
  Trash2,
  UserCheck,
} from "lucide-react";
import { Button } from "@heroui/button";

function ActionButtons({
  user,
}: {
  user: { uid: string; name: string; active: string };
}) {
  const isBlocked = !user?.active;
  const handleApprove = async () => {
    confirmationToast({
      btnLabel: "Yes, Approve",
      cancelBtnLabel: "Cancel",
      message: `Are you sure you want to approve ${user?.name}?`,
      icon: <CheckCircle color="green" />,
      async onConfirm() {
        try {
          // Add your approve logic here
          // await approveUser(user.uid);
          successToast({
            message: "User approved successfully.",
            icon: <CheckCircle color="green" />,
          });
          // Refresh the page or update state
          window.location.reload();
        } catch (error) {
          errorToast({
            message: "Failed to approve user.",
            icon: <AlertCircle color="red" />,
          });
        }
      },
      async onCancel() {},
    });
  };

  const handleDelete = async () => {
    confirmationToast({
      btnLabel: "Yes, Delete",
      cancelBtnLabel: "Cancel",
      message: `Are you sure you want to delete ${user?.name}? This action cannot be undone.`,
      icon: <AlertCircle color="red" />,
      async onConfirm() {
        try {
          // Add your delete logic here
          // await deleteUser(user.uid);
          successToast({
            message: "User deleted successfully.",
            icon: <CheckCircle color="green" />,
          });
          // Redirect to users list or dashboard
          // router.push("/dashboard/users");
        } catch (error) {
          errorToast({
            message: "Failed to delete user.",
            icon: <AlertCircle color="red" />,
          });
        }
      },
      async onCancel() {},
    });
  };

  const handleBlockUnblock = async () => {
    const isBlocked = !user?.active;
    const action = isBlocked ? "unblock" : "block";
    const actionTitle = isBlocked ? "Unblock" : "Block";

    confirmationToast({
      btnLabel: `Yes, ${actionTitle}`,
      cancelBtnLabel: "Cancel",
      message: `Are you sure you want to ${action} ${user?.name}?`,
      icon: <AlertCircle color={isBlocked ? "green" : "red"} />,
      async onConfirm() {
        try {
          // Add your block/unblock logic here
          // await toggleUserBlockStatus(user.uid, !isBlocked);
          successToast({
            message: `User ${action}ed successfully.`,
            icon: <CheckCircle color="green" />,
          });
          // Refresh the page or update state
          window.location.reload();
        } catch (error) {
          errorToast({
            message: `Failed to ${action} user.`,
            icon: <AlertCircle color="red" />,
          });
        }
      },
      async onCancel() {},
    });
  };

  return (
    <div className="mb-8 space-y-3">
      <div className="flex flex-col gap-2">
        {/* Approve Button - Only show if user is pending */}
        <Button
          color="success"
          variant="flat"
          className="w-full"
          startContent={<Check className="w-4 h-4" />}
          onPress={handleApprove}
        >
          Approve User
        </Button>

        {/* Block/Unblock Button */}
        <Button
          color={isBlocked ? "success" : "warning"}
          variant="flat"
          className="w-full"
          startContent={
            isBlocked ? (
              <UserCheck className="w-4 h-4" />
            ) : (
              <Ban className="w-4 h-4" />
            )
          }
          onPress={handleBlockUnblock}
        >
          {isBlocked ? "Unblock User" : "Block User"}
        </Button>

        {/* Delete Button */}
        <Button
          color="danger"
          variant="flat"
          className="w-full"
          startContent={<Trash2 className="w-4 h-4" />}
          onPress={handleDelete}
        >
          Delete User
        </Button>
      </div>
    </div>
  );
}

export default ActionButtons;
