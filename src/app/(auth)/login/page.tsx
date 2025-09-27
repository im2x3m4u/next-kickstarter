import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {/* Copywriting Section */}
        <div className="text-white flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold leading-snug">
            Masuk ke <span className="text-blue-400">Management Talenta</span>{" "}
          </h1>
          <p className="text-gray-300">
            Akses akun Anda untuk mulai mengelola data karyawan, memantau
            aktivitas tim, dan menjaga kolaborasi tetap berjalan lancar. Semua
            yang Anda butuhkan ada di satu tempat!
          </p>
        </div>

        {/* Login Form Card */}
        <div className="flex w-full items-center justify-center sm:p-10 bg-white/5 backdrop-blur-md  rounded-xl shadow-xl">
          <Card className="w-full max-w-lg sm:max-w-xl shadow-lg rounded-xl sm:rounded-2xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                Selamat Datang Kembali 👋
              </CardTitle>
              <p className="text-xs sm:text-sm text-white mt-1">
                Masuk ke akun Anda untuk melanjutkan manajemen talenta
              </p>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
