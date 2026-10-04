import { useState } from "react";
import { Train, User, Lock } from "lucide-react";

type UserRole = "staff" | "manager" | null;

interface LoginPageProps {
  onLogin: (role: UserRole, name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo credentials
    const credentials = [
      { username: "nhanvien", password: "123456", name: "Nguyễn Văn An", role: "staff" as UserRole },
      { username: "quanly", password: "123456", name: "Trần Thị Bình", role: "manager" as UserRole },
    ];

    const user = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (user) {
      onLogin(user.role, user.name);
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7FA1B3] via-[#5B7C8F] to-[#4A6B7C] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
            <Train className="w-10 h-10 text-[#4A6B7C]" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hệ Thống Quản Lý Bán Vé
          </h1>
          <p className="text-[#C5D9E3] text-sm">Ga Đà Nẵng</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7FA1B3]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:border-[#7FA1B3] focus:outline-none transition-colors text-[#4A6B7C]"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7FA1B3]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:border-[#7FA1B3] focus:outline-none transition-colors text-[#4A6B7C]"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#4A6B7C] hover:bg-[#3D5766] text-white font-medium py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              Đăng nhập
            </button>

            {/* Demo Info */}
            <div className="mt-6 p-4 bg-[#F5F9FB] rounded-lg">
              <p className="text-xs text-[#7FA1B3] font-medium mb-2">Thông tin đăng nhập demo:</p>
              <div className="space-y-1 text-xs text-[#4A6B7C]">
                <p><strong>Nhân viên:</strong> nhanvien / 123456</p>
                <p><strong>Quản lý:</strong> quanly / 123456</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[#C5D9E3] text-sm mt-6">
          © 2026 Ga Đà Nẵng
        </p>
      </div>
    </div>
  );
}
