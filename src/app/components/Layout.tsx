import { ReactNode } from "react";
import {
  LayoutDashboard,
  Train,
  Ticket,
  CreditCard,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

type UserRole = "staff" | "manager";

interface LayoutProps {
  children: ReactNode;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles: UserRole[];
}

const staffMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboard,
    allowedRoles: ["staff", "manager"],
  },
  {
    id: "trains",
    label: "Quản lý chuyến tàu",
    icon: Train,
    allowedRoles: ["manager"],
  },
  {
    id: "tickets",
    label: "Bán vé",
    icon: Ticket,
    allowedRoles: ["staff"],
  },
  {
    id: "refund",
    label: "Hoàn vé",
    icon: RotateCcw,
    allowedRoles: ["staff"],
  },
  {
    id: "payments",
    label: "Thanh toán",
    icon: CreditCard,
    allowedRoles: ["staff"],
  },
  {
    id: "reports",
    label: "Báo cáo thống kê",
    icon: BarChart3,
    allowedRoles: ["manager"],
  },
  {
    id: "users",
    label: "Quản lý nhân viên",
    icon: Users,
    allowedRoles: ["manager"],
  },
];

const managerMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboard,
    allowedRoles: ["staff", "manager"],
  },
  {
    id: "trains",
    label: "Quản lý chuyến tàu",
    icon: Train,
    allowedRoles: ["manager"],
  },
  {
    id: "tickets",
    label: "Bán vé",
    icon: Ticket,
    allowedRoles: ["staff"],
  },
  {
    id: "refund",
    label: "Quản lý hoàn vé",
    icon: RotateCcw,
    allowedRoles: ["manager"],
  },
  {
    id: "payments",
    label: "Quản lý thanh toán",
    icon: CreditCard,
    allowedRoles: ["manager"],
  },
  {
    id: "reports",
    label: "Báo cáo thống kê",
    icon: BarChart3,
    allowedRoles: ["manager"],
  },
  {
    id: "users",
    label: "Quản lý nhân viên",
    icon: Users,
    allowedRoles: ["manager"],
  },
];

export function Layout({
  children,
  activeMenu,
  onMenuChange,
  userRole,
  userName,
  onLogout,
}: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = userRole === "staff" ? staffMenuItems : managerMenuItems;
  const filteredMenuItems = menuItems.filter((item) =>
    item.allowedRoles.includes(userRole)
  );

  const roleLabel = userRole === "staff" ? "Nhân viên bán vé" : "Quản lý ga";

  return (
    <div className="h-screen flex bg-[#F5F9FB] overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-gradient-to-b from-[#4A6B7C] to-[#3D5766] text-white">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Ga Đà Nẵng</h1>
              <p className="text-xs text-[#C5D9E3]">Hệ thống bán vé</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 bg-white/5">
          <p className="text-sm text-[#C5D9E3] mb-1">{roleLabel}</p>
          <p className="font-medium">{userName}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onMenuChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                  isActive
                    ? "bg-white text-[#4A6B7C] shadow-lg"
                    : "text-[#C5D9E3] hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#C5D9E3] hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-[#4A6B7C] rounded-xl flex items-center justify-center text-white shadow-lg"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#4A6B7C] to-[#3D5766] text-white z-40 flex flex-col">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Train className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">Ga Đà Nẵng</h1>
                  <p className="text-xs text-[#C5D9E3]">Hệ thống bán vé</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white/5">
              <p className="text-sm text-[#C5D9E3] mb-1">{roleLabel}</p>
              <p className="font-medium">{userName}</p>
            </div>

            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              {filteredMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onMenuChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                      isActive
                        ? "bg-white text-[#4A6B7C] shadow-lg"
                        : "text-[#C5D9E3] hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#C5D9E3] hover:bg-white/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Đăng xuất</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">{children}</div>
      </main>
    </div>
  );
}