"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Once loading is done, send logged-out visitors to the login page.
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Render nothing while the session is loading or while redirecting.
  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background text-foreground">
      <div className="w-full max-w-md">
        <Card data-testid="account-page" className="border border-border shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">My Account</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p data-testid="account-email" className="text-base font-medium">
              {user.email}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
