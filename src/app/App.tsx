import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { TrainManagement } from "./components/TrainManagement";
import { TicketSales } from "./components/TicketSales";
import { Reports } from "./components/Reports";
import { PaymentManagement } from "./components/PaymentManagement";
import { UserManagement } from "./components/UserManagement";
import { RefundTicket } from "./components/RefundTicket";
import { PaymentProvider } from "./contexts/PaymentContext";

type UserRole = "staff" | "manager" | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setActiveMenu("dashboard");
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName("");
    setActiveMenu("dashboard");
  };

  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "trains":
        return userRole === "manager" ? (
          <TrainManagement />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-8 text-center">
            <p className="text-[#4A6B7C]">Bạn không có quyền truy cập chức năng này</p>
          </div>
        );
      case "tickets":
        return <TicketSales />;
      case "refund":
        return <RefundTicket userRole={userRole} />;
      case "payments":
        return <PaymentManagement userRole={userRole} />;
      case "reports":
        return userRole === "manager" ? (
          <Reports />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-8 text-center">
            <p className="text-[#4A6B7C]">Bạn không có quyền truy cập chức năng này</p>
          </div>
        );
      case "users":
        return userRole === "manager" ? (
          <UserManagement />
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-8 text-center">
            <p className="text-[#4A6B7C]">Bạn không có quyền truy cập chức năng này</p>
          </div>
        );
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <PaymentProvider>
      <Layout
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        userRole={userRole}
        userName={userName}
        onLogout={handleLogout}
      >
        {renderContent()}
      </Layout>
    </PaymentProvider>
  );
}