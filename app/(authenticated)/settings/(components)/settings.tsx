"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, Tab } from "@heroui/tabs";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import toast from "react-hot-toast";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Card, CardBody } from "@heroui/card";
import { passwordSchema } from "@/schemas/login-schema";
import { changePassword } from "@/actions/auth.action";
import { errorToast, successToast } from "@/lib/toaster";
import { CheckCircle, X } from "lucide-react";

// Zod Schemas
const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
});

export default function Settings() {
    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
    });

    // Individual visibility toggles for each password field
    const [visibility, setVisibility] = React.useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [isLoading, setLoading] = React.useState(false);

    const toggleVisibility = (field: keyof typeof visibility) => {
        setVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const onSubmitProfile = (data: z.infer<typeof profileSchema>) => {
        // toast.success("Profile updated!");
        successToast({
            message: "Profile updated!",
            icon: <CheckCircle color="green" />,
        });
        console.log(data);
    };

    const onSubmitPassword = async (values: z.infer<typeof passwordSchema>) => {
        setLoading(true);

        // const { data, error } = await changePassword({
        //     password: values.password,
        //     currentPassword: values.currentPassword,
        //     confirmPassword: values.confirmPassword
        // });
        // if (error) {
        //     if (typeof (error) == 'string') {
        //         // toast.error(error, { duration: 2000 })
        //         errorToast({
        //             message: error,
        //             icon: <X color="red" />,
        //         });
        //     } else {
        //         passwordForm.reset()
        //         // toast.error('Something went wrong', { duration: 2000 })
        //         errorToast({
        //             message: "Something went wrong.",
        //             icon: <X color="red" />,
        //         });
        //     }
        // };
        // if (!error) {
        //     passwordForm.reset()
        //     // toast.success('Your password has been changed successfully.', { duration: 2000 })
        //     successToast({
        //         message: "Your password has been changed successfully.",
        //         icon: <CheckCircle color="green" />,
        //     });
        // }
        // setLoading(false);

    };
    const password = passwordForm.watch("password");
    const ConfirmPassword = passwordForm.watch("confirmPassword");
    useEffect(() => {
        if (passwordForm.getFieldState('confirmPassword').isDirty) {
            passwordForm.trigger("confirmPassword");
        }
        if (!!passwordForm.getValues('password')) {
            passwordForm.trigger("password");
        }
    }, [password, ConfirmPassword, passwordForm.trigger]);
    return (
        <div className="flex w-full md:max-w-md mx-auto flex-col mt-10">
            <Tabs aria-label="Settings Options" radius="full" variant={"bordered"} classNames={{ tabList: "w-full" }}>
                <Tab key="email" title="Edit Email" className="cursor-default">
                    <Card>
                        <CardBody>
                            <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    disabled={isLoading}
                                    {...profileForm.register("email")}
                                    isInvalid={!!profileForm.formState.errors.email}
                                    errorMessage={profileForm.formState.errors.email?.message}
                                />
                                <Button isLoading={isLoading} type="submit" className="w-full" color="primary">
                                    Update Email
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="password" title="Change Password" className="cursor-default">
                    <Card>
                        <CardBody>
                            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                                <Input
                                    label="Current Password"
                                    type={visibility.current ? "text" : "password"}
                                    endContent={
                                        <button type="button" onClick={() => toggleVisibility("current")}>
                                            {visibility.current ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                        </button>
                                    }
                                    disabled={isLoading}
                                    {...passwordForm.register("currentPassword")}
                                    isInvalid={!!passwordForm.formState.errors.currentPassword}
                                    errorMessage={passwordForm.formState.errors.currentPassword?.message}
                                />

                                <Input
                                    label="New Password"
                                    type={visibility.new ? "text" : "password"}
                                    endContent={
                                        <button type="button" onClick={() => toggleVisibility("new")}>
                                            {visibility.new ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                        </button>
                                    }
                                    disabled={isLoading}
                                    {...passwordForm.register("password")}
                                    isInvalid={!!passwordForm.formState.errors.password}
                                    errorMessage={passwordForm.formState.errors.password?.message}
                                />

                                <Input
                                    label="Confirm Password"
                                    type={visibility.confirm ? "text" : "password"}
                                    endContent={
                                        <button type="button" onClick={() => toggleVisibility("confirm")}>
                                            {visibility.confirm ? <EyeOpenIcon /> : <EyeClosedIcon />}
                                        </button>
                                    }
                                    disabled={isLoading}
                                    {...passwordForm.register("confirmPassword")}
                                    isInvalid={!!passwordForm.formState.errors.confirmPassword}
                                    errorMessage={passwordForm.formState.errors.confirmPassword?.message}
                                />

                                <Button isLoading={isLoading} type="submit" className="w-full" color="primary">
                                    Update Password
                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Tab>

            </Tabs>
        </div>
    );
}