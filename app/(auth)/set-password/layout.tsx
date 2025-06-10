import { subtitle, title } from "@/components/primitives";
import "@/styles/globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <section className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="hidden md:flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <span className={title({ size: "sm" })}>Control your</span>
              <span className={title({ class: "text-[#FF791A]", size: "sm" })}>
                &nbsp;Team
              </span>
              <span className={title({ size: "sm" })}> Anywhere</span>
              <div className={subtitle({ class: "mt-4 !text-sm" })}>
                Track time, upload receipts, and manage roles all in one place.
              </div>
            </div>
            <Image
              alt="travel"
              width={1080}
              height={1080}
              className="w-[70%]"
              src={"/images/team.webp"}
            />
          </div>

          {children}
        </div>
      </section>
    </div>
  );
}
