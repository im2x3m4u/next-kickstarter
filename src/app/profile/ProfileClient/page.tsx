"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  ArrowLeft,
  Mail,
  Phone,
  User2,
  PencilLine,
  Edit3,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useProfile } from "@/app/hooks/useProfile";

export default function ProfileClient({ session }: { session: any }) {
  const {
    user,
    draft,
    isEdit,
    setDraft,
    startEdit,
    cancelEdit,
    saveEdit,
    showPasswordForm,
    startPasswordEdit,
    cancelPasswordEdit,
    savePassword,
    passwordData,
    setPasswordData,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useProfile();

  const sessionUser = session?.user;

  if (!sessionUser) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-white/90 hover:text-white text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-6 -mt-10">
          <Card className="p-0 overflow-hidden shadow-lg">
            <div className="bg-white">
              <div className="flex flex-col items-center pt-14 pb-6">
                <div className="h-24 w-24 rounded-full ring-4 ring-white bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                  <User2 className="h-10 w-10" />
                </div>
                <p className="mt-4 text-gray-500 text-sm">Anda belum login</p>
              </div>
              <Separator />
              <div className="p-6 text-center">
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Masuk sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-indigo-50 via-white to-white overflow-hidden">
      {/* Breadcrumb */}
      <div className="relative bg-transparent">
        <div className="mx-auto max-w-5xl px-6 py-5 mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={sessionUser.roles?.includes("admin") ? "/dashboard" : "/home"}
                >
                  {sessionUser.roles?.includes("admin") ? "Dashboard" : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Profile Card */}
      <div className="mx-auto max-w-5xl px-6 -mt-4 pb-14">
        <Card className="overflow-hidden shadow-xl border-0 bg-white/70 backdrop-blur-md">
          <div className="bg-white/60">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center pt-16 pb-10">
              <div className="relative">
                <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-[3px]">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-gray-400">
                    <User2 className="h-12 w-12" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 ring-4 ring-white" />
              </div>
              {isEdit ? (
                <div className="mt-5 w-full max-w-xs">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">Nama</span>
                    <Edit3 className="h-3 w-3 text-indigo-500" />
                  </div>
                  <Input
                    value={draft.nama}
                    onChange={(e) => setDraft({ ...draft, nama: e.target.value })}
                    className="text-center text-lg text-gray-900"
                    placeholder="Nama"
                  />
                </div>
              ) : (
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">
                  {user?.nama ?? user?.username}
                </h2>
              )}
            </div>

            <Separator className="bg-gray-200/70" />

            {/* Details grid */}
            {!showPasswordForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
                {/* Username */}
                <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-50 text-indigo-600 p-2">
                      <User2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500">
                        Username
                      </p>
                      {isEdit ? (
                        <Input
                          value={draft.username}
                          placeholder="Username"
                          className="text-gray-900 bg-gray-100 cursor-not-allowed"
                          readOnly
                          disabled
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {user?.username ?? "-"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-sky-50 text-sky-600 p-2">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">
                          Email
                        </p>
                        {isEdit && <Edit3 className="h-3 w-3 text-indigo-500" />}
                      </div>
                      {isEdit ? (
                        <Input
                          type="email"
                          value={draft.email}
                          onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                          placeholder="email@example.com"
                          className="text-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user?.email ?? "-"}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-emerald-50 text-emerald-600 p-2">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] uppercase tracking-wider text-gray-500">
                          No. Telepon
                        </p>
                        {isEdit && <Edit3 className="h-3 w-3 text-indigo-500" />}
                      </div>
                      {isEdit ? (
                        <Input
                          value={draft.no_telepon}
                          onChange={(e) => setDraft({ ...draft, no_telepon: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="text-gray-900"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{user?.no_telepon ?? "-"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Separator className="bg-gray-200/70" />

            {/* Password Form */}
            {showPasswordForm && (
              <div className="p-6 mt-3 bg-yellow-50 border border-yellow-200 rounded-lg mx-6 mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-yellow-800">Ubah Password</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Password Baru
                    </label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Masukkan password baru (min. 6 karakter)"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Konfirmasi password baru"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={cancelPasswordEdit} variant="outline" className="rounded-lg border-gray-300 hover:border-gray-400">
                      Batal
                    </Button>
                    <Button onClick={savePassword} className="rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white">
                      Simpan Password
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 p-6">
              {!isEdit && !showPasswordForm ? (
                <>
                  <Button onClick={startEdit} variant="outline" className="gap-2 rounded-lg border-gray-200 hover:border-indigo-300 hover:text-indigo-700">
                    <PencilLine className="h-4 w-4" /> Edit Profil
                  </Button>
                  <Button onClick={startPasswordEdit} variant="outline" className="gap-2 rounded-lg border-yellow-200 hover:border-yellow-300 hover:text-yellow-700">
                    <Lock className="h-4 w-4" /> Ubah Password
                  </Button>
                </>
              ) : isEdit ? (
                <div className="flex gap-2">
                  <Button onClick={cancelEdit} variant="outline" className="rounded-lg">
                    Batal
                  </Button>
                  <Button onClick={saveEdit} className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                    Simpan
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
