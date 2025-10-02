// import { useAtom } from "jotai";
// import { useEffect, useState } from "react";
// import { userAtom, profileDraftAtom, profileEditModeAtom } from "@/app/state/authState";
// import { toast } from "sonner";

// export function useProfileUser() {
//   const [user, setUser] = useAtom(userAtom);
//   const [draft, setDraft] = useAtom(profileDraftAtom);
//   const [isEdit, setIsEdit] = useAtom(profileEditModeAtom);

//   useEffect(() => {
//     if (!user) {
//       const raw = localStorage.getItem("user");
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         setUser(parsed);
//         setDraft({
//           nama: parsed.nama || "",
//           username: parsed.username || "",
//           email: parsed.email || "",
//           no_telepon: parsed.no_telepon || "",
//         });
//       }
//     }
//   }, [user, setUser]);

//   const saveEdit = async () => {
//     if (!user) return;
//     try {
//       const res = await fetch(`/api/user/${user.id_user}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(draft),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Gagal update profil");
//       setUser(data.user);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       toast.success("Profil berhasil diperbarui");
//       setIsEdit(false);
//     } catch (e: any) {
//       toast.error(e.message);
//     }
//   };

//   return { user, draft, setDraft, isEdit, setIsEdit, saveEdit };
// }
