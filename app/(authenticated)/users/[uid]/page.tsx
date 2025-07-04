import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { User } from "@heroui/user";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import {
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  User2,
  Badge as BadgeIcon,
  CalendarDays,
  Clock,
  Badge,
  Check,
  Trash2,
  Ban,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import React from "react";
import { columns, users } from "../../dashboard/data";
import { ChipProps } from "@heroui/chip";

import { getUserByUid } from "@/actions/user.action";
import { formatPhoneNumber } from "@/lib/utils";
import LogResTab from "../(components)/LogResTab";
import { confirmationToast, errorToast, successToast } from "@/lib/toaster";
import ActionButtons from "../(components)/ActionButtons";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
  approved: "success",
  pending: "warning",
  blocked: "danger",
};

type User = (typeof users)[0];

interface ISearchParams {
  searchParams: {
    page: number;
    q: string;
    sort?: string;
    from: string;
    to: string;
    formType: string;
  };
  params: {
    uid: string;
  };
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  fallback?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  fallback = "N/A",
}) => (
  <div className="flex items-start gap-3 py-2 hover:bg-default-50 rounded-lg px-2 transition-colors">
    <div className="flex-shrink-0 mt-0.5 text-default-500">{icon}</div>
    <div className="flex-1 min-w-0">
      <span className="text-sm font-medium text-default-600 block">
        {label}
      </span>
      <p className="text-sm text-default-900 break-words mt-0.5">
        {value || fallback}
      </p>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({
  title,
  icon,
}) => (
  <div className="flex items-center gap-2 mb-4">
    {icon && <div className="text-primary">{icon}</div>}
    <h3 className="text-lg font-semibold text-default-900">{title}</h3>
    <div className="flex-1 h-px bg-default-200 ml-3"></div>
  </div>
);

export default async function UserProfile({
  searchParams,
  params,
}: ISearchParams) {
  const user: any = (await getUserByUid(params.uid)) as any;

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Action handlers (you'll need to implement these functions)

  const getUserStatusColor = (status: string) => {
    return statusColorMap[status] || "default";
  };

  return (
    <div className="flex flex-col w-full h-full p-4 lg:p-6">
      <Card className="w-full shadow-xl border-0 bg-gradient-to-br to-default-50">
        <CardBody className="p-0">
          <div className="flex flex-col xl:flex-row w-full">
            {/* Left Profile Section */}
            <div className="w-80 xl:max-w-sm p-6 xl:p-8">
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <Avatar
                    src={user?.avatar}
                    className="w-24 h-24 text-large ring-4 ring-white shadow-lg"
                    name={user?.name}
                  />
                  {/* Status Badge */}
                  {user?.status && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Chip
                        size="sm"
                        variant="flat"
                        color={getUserStatusColor(user.status)}
                        className="capitalize"
                      >
                        {user.status}
                      </Chip>
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-default-900 mb-1">
                  {user?.name}
                </h2>
              </div>

              {/* Action Buttons */}
              <ActionButtons user={user} />

              {/* Contact Information */}
              <div className="space-y-1 mb-8">
                <SectionHeader
                  title="Contact"
                  icon={<Phone className="w-5 h-5" />}
                />
                <InfoItem
                  icon={<Phone className="w-4 h-4" />}
                  label="Phone"
                  value={
                    user?.phone
                      ? `(${user.phone_code}) ${formatPhoneNumber(user.phone)}`
                      : null
                  }
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={user?.email}
                />
              </div>

              {/* Additional Details */}
              <div className="space-y-1">
                <SectionHeader
                  title="Details"
                  icon={<User2 className="w-5 h-5" />}
                />
                <InfoItem
                  icon={<BadgeIcon className="w-4 h-4" />}
                  label="Title"
                  value={user?.role}
                />
                <InfoItem
                  icon={<CalendarDays className="w-4 h-4" />}
                  label="Joined"
                  value={
                    user?.created_at ? formatJoinDate(user.created_at) : null
                  }
                />
              </div>
            </div>

            {/* Divider */}
            <Divider className="hidden xl:flex" orientation="vertical" />
            <Divider className="xl:hidden flex my-0" orientation="horizontal" />

            {/* Right Content Section */}
            <div className="flex-1 flex flex-col">
              <div className="p-6 xl:p-8 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-default-900 mb-2">
                    Activity & Logs
                  </h2>
                  <p className="text-default-600">
                    View detailed activity logs and recent actions
                  </p>
                </div>

                <div className="flex-1">
                  <LogResTab />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
