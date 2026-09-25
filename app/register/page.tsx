"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (errors.name && val.trim().length > 0) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (errors.email && val.trim() && isValidEmail(val)) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (errors.password && val.length >= 6) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
    // Also check if confirm password matches now
    if (errors.confirmPassword && confirmPassword && val === confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (errors.confirmPassword && val && val === password) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Validate full name: empty or spaces only
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password: empty / fewer than 6 characters
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password: empty / different from password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage(null);
    } else {
      setErrors({});
      setSuccessMessage("Registration successful (demo)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background text-foreground">
      <div className="w-full max-w-md">
        <Card className="border border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <div
                data-testid="form-success"
                className="mb-5 rounded-lg border border-green-500/40 bg-green-500/10 p-3.5 text-sm text-green-700 dark:text-green-300 font-medium"
              >
                {successMessage}
              </div>
            )}

            <form
              noValidate
              data-testid="register-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  data-testid="register-name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="John Doe"
                  autoComplete="name"
                />
                {errors.name && (
                  <p data-testid="error-name" className="text-sm font-medium text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  data-testid="register-email"
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
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  data-testid="register-password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p data-testid="error-password" className="text-sm font-medium text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  data-testid="register-confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p
                    data-testid="error-confirm-password"
                    className="text-sm font-medium text-destructive"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                data-testid="register-submit"
                className="w-full mt-2"
              >
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 border-t pt-4 text-center text-sm text-muted-foreground">
            <p>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in here
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
