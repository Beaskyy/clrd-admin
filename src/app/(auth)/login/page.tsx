"use client";

import Image from "next/image";
// import Cookies from "js-cookie";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to dashboard if user is already authenticated
    if (status === "authenticated" && session) {
      router.replace("/");
    }
  }, [session, status, router]);

  const formSchema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = async (values: FormValues) => {
    setDisabled(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "UNAUTHORIZED") {
          // Handle unathorized required case
          toast.error("You are not authorized to view this page.");
       
        } else {
          toast.error(result.error);
        }
        setDisabled(false);
      } else {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An unexpected error occurred";
      toast.error(message);
      setDisabled(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 bg-white">
      <div className="overflow-y-auto">
        <div className="p-8">
          <Image src="/images/logo.png" alt="Logo" width={119} height={31} />
        </div>
        <div className="mt-[50px] flex justify-center items-center flex-col gap-8">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-center text-[28px] font-bold">Welcome back</h2>
            <p className="text-center text-[#737372] text-base leading-6 tracking-[0.1px]">
              Kindly fill in your details to continue
            </p>
          </div>

          <div className="w-full lg:max-w-[432px] p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-normal text-[#344054]">
                        Email address *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-1">
                      <FormLabel className="text-sm font-normal text-[#344054]">
                        Password *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="**********"
                          {...field}
                          className="border border-[#F5F5F5] rounded-lg py-2.5 px-[14px] placeholder:text-[#667085] shadow-none h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={disabled}
                  className="w-full mt-8 h-11 rounded-full text-base font-medium shadow-sm"
                >
                  Login
                </Button>
                <div className="flex justify-center items-center border border-[#F5F5F5] h-11 rounded-full mt-4 shadow-sm text-[#344054] font-medium text-base gap-3 cursor-pointer hover:opacity-80">
                  <Image
                    src="/images/google.svg"
                    alt="google"
                    width={24}
                    height={24}
                  />
                  Sign in with Google
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-screen sticky top-0">
        <Image
          src="/images/lady.svg"
          alt="Sign In"
          fill
          className="absolute object-cover object-top"
        />
      </div>
    </div>
  );
};

export default Login;
