import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Should be an email!",
      required_error: "Email is required!",
    })
    .email({
      message: "Email is required!",
    }),
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(8, {
      message: "Password must be at least 8 characters long!",
    }),
});

export const DialogSchema = z.object({
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(1, {
      message: "Password is required",
    }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const SetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long!")
      .max(32, "The password must be a maximum of 32 character!"),
    confirmPassword: z.string(),
    session_id: z.string().optional(),
    uid: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password required"),
    password: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });