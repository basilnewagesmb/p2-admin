import { LayoutDashboard, User2 } from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "P2 Contracting |  Control your Team Anywhere",
  description:
    "Track time, upload receipts, and manage roles all in one place.",
  navItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "users",
      icon: User2,
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
