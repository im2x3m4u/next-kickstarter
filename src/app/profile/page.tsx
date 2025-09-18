"use client"
import { useEffect } from "react"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { ArrowLeft, Mail, Phone, User2, Shield, PencilLine, LogOut } from "lucide-react"

import { userAtom, profileDraftAtom, profileEditModeAtom } from "@/app/state/authState"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { logout } from "@/lib/auth"

export default function ProfilePage() {
  const user = useAtomValue(userAtom)
  const setUser = useSetAtom(userAtom as any) as (u: any) => void
  const [draft, setDraft] = useAtom(profileDraftAtom)
  const [isEdit, setIsEdit] = useAtom(profileEditModeAtom)

  // one-time hydrate from localStorage if atom empty
  useEffect(() => {
    if (user) return
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem("user")
      if (!raw) return
      const parsed = JSON.parse(raw)
      setUser(parsed)
      setDraft({
        nama: parsed?.nama || "",
        username: parsed?.username || "",
        email: parsed?.email || "",
        no_telepon: parsed?.no_telepon || "",
      })
    } catch {
      // ignore parse errors
    }
  }, [user, setUser])

  if (!user) {
    return (
      <div className="min-h-dvh bg-gray-50">
        <div className="">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <Link href="/dashboard" className="inline-flex items-center text-white/90 hover:text-white text-sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Kembali
            </Link>
          </div>
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
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Masuk sekarang</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }


  const startEdit = () => {
    setDraft({
      nama: user.nama || "",
      username: user.username || "",
      email: user.email || "",
      no_telepon: user.no_telepon || "",
    })
    setIsEdit(true)
  }

  const cancelEdit = () => {
    setIsEdit(false)
  }

  const saveEdit = async () => {
    try {
      const res = await fetch(`/api/user/${user.id_user}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: draft.nama,
          username: draft.username,
          email: draft.email,
          no_telepon: draft.no_telepon,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        toast.error(data.message || "Gagal menyimpan profil")
        return
      }
      const updated = data.user
      setUser(updated)
      localStorage.setItem("user", JSON.stringify(updated))
      toast.success("Profil berhasil diperbarui")
      setIsEdit(false)
    } catch (e) {
      toast.error("Terjadi kesalahan. Coba lagi.")
    }
  }

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-indigo-50 via-white to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

      {/* Header gradient */}
      <div className="relative bg-transparent">
        <div className="mx-auto max-w-5xl px-6 py-5 mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Profile Card - glassmorphism */}
      <div className="mx-auto max-w-5xl px-6 -mt-4 pb-14">
        <Card className="overflow-hidden shadow-xl border-0 bg-white/70 backdrop-blur-md">
          <div className="bg-white/60">
            {/* Avatar & name */}
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
                  <Input
                    value={draft.nama}
                    onChange={(e) => setDraft({ ...draft, nama: e.target.value })}
                    className="text-center text-lg text-gray-900"
                    placeholder="Nama"
                  />
                </div>
              ) : (
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900">{user.nama ?? user.username}</h2>
              )}
            </div>

            <Separator className="bg-gray-200/70" />

            {/* Details grid as tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
              <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-indigo-50 text-indigo-600 p-2"><User2 className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">Username</p>
                    {isEdit ? (
                      <Input
                        value={draft.username}
                        onChange={(e) => setDraft({ ...draft, username: e.target.value })}
                        placeholder="Username"
                        className="text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.username ?? "-"}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-sky-50 text-sky-600 p-2"><Mail className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">Email</p>
                    {isEdit ? (
                      <Input
                        type="email"
                        value={draft.email}
                        onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                        placeholder="email@example.com"
                        className="text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.email ?? "-"}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-emerald-50 text-emerald-600 p-2"><Phone className="h-5 w-5" /></div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-500">No. Telepon</p>
                    {isEdit ? (
                      <Input
                        value={draft.no_telepon}
                        onChange={(e) => setDraft({ ...draft, no_telepon: e.target.value })}
                        placeholder="08xxxxxxxxxx"
                        className="text-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{user.no_telepon ?? "-"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200/70" />

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 p-6">
              {!isEdit ? (
                <Button onClick={startEdit} variant="outline" className="gap-2 rounded-lg border-gray-200 hover:border-indigo-300 hover:text-indigo-700">
                  <PencilLine className="h-4 w-4" /> Edit Profil
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={cancelEdit} variant="outline" className="rounded-lg">Batal</Button>
                  <Button onClick={saveEdit} className="rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">Simpan</Button>
                </div>
              )}
              <Button
                variant="destructive"
                className="gap-2 rounded-lg"
                onClick={async () => {
                  const res = await logout()
                  toast.success(res.message)
                  window.location.href = "/"
                }}
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

