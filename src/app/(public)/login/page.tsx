"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  Layers,
  BarChart3,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setErrorMessage("");
    setIsLoading(true);

    // Dummy Authentication Check
    setTimeout(() => {
      if (data.username === "admin" && data.password === "@Admin04") {
        // Successful Login -> Redirect to Dashboard
        router.push("/admin/dashboard");
      } else {
        // Invalid Credentials Error
        setErrorMessage("Invalid username or password. (Hint: admin / @Amin04)");
        setIsLoading(false);
      }
    }, 600); // 0.6 second delay to simulate API loading
  };

  return (
    <main className="min-h-screen w-full bg-[var(--cream-dark)] text-[var(--ink)] flex items-center justify-center p-4 lg:p-8 font-[family-name:var(--font-body)]">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 bg-[var(--cream)] rounded-[var(--radius)] shadow-xl overflow-hidden border border-[var(--slate)]/10 min-h-[640px]">
        {/* Left Side: Illustration / Brand Section (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-6 bg-gradient-to-br from-[var(--ink)] to-[var(--ink-light)] p-12 text-[var(--cream)] flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--cyan)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header & Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[var(--gold)] flex items-center justify-center text-[var(--cream)] shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-[var(--cream)] block leading-none">
                DMS ERP
              </span>
              <span className="text-xs text-[var(--cyan)] font-medium tracking-wider uppercase">
                Enterprise Suite
              </span>
            </div>
          </div>

          {/* Graphical Illustration Area */}
          <div className="relative z-10 my-auto py-8">
            <div className="bg-[var(--ink-light)]/60 border border-[var(--cyan)]/20 rounded-2xl p-6 backdrop-blur-sm mb-8 space-y-4">
              <div className="flex items-center gap-4 border-b border-[var(--slate)]/20 pb-4">
                <div className="p-3 bg-[var(--cyan)]/10 text-[var(--cyan)] rounded-xl">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--cream)]">
                    Real-time Distribution
                  </h3>
                  <p className="text-xs text-[var(--slate)]/80">
                    Unified logistics and inventory tracking
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[var(--gold)]/10 text-[var(--gold-light)] rounded-xl">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--cream)]">
                    Role-Based Security
                  </h3>
                  <p className="text-xs text-[var(--slate)]/80">
                    Granular permissions across operational nodes
                  </p>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--cream)] mb-2">
              Distribution Management System
            </h1>
            <p className="text-sm text-[var(--cream-dark)]/80 leading-relaxed max-w-md">
              Streamline multi-channel distribution, inventory control, and supply chain operations in a single workspace.
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="relative z-10 text-xs text-[var(--slate)]/60">
            DMS ERP Platform. All rights reserved.
          </div>
        </div>

        {/* Right Side: Login Card Form */}
        <div className="col-span-1 lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-[var(--cream)]">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo Display */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-[var(--gold)] flex items-center justify-center text-[var(--cream)] shadow-md">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-[var(--ink)] block leading-none">
                  DMS ERP
                </span>
                <span className="text-xs text-[var(--gold)] font-medium tracking-wider uppercase">
                  Enterprise Suite
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ink)] tracking-tight">
                Welcome back
              </h2>
              <p className="text-sm text-[var(--slate)] mt-2">
                Enter your system credentials to access your account.
              </p>
            </div>

            {/* Error Alert Message */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Card className="border-0 shadow-none p-0 bg-transparent">
              <CardContent className="p-0">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Username Field */}
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--ink)] font-medium text-sm">
                            Username
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--slate)]" />
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your username"
                                className="pl-10 h-11 bg-[var(--cream-dark)]/50 border-[var(--slate)]/20 focus:border-[var(--cyan)] focus:ring-[var(--cyan)]/20 rounded-[var(--radius)] text-sm text-[var(--ink)]"
                                aria-label="Username"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--ink)] font-medium text-sm">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--slate)]" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-10 h-11 bg-[var(--cream-dark)]/50 border-[var(--slate)]/20 focus:border-[var(--cyan)] focus:ring-[var(--cyan)]/20 rounded-[var(--radius)] text-sm text-[var(--ink)]"
                                aria-label="Password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--slate)] hover:text-[var(--ink)] focus:outline-none focus:text-[var(--ink)] p-1 rounded"
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between pt-1">
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 rounded border-[var(--slate)]/30 text-[var(--ink)] focus:ring-[var(--cyan)]/20 cursor-pointer"
                            />
                            <Label
                              htmlFor="rememberMe"
                              className="text-xs text-[var(--slate)] font-normal cursor-pointer"
                            >
                              Remember me
                            </Label>
                          </div>
                        )}
                      />

                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-[var(--ink)] hover:text-[var(--gold)] transition-colors focus:outline-none focus:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Primary Login Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 bg-[var(--ink)] hover:bg-[var(--ink-light)] text-[var(--cream)] font-semibold rounded-[var(--radius)] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Logging in...
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          Login
                        </>
                      )}
                    </Button>

                    {/* Register Option */}
                    <div className="text-center pt-4 border-t border-[var(--slate)]/10">
                      <p className="text-xs text-[var(--slate)]">
                        Don&apos;t have an account?{" "}
                        <Link
                          href="/register"
                          className="font-bold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors focus:outline-none focus:underline ml-1"
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}