import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/app/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12">
        {/* Copywriting Section */}
        <div className="text-white flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-bold leading-snug">
            Kelola <span className="text-blue-400">Talenta</span> Anda dengan
            Mudah 🚀
          </h1>
          <p className="text-gray-300">
            Daftar sekarang dan nikmati kemudahan mengelola data karyawan,
            peran, dan aktivitas tim Anda dalam satu platform terpadu. Jadikan
            proses manajemen lebih efisien dan terorganisir!
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Kelola data karyawan dan
              role dengan cepat.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Pantau aktivitas dan
              progress tim secara real-time.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Akses dashboard yang
              modern dan interaktif.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✔</span> Dukung kolaborasi lebih
              baik dalam organisasi.
            </li>
          </ul>
        </div>

        {/* Register Form Card */}
        <div className="flex w-full items-center justify-center m-5 sm:p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl">
          <Card className="w-full max-w-lg sm:max-w-xl shadow-lg rounded-xl sm:rounded-2xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                Selamat Datang 👋
              </CardTitle>
              <p className="text-xs sm:text-sm text-white mt-1">
                Buat akun Anda untuk mulai menggunakan Management Talenta
              </p>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
