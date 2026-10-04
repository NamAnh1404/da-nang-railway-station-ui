import { TrendingUp, Download, Calendar, DollarSign, Train } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export function Reports() {
  const revenueData = [
    { month: "T1", revenue: 45000000, tickets: 234 },
    { month: "T2", revenue: 52000000, tickets: 267 },
    { month: "T3", revenue: 48000000, tickets: 245 },
    { month: "T4", revenue: 61000000, tickets: 312 },
    { month: "T5", revenue: 58000000, tickets: 298 },
    { month: "T6", revenue: 67000000, tickets: 345 },
  ];

  const trainPerformance = [
    { train: "SE1", tickets: 145, revenue: 60900000 },
    { train: "SE2", tickets: 132, revenue: 50160000 },
    { train: "SE3", tickets: 98, revenue: 11760000 },
    { train: "SE4", tickets: 87, revenue: 27840000 },
    { train: "SE5", tickets: 76, revenue: 13680000 },
  ];

  const employeeStats = [
    { name: "Nguyễn Văn An", tickets: 87, revenue: "36,540,000" },
    { name: "Trần Thị Bình", tickets: 76, revenue: "31,920,000" },
    { name: "Lê Văn Cường", tickets: 65, revenue: "27,300,000" },
    { name: "Phạm Thị Dung", tickets: 54, revenue: "22,680,000" },
    { name: "Hoàng Văn Em", tickets: 48, revenue: "20,160,000" },
    { name: "Võ Thị Phương", tickets: 42, revenue: "17,640,000" },
    { name: "Đặng Văn Giang", tickets: 39, revenue: "16,380,000" },
    { name: "Bùi Thị Hoa", tickets: 35, revenue: "14,700,000" },
    { name: "Ngô Văn Ích", tickets: 31, revenue: "13,020,000" },
    { name: "Lý Thị Kiều", tickets: 28, revenue: "11,760,000" },
    { name: "Mai Văn Long", tickets: 25, revenue: "10,500,000" },
    { name: "Dương Thị Mai", tickets: 22, revenue: "9,240,000" },
    { name: "Trương Văn Nam", tickets: 19, revenue: "7,980,000" },
    { name: "Phan Thị Oanh", tickets: 16, revenue: "6,720,000" },
    { name: "Vũ Văn Phong", tickets: 14, revenue: "5,880,000" },
  ];

  const activeTrains = [
    { train: "SE1", route: "Đà Nẵng → Sài Gòn", departure: "14:30", arrival: "04:15", seats: "320/450", status: "Đang hoạt động", onTime: true },
    { train: "SE2", route: "Đà Nẵng → Hà Nội", departure: "15:45", arrival: "08:30", seats: "280/450", status: "Đang hoạt động", onTime: true },
    { train: "SE3", route: "Đà Nẵng → Huế", departure: "09:20", arrival: "11:45", seats: "150/200", status: "Đang hoạt động", onTime: false },
    { train: "SE4", route: "Đà Nẵng → Nha Trang", departure: "18:00", arrival: "03:45", seats: "195/320", status: "Đang hoạt động", onTime: true },
    { train: "SE5", route: "Đà Nẵng → Quy Nhơn", departure: "07:30", arrival: "12:15", seats: "180/250", status: "Đang hoạt động", onTime: true },
    { train: "SE6", route: "Đà Nẵng → Sài Gòn", departure: "22:00", arrival: "11:45", seats: "410/450", status: "Đang hoạt động", onTime: true },
    { train: "SE7", route: "Đà Nẵng → Hà Nội", departure: "06:15", arrival: "23:00", seats: "325/450", status: "Đang hoạt động", onTime: false },
  ];

  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Từ ngày</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Đến ngày</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
            </div>
            <div className="pt-7">
              <button className="px-5 py-2.5 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors shadow-md hover:shadow-lg">
                Xem báo cáo
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg">
            <Download size={20} />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#4A6B7C] to-[#3D5766] rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#C5D9E3]">Tổng doanh thu</p>
            <DollarSign size={24} />
          </div>
          <p className="text-3xl font-bold mb-1">331,340,000 đ</p>
          <div className="flex items-center gap-1">
            <TrendingUp size={16} />
            <span className="text-sm">+15.3% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#5B7C8F] to-[#4A6B7C] rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#C5D9E3]">Tổng vé đã bán</p>
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-bold mb-1">1,701 vé</p>
          <div className="flex items-center gap-1">
            <TrendingUp size={16} />
            <span className="text-sm">+12.8% so với tháng trước</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
          <h3 className="text-lg font-bold text-[#4A6B7C] mb-4">Doanh thu 6 tháng gần đây</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5EFF5" />
              <XAxis dataKey="month" stroke="#7FA1B3" />
              <YAxis stroke="#7FA1B3" />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} đ`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#4A6B7C" strokeWidth={3} name="Doanh thu" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Train Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
          <h3 className="text-lg font-bold text-[#4A6B7C] mb-4">Hiệu suất theo chuyến tàu</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trainPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5EFF5" />
              <XAxis dataKey="train" stroke="#7FA1B3" />
              <YAxis stroke="#7FA1B3" />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="tickets" fill="#4A6B7C" name="Số vé" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Trains Report */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
        <div className="p-6 border-b border-[#E5EFF5]">
          <div className="flex items-center gap-2">
            <Train className="text-[#4A6B7C]" size={24} />
            <h3 className="text-lg font-bold text-[#4A6B7C]">Báo cáo chuyến tàu hoạt động</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F9FB] border-b border-[#E5EFF5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Tàu
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Tuyến đường
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Khởi hành
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Đến nơi
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Ghế đã bán/Tổng
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Tỷ lệ lấp đầy
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EFF5]">
              {activeTrains.map((train) => {
                const [sold, total] = train.seats.split('/').map(Number);
                const fillRate = Math.round((sold / total) * 100);

                return (
                  <tr key={train.train} className="hover:bg-[#F5F9FB]/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-[#4A6B7C]">{train.train}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#4A6B7C]">{train.route}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#7FA1B3]">{train.departure}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#7FA1B3]">{train.arrival}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{train.seats}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[#E5EFF5] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${fillRate >= 80 ? 'bg-emerald-500' : fillRate >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`}
                            style={{ width: `${fillRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-[#4A6B7C]">{fillRate}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full inline-block w-fit">
                          {train.status}
                        </span>
                        {train.onTime ? (
                          <span className="text-xs text-emerald-600">Đúng giờ</span>
                        ) : (
                          <span className="text-xs text-orange-600">Chậm 15 phút</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
        <div className="p-6 border-b border-[#E5EFF5]">
          <h3 className="text-lg font-bold text-[#4A6B7C]">Nhân viên bán vé</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F9FB]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Nhân viên
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Số vé bán
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Doanh thu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EFF5]">
                {employeeStats.map((employee, index) => (
                  <tr key={index} className="hover:bg-[#F5F9FB]/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#7FA1B3]/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-[#4A6B7C] text-sm">
                            {employee.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-[#4A6B7C]">{employee.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{employee.tickets} vé</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{employee.revenue} đ</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
