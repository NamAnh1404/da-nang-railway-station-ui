import { Search, CreditCard, Banknote, Calendar, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useState } from "react";
import { usePayment } from "../contexts/PaymentContext";

interface PaymentManagementProps {
  userRole?: "staff" | "manager";
}

export function PaymentManagement({ userRole = "staff" }: PaymentManagementProps) {
  const { payments: allPayments } = usePayment();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState<"all" | "cash" | "transfer">("all");
  const [filterDate, setFilterDate] = useState("2026-04-02");
  const [showMethodDropdown, setShowMethodDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const itemsPerPage = 10;

  const filteredPayments = allPayments.filter((payment) => {
    const matchesSearch = !searchQuery ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMethod = filterMethod === "all" ||
      (filterMethod === "cash" && payment.methodKey === "cash") ||
      (filterMethod === "transfer" && payment.methodKey === "transfer");

    const matchesDate = payment.date === filterDate;

    return matchesSearch && matchesMethod && matchesDate;
  });

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amountNum, 0);
  const cashAmount = filteredPayments.filter(p => p.methodKey === "cash").reduce((sum, p) => sum + p.amountNum, 0);
  const transferAmount = filteredPayments.filter(p => p.methodKey === "transfer").reduce((sum, p) => sum + p.amountNum, 0);

  const stats = [
    {
      label: "Tổng thanh toán hôm nay",
      value: `${totalAmount.toLocaleString()} đ`,
      icon: CreditCard,
      color: "bg-[#4A6B7C]",
    },
    {
      label: "Thanh toán tiền mặt",
      value: `${cashAmount.toLocaleString()} đ`,
      icon: Banknote,
      color: "bg-[#5B7C8F]",
    },
    {
      label: "Thanh toán chuyển khoản",
      value: `${transferAmount.toLocaleString()} đ`,
      icon: CreditCard,
      color: "bg-[#7FA1B3]",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (payment: any) => {
    setSelectedPayment(payment);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Detail Modal */}
      {showDetailModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chi tiết vé</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã thanh toán:</span>
                <span className="font-bold text-[#4A6B7C]">{selectedPayment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedPayment.ticketId}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedPayment.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Số tiền:</span>
                <span className="font-bold text-emerald-600">{selectedPayment.amount} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Hình thức:</span>
                <span className="text-[#4A6B7C]">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ngày thanh toán:</span>
                <span className="text-[#4A6B7C]">{selectedPayment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Thời gian:</span>
                <span className="text-[#4A6B7C]">{selectedPayment.time}</span>
              </div>
              {userRole === "manager" && (
                <div className="flex justify-between">
                  <span className="text-[#7FA1B3]">Nhân viên:</span>
                  <span className="text-[#4A6B7C]">{selectedPayment.staff}</span>
                </div>
              )}
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Trạng thái:</span>
                <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-medium rounded-full ${
                  selectedPayment.status === "Đã hoàn vé"
                    ? "bg-orange-50 text-orange-700"
                    : "bg-emerald-50 text-emerald-700"
                }`}>
                  <CheckCircle size={14} />
                  {selectedPayment.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowDetailModal(false)}
              className="w-full px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-[#7FA1B3]/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#7FA1B3] mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#4A6B7C]">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]"
                size={20}
              />
              <input
                type="text"
                placeholder="Nhập mã thanh toán, mã vé, tên khách hàng để tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div className="relative min-w-[180px]">
                <button
                  onClick={() => setShowMethodDropdown(!showMethodDropdown)}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    {filterMethod === "all" && "Tất cả"}
                    {filterMethod === "cash" && (
                      <>
                        <Banknote size={18} />
                        Tiền mặt
                      </>
                    )}
                    {filterMethod === "transfer" && (
                      <>
                        <CreditCard size={18} />
                        Chuyển khoản
                      </>
                    )}
                  </span>
                  <ChevronDown size={18} className="text-[#7FA1B3]" />
                </button>
                {showMethodDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border-2 border-[#E5EFF5] rounded-xl shadow-lg">
                    <button
                      onClick={() => {
                        setFilterMethod("all");
                        setShowMethodDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-[#4A6B7C] hover:bg-[#F5F9FB] rounded-t-xl"
                    >
                      Tất cả
                    </button>
                    <button
                      onClick={() => {
                        setFilterMethod("cash");
                        setShowMethodDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-[#4A6B7C] hover:bg-[#F5F9FB] flex items-center gap-2"
                    >
                      <Banknote size={18} />
                      Tiền mặt
                    </button>
                    <button
                      onClick={() => {
                        setFilterMethod("transfer");
                        setShowMethodDropdown(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-[#4A6B7C] hover:bg-[#F5F9FB] flex items-center gap-2 rounded-b-xl"
                    >
                      <CreditCard size={18} />
                      Chuyển khoản
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F9FB] border-b border-[#E5EFF5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Mã thanh toán
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Mã vé
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Số tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Hình thức
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Thời gian
                </th>
                {userRole === "manager" && (
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Nhân viên
                  </th>
                )}
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EFF5]">
              {currentItems.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#F5F9FB]/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#4A6B7C]">{payment.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#7FA1B3]">{payment.ticketId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#4A6B7C]">{payment.customer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-bold text-[#4A6B7C]">{payment.amount} đ</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {payment.method === "Tiền mặt" ? (
                        <Banknote size={16} className="text-[#7FA1B3]" />
                      ) : (
                        <CreditCard size={16} className="text-[#7FA1B3]" />
                      )}
                      <span className="text-[#4A6B7C]">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#7FA1B3]" />
                      <span className="text-[#4A6B7C]">{payment.time}</span>
                    </div>
                  </td>
                  {userRole === "manager" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#7FA1B3]">{payment.staff}</span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 inline-flex items-center gap-1 text-xs font-medium rounded-full ${
                      payment.status === "Đã hoàn vé"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      <CheckCircle size={14} />
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetail(payment)}
                      className="p-2 text-[#4A6B7C] hover:bg-[#7FA1B3]/10 rounded-lg transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[#4A6B7C]">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}