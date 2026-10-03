"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  // Error message returned by Supabase (e.g. "Invalid login credentials")
  const [authError, setAuthError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email) {
      if (val.trim() && isValidEmail(val)) {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password) {
      if (val.length > 0) {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);
    const newErrors: { email?: string; password?: string } = {};

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      // Real login through Supabase (via AuthContext)
      const { error } = await signIn(email, password);
      if (error) {
        setAuthError(error.message);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background text-foreground">
      <div className="w-full max-w-md">
        <Card className="border border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {authError && (
              <div
                data-testid="error-auth"
                className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5 text-sm text-destructive font-medium"
              >
                {authError}
              </div>
            )}

            <form
              noValidate
              data-testid="login-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  data-testid="login-email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p data-testid="error-email" className="text-sm font-medium text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  data-testid="login-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p data-testid="error-password" className="text-sm font-medium text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-testid="login-submit"
                className="w-full mt-2"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register here
              </Link>
            </p>
            <p>
              <Link href="/" className="text-xs hover:underline text-muted-foreground">
                &larr; Back to Home
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
