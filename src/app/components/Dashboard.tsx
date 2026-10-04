import { Train, Ticket, DollarSign, Users, TrendingUp, Calendar } from "lucide-react";

interface DashboardProps {
  userRole: "staff" | "manager";
}

export function Dashboard({ userRole }: DashboardProps) {
  const staffStats = [
    {
      label: "Vé đã bán hôm nay",
      value: "28",
      icon: Ticket,
      color: "bg-[#7FA1B3]",
      trend: "+5.2%",
    },
    {
      label: "Doanh thu của tôi",
      value: "11,200,000 đ",
      icon: DollarSign,
      color: "bg-[#5B7C8F]",
      trend: "+8.1%",
    },
    {
      label: "Khách hàng phục vụ",
      value: "28",
      icon: Users,
      color: "bg-[#4A6B7C]",
      trend: "+5.2%",
    },
  ];

  const managerStats = [
    {
      label: "Tổng doanh thu hôm nay",
      value: "45,600,000 đ",
      icon: DollarSign,
      color: "bg-[#5B7C8F]",
      trend: "+12.5%",
    },
    {
      label: "Vé đã bán",
      value: "234",
      icon: Ticket,
      color: "bg-[#7FA1B3]",
      trend: "+8.2%",
    },
    {
      label: "Chuyến tàu hoạt động",
      value: "18",
      icon: Train,
      color: "bg-[#4A6B7C]",
      trend: "0%",
    },
    {
      label: "Khách hàng mới",
      value: "87",
      icon: Users,
      color: "bg-[#6A8A9B]",
      trend: "+15.3%",
    },
  ];

  const stats = userRole === "staff" ? staffStats : managerStats;

  const recentTickets = [
    {
      id: "VE001234",
      customer: "Nguyễn Văn Minh",
      train: "SE1 - Đà Nẵng - Sài Gòn",
      seat: "A12",
      price: "420,000 đ",
      status: "Đã thanh toán",
    },
    {
      id: "VE001235",
      customer: "Trần Thị Lan",
      train: "SE2 - Đà Nẵng - Hà Nội",
      seat: "B08",
      price: "380,000 đ",
      status: "Đã thanh toán",
    },
    {
      id: "VE001236",
      customer: "Lê Hoàng Nam",
      train: "SE3 - Đà Nẵng - Huế",
      seat: "C15",
      price: "120,000 đ",
      status: "Đã thanh toán",
    },
    {
      id: "VE001237",
      customer: "Phạm Thị Hương",
      train: "SE1 - Đà Nẵng - Sài Gòn",
      seat: "A15",
      price: "420,000 đ",
      status: "Đã thanh toán",
    },
    {
      id: "VE001238",
      customer: "Võ Văn Tân",
      train: "SE4 - Đà Nẵng - Nha Trang",
      seat: "D05",
      price: "350,000 đ",
      status: "Đã thanh toán",
    },
    {
      id: "VE001239",
      customer: "Đặng Thị Mai",
      train: "SE2 - Đà Nẵng - Hà Nội",
      seat: "B12",
      price: "380,000 đ",
      status: "Đã thanh toán",
    },
  ];

  const upcomingTrains = [
    {
      code: "SE1",
      route: "Đà Nẵng → Sài Gòn",
      departure: "14:30",
      seats: "45/120",
      status: "Còn chỗ",
    },
    {
      code: "SE2",
      route: "Đà Nẵng → Hà Nội",
      departure: "15:45",
      seats: "98/120",
      status: "Sắp hết",
    },
    {
      code: "SE3",
      route: "Đà Nẵng → Huế",
      departure: "09:20",
      seats: "78/120",
      status: "Còn chỗ",
    },
    {
      code: "SE4",
      route: "Đà Nẵng → Nha Trang",
      departure: "16:20",
      seats: "23/120",
      status: "Còn chỗ",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-[#7FA1B3]/20 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7FA1B3] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#4A6B7C]">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp size={14} className="text-emerald-600" />
                    <span className="text-xs text-emerald-600">{stat.trend}</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
          <div className="p-6 border-b border-[#E5EFF5]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#4A6B7C]">Vé bán gần đây</h3>
              <button className="text-sm text-[#7FA1B3] hover:text-[#4A6B7C] font-medium">Xem tất cả</button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between p-4 bg-[#F5F9FB] rounded-lg hover:bg-[#E5EFF5] transition-colors border border-[#E5EFF5]"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#4A6B7C]">{ticket.customer}</p>
                    <p className="text-sm text-[#7FA1B3]">{ticket.train}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-[#7FA1B3]">Mã: {ticket.id}</span>
                      <span className="text-xs text-[#7FA1B3]">Ghế: {ticket.seat}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#4A6B7C]">{ticket.price}</p>
                    <span className="inline-block px-3 py-1 mt-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Trains */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
          <div className="p-6 border-b border-[#E5EFF5]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#4A6B7C]">Chuyến tàu sắp chạy</h3>
              <Calendar size={20} className="text-[#7FA1B3]" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTrains.map((train) => (
                <div
                  key={train.code}
                  className="flex items-center justify-between p-4 border border-[#E5EFF5] rounded-lg hover:border-[#7FA1B3] transition-colors bg-[#F5F9FB]/50 hover:bg-[#F5F9FB]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#7FA1B3]/10 rounded-lg flex items-center justify-center">
                      <Train size={24} className="text-[#4A6B7C]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#4A6B7C]">{train.code}</p>
                      <p className="text-sm text-[#7FA1B3]">{train.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-[#4A6B7C]">{train.departure}</p>
                    <p className="text-xs text-[#7FA1B3] mt-1">{train.seats} ghế</p>
                    <span
                      className={`inline-block px-3 py-1 mt-1 text-xs font-medium rounded-full ${
                        train.status === "Còn chỗ"
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-orange-700 bg-orange-50"
                      }`}
                    >
                      {train.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}