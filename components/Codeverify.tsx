"use client";

import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { InputOtp } from "@heroui/input-otp";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ResendCode, VerifyCode } from "@/actions/auth.action";
import { useGlobalState } from "@/store";
import { maskEmail } from "@/utils/maskEmail";

export default function CodeVerifyPage() {
  const state = useGlobalState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!state.getSessionId()) {
      router.push("/");
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const res = await VerifyCode({
      code: value,
      session_id: state.getSessionId(),
    });

    if (!res) {
      toast.error("Internal server error!");
      setIsLoading(false);
      return;
    }

    const { error } = res;

    if (error) {
      toast.error(
        "Invalid or expired code. Please enter the correct code or request a new one.",
        { duration: 2000 }
      );
      setValue("");
      setIsLoading(false);

      if (error === "Code expired") {
        router.push("/login");
      }
    } else {
      toast.success("Code verification successful", { duration: 2000 });
      router.push("/set-password");
    }
  }
  const handleResendCode = async () => {
    if (state.getSessionId()) {
      const res = await ResendCode({ session_id: state.getSessionId() });
      if (!res) {
        console.log("Internal server error!");
        return;
      }
      const { error, data: resData } = res;
      if (!!error) {
        console.log(error);
        if (error == "Maximum number of retries exceeded") {
          toast.error("Maximum number of retries exceeded", { duration: 2000 });
          router.push("/forgot-password");
        } else {
          toast.error("Something went wrong", { duration: 2000 });
        }
      } else {
        console.log("Code resent successful");
        toast.success("Verification code sent", { duration: 2000 });
      }
    } else {
      toast.error("Session Expired", { duration: 2000 });
      router.push("/forgot-password");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {state.getEmail() && (
        <p className="text-sm text-center dark:text-gray-300 mb-4">
          Enter the 6-digit code <br /> we sent{" "}
          <span className="font-semibold">{maskEmail(state.getEmail())}</span>{" "}
          to verify
        </p>
      )}
      <div className="flex flex-col items-center gap-2">
        <InputOtp
          size="lg"
          length={6}
          value={value}
          onValueChange={setValue}
          disabled={isLoading}
        />
      </div>
      <div className="mb-6 flex justify-center ms-2">
        <p className="text-sm dark:text-gray-300 font-normal leading-none ">
          Didn’t receive it? &nbsp;
        </p>
        <label
          className="text-sm cursor-pointer text-primary font-normal leading-none "
          onClick={() => {
            handleResendCode();
          }}
        >
          Resend
        </label>
      </div>
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-[#FF791A] text-white py-2 rounded-md hover:bg-[#FF791A] transition duration-200"
      >
        Continue
      </Button>
    </form>
  );
}
