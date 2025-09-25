import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import IlustrationLogin from "@/assets/IlustrationLogin.png";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <div className="hidden lg:flex w-1/2 bg-gray-100 items-center justify-center">
        <Image
          src={IlustrationLogin}
          alt="Ilustration Login"
          width={600}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-6 sm:p-10">
        <Card className="w-full max-w-sm sm:max-w-md shadow-lg rounded-xl sm:rounded-2xl">
          <CardHeader className="text-center pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Selamat Datang 👋
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Masuk ke akun Anda untuk melanjutkan
            </p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
