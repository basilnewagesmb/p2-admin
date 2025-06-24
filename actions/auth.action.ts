"use server";

import { auth, signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { API } from "@/lib/fetch";
import { passwordSchema } from "@/schemas/login-schema";

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (!!res) {
      revalidatePath("/");
      return { error: null, data: "Login success" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials", data: null };
        default:
          return { error: "Something went wrong", data: null };
      }
    }
  }
};

export async function logOut() {
  await signOut();
}

export const ForgotPassword = async (data: { email: string }) => {
  try {
    const { email } = data;
    const { data: respData, error }: { error: any; data: any } =
      (await API.Post("auth/password/forgot", {
        email,
      })) as {
        error: any;
        data: any;
      };
    if (error) {
      console.log(error);
      return { data: respData, error };
    } else {
      return { data: respData, error: false };
    }
  } catch (error) {
    if (error) {
      return { error: "Something went wrong", data: error };
    }
  }
};
export const ResetPassword = async (data: {
  password: string;
  session_id: string;
}) => {
  try {
    const { session_id, password } = data;
    const { data: respData, error }: { error: any; data: any } =
      (await API.Post("auth/password/reset", {
        session_id,
        password,
      })) as {
        error: any;
        data: any;
      };
    if (error) {
      console.log(error);
      return { data: respData, error };
    } else {
      return { data: respData, error: false };
    }
  } catch (error) {
    if (error) {
      return { error: "Something went wrong", data: error };
    }
  }
};

export const VerifyCode = async (data: {
  code: string;
  session_id: string;
}) => {
  try {
    if (!data.code) return { data: null, error: "Invalid Fields!" };
    const { code, session_id } = data;
    const { data: respData, error }: { error: any; data: any } =
      (await API.Post("auth/otp/verify", {
        otp: code,
        session_id,
      })) as {
        error: any;
        data: any;
      };
    if (error) {
      return { data: respData, error };
    } else {
      return { data: respData, error: false };
    }
  } catch (error) {
    if (error) {
      return { error: "Something went wrong", data: error };
    }
  }
};
export const ResendCode = async (data: { session_id: string }) => {
  try {
    const { session_id } = data;
    const { data: respData, error }: { error: any; data: any } =
      (await API.Post("auth/otp/send", {
        session_id,
      })) as {
        error: any;
        data: any;
      };
    if (error) {
      console.log(error);
      return { data: respData, error };
    } else {
      return { data: respData, error: false };
    }
  } catch (error) {
    if (error) {
      return { error: "Something went wrong", data: error };
    }
  }
};
export async function changePassword(data: z.infer<typeof passwordSchema>) {
  try {
    const validatedFields = passwordSchema.safeParse(data);
    if (!validatedFields.success)
      return { data: null, error: "Invalid Fields!" };
    const { password, currentPassword: old_password } = validatedFields.data;
    const { data: respData, error }: { error: any; data: any } = (await API.Put(
      "user/password",
      { password, old_password }
    )) as { error: any; data: any };
    console.log("🚀 ~ changePassword ~ respData:", respData)
    if (error) {
      return { data: respData, error };
    } else {
      return { data: respData, error: false };
    }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}