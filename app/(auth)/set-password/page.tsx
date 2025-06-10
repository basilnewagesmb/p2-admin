import SetPasswordPage from "@/components/setPassword";
import Image from "next/image";

export default async function Home() {
  return (

    <>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Image alt="travel" width={235} height={68} className="w-32 mx-auto mb-4" src={'/images/LogoWrapper.png'} />

          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center dark:text-white">
            Set password
          </h2>

          <SetPasswordPage />
        </div>
      </div>
    </>
  );
}
