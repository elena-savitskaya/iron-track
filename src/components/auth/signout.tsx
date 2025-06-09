"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui";

export const SignOut = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signOut({ callbackUrl: "/auth" });
    } catch (error) {
      console.error("Sign out failed", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogout}>
      <Button
        type="submit"
        variant="destructive"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Вихід..." : "Вийти"}
      </Button>
    </form>
  );
};
