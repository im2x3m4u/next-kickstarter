// "use client";

// import { useSearchParams } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import PasswordInput from "./PasswordInput";
// import { useAtom } from "jotai";
// import {
//   usernameAtom,
//   passwordAtom,
//   userAtom,
//   tokenAtom,
// } from "@/app/state/authState";
// import { validateLogin } from "@/app/lib/validation/authValidation";
// import { toast } from "sonner";
// import { globalLoadingAtom } from "@/app/state/uiState";

// export default function LoginForm() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const [username, setUsername] = useAtom(usernameAtom);
//   const [password, setPassword] = useAtom(passwordAtom);
//   const [, setUser] = useAtom(userAtom);
//   const [, setToken] = useAtom(tokenAtom);
//   const [isLoading, setIsLoading] = useAtom(globalLoadingAtom);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const error = validateLogin(username, password);
//     if (error) {
//       toast.error(error);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         username,
//         password,
//       });

//       console.log("SignIn Result:", result);

//       if (result?.error) {
//         toast.error("Login gagal!", { description: result.error });
//         return;
//       }

//         // Ambil session setelah login sukses
//       const sessionRes = await fetch("/api/auth/session");
//       const session = await sessionRes.json();
//       console.log("Session setelah login:", session);

//       setUser(session.user);
//       localStorage.setItem("user", JSON.stringify(session.user));


//       // Ketika user berhasil login
//       toast.success(
//         `Login berhasil! Selamat datang, ${session.user.username}!`
//       );

//       // Redirect sesuai role
//       const roles = session.user.roles as string[];
//       if (roles.includes("admin")) {
//         router.push("/dashboard");
//       } else if (roles.includes("user")) {
//         router.push("/home");
//       } else {
//         router.push("/login");
//       }
//     } catch (err: any) {
//       toast.error("Login gagal!", { description: err.message });
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form className="space-y-4" onSubmit={handleLogin}>
//         <div>
//           <Label htmlFor="username" className="text-white">
//             Username
//           </Label>
//           <Input
//             id="username"
//             type="text"
//             placeholder="Masukkan username Anda"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="h-10 mt-1 text-white sm:h-11"
//             required
//           />
//         </div>

//         <div>
//           <Label htmlFor="password" className="text-white">
//             Password
//           </Label>
//           <PasswordInput
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div className="mt-1 text-right">
//             <a
//               href="/forgot-password"
//               className="text-sm text-blue-400 hover:underline"
//             >
//               Lupa Password?
//             </a>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-10 text-white bg-blue-600 sm:h-11 hover:bg-blue-700"
//         >
//           {isLoading ? "Memproses..." : "Masuk"}
//         </Button>

//         <p className="text-xs text-center text-white sm:text-sm">
//           Belum punya akun?{" "}
//           <a href="/register" className="text-blue-400 hover:underline">
//             Daftar
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { useAtom } from "jotai";
import {
  usernameAtom,
  passwordAtom,
  userAtom,
  tokenAtom,
} from "@/app/state/authState";
import { validateLogin } from "@/app/lib/validation/authValidation";
import { toast } from "sonner";
import { globalLoadingAtom } from "@/app/state/uiState";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const [isLoading, setIsLoading] = useAtom(globalLoadingAtom);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateLogin(username, password);
    if (error) {
      toast.error(error);
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      console.log("SignIn Result:", result);

      if (result?.error) {
        toast.error("Login gagal!", { description: result.error });
        return;
      }

          // Ambil session setelah login sukses
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      console.log("Session setelah login:", session);

      setUser(session.user);
      localStorage.setItem("user", JSON.stringify(session.user));


      // Ketika user berhasil login
      toast.success(
        `Login berhasil! Selamat datang, ${session.user.username}!`
      );

      // Redirect sesuai role
      const roles = session.user.roles as string[];
      if (roles.includes("admin")) {
        router.push("/dashboard");
      } else if (roles.includes("user")) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      toast.error("Login gagal!", { description: err.message });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <Label htmlFor="username" className="text-white">
            Username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Masukkan username Anda"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 mt-1 text-white sm:h-11"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-1 text-right">
            <a
              href="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Lupa Password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 text-white bg-blue-600 sm:h-11 hover:bg-blue-700"
        >
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>

        <p className="text-xs text-center text-white sm:text-sm">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Daftar
          </a>
        </p>
      </form>
    </div>
  );
}