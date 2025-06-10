"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

type CommonPasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export const CommonPasswordInput = ({ ...props }: CommonPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="******"
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-6 w-6" />
        ) : (
          <Eye className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
