"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SetPasswordSchema } from "@/schemas/login-schema";
import { useGlobalState } from "@/store";
import { useRouter } from "next/navigation";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { EyeClosedIcon } from "lucide-react";
import { ResetPassword } from "@/actions/auth.action";

export default function SetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const router = useRouter();
  const state = useGlobalState();

  const form = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
  });

  const toggleVisibility = () => setIsVisible((v) => !v);
  const toggleConfirmVisibility = () => setIsConfirmVisible((v) => !v);
  useEffect(() => {
    if (!state.getSessionId()) {
      router.push("/login");
    }
  }, []);

  async function onSubmit(values: z.infer<typeof SetPasswordSchema>) {
    const session_id = state.getSessionId();

    if (!session_id) {
      toast.error("Session expired. Please try again.");
      router.push("/");
      return;
    }

    setIsLoading(true);

    const res = await ResetPassword({
      password: values.password,
      session_id,
    });

    setIsLoading(false);

    if (!res || res.error) {
      toast.error(res?.error || "Something went wrong.");
    } else {
      toast.success("Password successfully set!");
      router.push("/login");
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="New Password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
          className="w-full"
          disabled={isLoading}
          {...form.register("password")}
          isInvalid={!!form.formState.errors.password}
          errorMessage={form.formState.errors.password?.message}
          endContent={
            <button
              type="button"
              onClick={toggleVisibility}
              aria-label="Toggle password visibility"
              className="focus:outline-none"
            >
              {isVisible ? (
                <EyeOpenIcon className="text-2xl text-default-400" />
              ) : (
                <EyeClosedIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
        />
      </div>

      <div>
        <Input
          label="Confirm Password"
          type={isConfirmVisible ? "text" : "password"}
          variant="bordered"
          disabled={isLoading}
          className="w-full"
          {...form.register("confirmPassword")}
          isInvalid={!!form.formState.errors.confirmPassword}
          errorMessage={form.formState.errors.confirmPassword?.message}
          endContent={
            <button
              type="button"
              onClick={toggleConfirmVisibility}
              aria-label="Toggle confirm password visibility"
              className="focus:outline-none"
            >
              {isConfirmVisible ? (
                <EyeOpenIcon className="text-2xl text-default-400" />
              ) : (
                <EyeClosedIcon className="text-2xl text-default-400" />
              )}
            </button>
          }
        />
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
