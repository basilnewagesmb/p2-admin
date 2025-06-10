import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import { auth } from "@/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <>
      <SidebarProvider>
        <AppSidebar session={session} />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="w-full pt-5 px-6">{children}</div>
        </div>
      </SidebarProvider>
    </>
  );
}
