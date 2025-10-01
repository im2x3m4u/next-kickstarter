export default function CheckEmailPage() {
  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Registrasi Berhasil 🎉</h1>
        <p>Silakan cek email Anda untuk verifikasi akun.</p>
        <p className="text-sm text-gray-400">
          Jika tidak menemukan email, coba cek folder Spam/Promotions.
        </p>
      </div>
    </div>
  );
}
