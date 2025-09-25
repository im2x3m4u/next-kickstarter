"use client";

import * as React from "react";
import { useAtom } from "jotai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { forgotPasswordAtom } from "@/app/state/authState";
import { globalLoadingAtom } from "@/app/state/uiState";
import { requestPasswordReset } from "@/app/lib/services/authService";
import { notify } from "@/app/utils/notify";

// Schema validasi pakai Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [_, setEmail] = useAtom(forgotPasswordAtom);
  const [isLoading, setIsLoading] = useAtom(globalLoadingAtom);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordForm) => {
    setIsLoading(true);
    setEmail(values.email);

    try {
      const data = await requestPasswordReset(values.email);
      notify.success(
        "Berhasil!",
        data.message || "Link reset password telah dikirim!"
      );
    } catch (err: any) {
      notify.error("Gagal!", err.message || "Terjadi kesalahan, coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Lupa Password 🔑
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Masukkan email Anda untuk menerima tautan reset password
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="text-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 sm:h-11"
              >
                {isLoading ? "Memproses..." : "Kirim Link Reset"}
              </Button>

              {/* Back to Login */}
              <p className="text-center text-sm text-gray-500 mt-2">
                Ingat password Anda?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Masuk
                </a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
