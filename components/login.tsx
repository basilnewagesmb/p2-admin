"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Button } from "@heroui/button";
import { CheckCircle } from "lucide-react";
import { Input } from "@heroui/input";
import { LoginSchema } from "@/schemas";
import React from "react";
import { login } from "@/actions/auth.action";
import { successToast } from "@/lib/toaster";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const loginForm = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const router = useRouter();
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setLoading(true);
    const loadingtoast = toast.loading("Logging in...");

    const result = await login({
      username: values.email,
      password: values.password,
    });

    toast.remove(loadingtoast);
    setLoading(false);

    if (!result) {
      toast.error("An unexpected error occurred. Please try again.");
      return;
    }

    const { error, data } = result;

    if (error) {
      toast.error(error);
    } else {
      router.push("/dashboard");
      successToast({
        message: "Logged in successfully.",
        icon: <CheckCircle color="green" />,
      });
    }
  }

  return (
    <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="email"
          label="Email"
          variant="bordered"
          disabled={isLoading}
          {...loginForm.register("email")}
          isInvalid={!!loginForm.formState.errors.email}
          errorMessage={loginForm.formState.errors.email?.message}
          className="w-full"
        />
      </div>
      <div>
        <Input
          label="Password"
          variant="bordered"
          disabled={isLoading}
          // placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
          {...loginForm.register("password")}
          isInvalid={!!loginForm.formState.errors.password}
          errorMessage={loginForm.formState.errors.password?.message}
        />
      </div>
      <Button
        isLoading={isLoading}
        type="submit"
        color="secondary"
        className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition duration-200"
        spinner={
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
        Log In
      </Button>
      <p className="text-center text-gray-600 mt-4 dark:text-gray-300">
        {" "}
        <a href="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </a>
      </p>
    </form>
  );
}
