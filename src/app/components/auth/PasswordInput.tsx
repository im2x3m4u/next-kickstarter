"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useAtom } from "jotai";
import { showPasswordAtom } from "@/app/state/uiState";

type PasswordInputProps = {
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({ id, value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom);

  return (
    <div className="relative mt-1">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={value}
        onChange={onChange}
        className="h-10 sm:h-11 pr-10 text-white"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
