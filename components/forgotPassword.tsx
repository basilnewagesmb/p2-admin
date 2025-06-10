"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { ForgotPasswordSchema } from "@/schemas/login-schema";
import { ForgotPassword } from "@/actions/auth.action";
import { useGlobalState } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const state = useGlobalState();
  const router = useRouter();
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    setIsLoading(true);
    const res = await ForgotPassword({ email: values.email });
    if (!res) {
      console.log("Internal server error!");
      return;
    }
    const { error, data: resData } = res;
    setIsLoading(false);
    if (!!error) {
      console.log(error);
      toast.error("This email is not registered", { duration: 2000 });
    } else {
      console.log("Code resent successful");
      state.setSessionId(resData?.session_id || "");
      state.setEmail(values.email || "");
      if (resData?.session_id) {
        toast.success("Verification code sent", { duration: 2000 });
        router.push("verify");
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        label="Email"
        variant="bordered"
        {...form.register("email")}
        isInvalid={!!form.formState.errors.email}
        errorMessage={form.formState.errors.email?.message}
        className="w-full"
        disabled={isLoading}
      />
      <div className="mb-6 flex justify-center ms-2">
        <Link href="/login">
          <label className="text-sm cursor-pointer text-primary font-normal leading-none ">
            Back to Login
          </label>
        </Link>
      </div>
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-[#FF791A] text-white py-2 rounded-md hover:bg-[#FF791A] transition duration-200"
        spinner={
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        }
      >
        Continue
      </Button>
    </form>
  );
}
