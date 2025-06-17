"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AlertCircleIcon,
  CheckCircle,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  User2,
  Logs,
  ReceiptText,
  CircleCheckBig,
  FolderPen,
  Target,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { User } from "@heroui/user";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { confirmationToast, successToast } from "@/lib/toaster";
import { logOut } from "@/actions/auth.action";
import Image from "next/image";
import { usePathname } from "next/navigation";
import packageJson from "../package.json";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Users",
    url: "/users",
    icon: User2,
  },
  {
    title: "Summary",
    url: "/summary",
    icon: Target,
  },
  {
    title: "All Log Entries",
    url: "/logs",
    icon: Logs,
  },
  {
    title: "All Receitps",
    url: "/receipts",
    icon: ReceiptText,
  },
  {
    title: "Job Names",
    url: "/job-names",
    icon: FolderPen,
  },
  {
    title: "Task Types",
    url: "/task-types",
    icon: CircleCheckBig,
  },
];

export function AppSidebar({ session }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const appVersion = packageJson.version;

  const [user, setUser] = useState<any>();
  const myProfile = async () => {
    try {
      setUser(session?.user);
    } catch (error: any) {
      toast.error(error.message || "Uh oh! Something went wrong.");
    }
  };

  useEffect(() => {
    myProfile();
  }, [session, useSession]);

  const appLlogout = async () => {
    try {
      confirmationToast({
        btnLabel: "Yes",
        cancelBtnLabel: "Cancel",
        message: "Do you really want to logout?",
        icon: <AlertCircleIcon color="red" />,
        async onConfirm() {
          await logOut();
          successToast({
            message: "Logged out successfully.",
            icon: <CheckCircle color="green" />,
          });
          router.push("/");
        },
        async onCancel() {},
      });
    } catch (error) {}
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-start items-center gap-1 m-1 my-3">
          <Link href={"/dashboard"}>
            <Image
              alt="travel"
              width={100}
              height={100}
              className="w-10 h-6 mx-2"
              src={"/images/LogoWrapper.png"}
            />
          </Link>
          <p className="font-semibold ">P2 Contracting</p>
        </div>
      </SidebarHeader>
      <Divider />
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Group 1</SidebarGroupLabel> */}
          <SidebarGroupContent className="my-3">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="p-5"
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>{" "}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <Divider className="my-2 w-2/3 mx-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs ms-3 text-gray-500">Version {appVersion}</p>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="py-6" asChild>
                <SidebarMenuButton>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: user?.avatar,
                    }}
                    description={user?.email ? user.email : ""}
                    name={user?.name || ""}
                  >
                    {user?.name}
                  </User>{" "}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer py-2">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer  py-2">
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={appLlogout}
                  className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer  py-2"
                >
                  <LogOut className="mr-1 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
