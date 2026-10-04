import { Search, AlertCircle, CheckCircle, XCircle, Printer, Calendar, User, CreditCard, Eye, X, Edit2 } from "lucide-react";
import { useState } from "react";
import { usePayment } from "../contexts/PaymentContext";

interface RefundTicketProps {
  userRole?: "staff" | "manager";
}

export function RefundTicket({ userRole = "staff" }: RefundTicketProps) {
  const { updatePaymentStatus } = usePayment();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [refundReason, setRefundReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [refundData, setRefundData] = useState<any>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRefund, setEditingRefund] = useState<any>(null);
  const [editReason, setEditReason] = useState("");

  // Mock data - vé đã bán
  const [soldTickets, setSoldTickets] = useState([
    {
      id: "VE001234",
      customer: "Nguyễn Văn Minh",
      customerId: "079123456789",
      phone: "0912345678",
      train: "SE1",
      route: "Đà Nẵng → Sài Gòn",
      departure: "14:30",
      seat: "A12",
      price: 420000,
      date: "2026-04-06",
      bookingDate: "2026-04-02 14:30",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001235",
      customer: "Trần Thị Lan",
      customerId: "079987654321",
      phone: "0987654321",
      train: "SE2",
      route: "Đà Nẵng → Hà Nội",
      departure: "15:45",
      seat: "B08",
      price: 380000,
      date: "2026-04-07",
      bookingDate: "2026-04-02 14:25",
      paymentMethod: "Chuyển khoản",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001236",
      customer: "Lê Hoàng Nam",
      customerId: "079345678901",
      phone: "0901234567",
      train: "SE3",
      route: "Đà Nẵng → Huế",
      departure: "09:20",
      seat: "C15",
      price: 120000,
      date: "2026-04-05",
      bookingDate: "2026-04-02 14:20",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001237",
      customer: "Phạm Văn Đức",
      customerId: "079112233445",
      phone: "0923456789",
      train: "SE4",
      route: "Đà Nẵng → Nha Trang",
      departure: "18:00",
      seat: "D05",
      price: 350000,
      date: "2026-04-08",
      bookingDate: "2026-04-03 09:15",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001238",
      customer: "Võ Thị Hằng",
      customerId: "079556677889",
      phone: "0934567890",
      train: "SE1",
      route: "Đà Nẵng → Sài Gòn",
      departure: "14:30",
      seat: "B15",
      price: 420000,
      date: "2026-04-09",
      bookingDate: "2026-04-03 10:20",
      paymentMethod: "Chuyển khoản",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001239",
      customer: "Đinh Thị Mai",
      customerId: "079223344556",
      phone: "0945678901",
      train: "SE5",
      route: "Đà Nẵng → Quy Nhơn",
      departure: "07:30",
      seat: "A08",
      price: 280000,
      date: "2026-04-06",
      bookingDate: "2026-04-03 11:45",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001240",
      customer: "Hoàng Văn Tuấn",
      customerId: "079667788990",
      phone: "0956789012",
      train: "SE2",
      route: "Đà Nẵng → Hà Nội",
      departure: "15:45",
      seat: "C20",
      price: 380000,
      date: "2026-04-10",
      bookingDate: "2026-04-03 13:30",
      paymentMethod: "Chuyển khoản",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001241",
      customer: "Trương Thị Linh",
      customerId: "079334455667",
      phone: "0967890123",
      train: "SE3",
      route: "Đà Nẵng → Huế",
      departure: "09:20",
      seat: "B12",
      price: 120000,
      date: "2026-04-05",
      bookingDate: "2026-04-03 14:15",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001242",
      customer: "Ngô Văn Hải",
      customerId: "079778899001",
      phone: "0978901234",
      train: "SE6",
      route: "Đà Nẵng → Sài Gòn",
      departure: "22:00",
      seat: "A25",
      price: 450000,
      date: "2026-04-11",
      bookingDate: "2026-04-03 15:40",
      paymentMethod: "Chuyển khoản",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
    {
      id: "VE001243",
      customer: "Lý Thị Thu",
      customerId: "079445566778",
      phone: "0989012345",
      train: "SE4",
      route: "Đà Nẵng → Nha Trang",
      departure: "18:00",
      seat: "C18",
      price: 350000,
      date: "2026-04-07",
      bookingDate: "2026-04-03 16:25",
      paymentMethod: "Tiền mặt",
      status: "Đã thanh toán",
      tripType: "Một chiều",
    },
  ]);

  const [refundHistory, setRefundHistory] = useState([
    {
      refundId: "HV001015",
      ticketId: "VE001250",
      customer: "Đinh Văn Tùng",
      originalAmount: 380000,
      refundFee: 38000,
      refundAmount: 342000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-04 09:15",
      staff: "Trần Thị Bình",
    },
    {
      refundId: "HV001014",
      ticketId: "VE001248",
      customer: "Hoàng Thị Thanh",
      originalAmount: 120000,
      refundFee: 12000,
      refundAmount: 108000,
      reason: "Lỗi hệ thống",
      refundDate: "2026-04-04 08:45",
      staff: "Nguyễn Văn An",
    },
    {
      refundId: "HV001013",
      ticketId: "VE001245",
      customer: "Võ Minh Quân",
      originalAmount: 420000,
      refundFee: 84000,
      refundAmount: 336000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-03 16:20",
      staff: "Lê Văn Cường",
    },
    {
      refundId: "HV001012",
      ticketId: "VE001242",
      customer: "Phan Thị Kim",
      originalAmount: 320000,
      refundFee: 32000,
      refundAmount: 288000,
      reason: "Tàu bị hủy/delay",
      refundDate: "2026-04-03 14:50",
      staff: "Trần Thị Bình",
    },
    {
      refundId: "HV001011",
      ticketId: "VE001238",
      customer: "Trương Văn Đạt",
      originalAmount: 450000,
      refundFee: 45000,
      refundAmount: 405000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-03 11:30",
      staff: "Nguyễn Văn An",
    },
    {
      refundId: "HV001010",
      ticketId: "VE001235",
      customer: "Ngô Thị Lan Anh",
      originalAmount: 280000,
      refundFee: 56000,
      refundAmount: 224000,
      reason: "Khách đổi lịch trình",
      refundDate: "2026-04-03 09:15",
      staff: "Phạm Thị Dung",
    },
    {
      refundId: "HV001009",
      ticketId: "VE001230",
      customer: "Đặng Văn Hùng",
      originalAmount: 380000,
      refundFee: 76000,
      refundAmount: 304000,
      reason: "Bán nhầm thông tin",
      refundDate: "2026-04-02 17:40",
      staff: "Lê Văn Cường",
    },
    {
      refundId: "HV001008",
      ticketId: "VE001228",
      customer: "Lý Thị Mỹ",
      originalAmount: 420000,
      refundFee: 42000,
      refundAmount: 378000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-02 15:25",
      staff: "Trần Thị Bình",
    },
    {
      refundId: "HV001007",
      ticketId: "VE001220",
      customer: "Bùi Văn Long",
      originalAmount: 150000,
      refundFee: 30000,
      refundAmount: 120000,
      reason: "Tàu bị hủy/delay",
      refundDate: "2026-04-02 14:10",
      staff: "Nguyễn Văn An",
    },
    {
      refundId: "HV001006",
      ticketId: "VE001215",
      customer: "Cao Thị Hồng",
      originalAmount: 320000,
      refundFee: 32000,
      refundAmount: 288000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-02 13:45",
      staff: "Hoàng Văn Em",
    },
    {
      refundId: "HV001005",
      ticketId: "VE001210",
      customer: "Vũ Minh Tuấn",
      originalAmount: 380000,
      refundFee: 38000,
      refundAmount: 342000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-02 12:20",
      staff: "Trần Thị Bình",
    },
    {
      refundId: "HV001004",
      ticketId: "VE001205",
      customer: "Dương Thị Nga",
      originalAmount: 420000,
      refundFee: 126000,
      refundAmount: 294000,
      reason: "Lỗi hệ thống",
      refundDate: "2026-04-02 11:50",
      staff: "Lê Văn Cường",
    },
    {
      refundId: "HV001003",
      ticketId: "VE001198",
      customer: "Trịnh Văn Nam",
      originalAmount: 280000,
      refundFee: 28000,
      refundAmount: 252000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-02 11:10",
      staff: "Nguyễn Văn An",
    },
    {
      refundId: "HV001002",
      ticketId: "VE001195",
      customer: "Mai Thị Hoa",
      originalAmount: 450000,
      refundFee: 45000,
      refundAmount: 405000,
      reason: "Bán nhầm thông tin",
      refundDate: "2026-04-02 10:55",
      staff: "Phạm Thị Dung",
    },
    {
      refundId: "HV001001",
      ticketId: "VE001100",
      customer: "Phạm Thị Hương",
      originalAmount: 420000,
      refundFee: 42000,
      refundAmount: 378000,
      reason: "Khách hàng yêu cầu hủy",
      refundDate: "2026-04-02 10:30",
      staff: "Nguyễn Văn An",
    },
  ]);

  const reasons = [
    "Khách hàng yêu cầu hủy",
    "Tàu bị hủy/delay",
    "Lỗi hệ thống",
    "Bán nhầm thông tin",
    "Khác",
  ];

  const handleSearch = () => {
    setSearchAttempted(true);
    const found = soldTickets.find(
      (ticket) =>
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.customerId.includes(searchQuery) ||
        ticket.phone.includes(searchQuery)
    );
    setSelectedTicket(found || null);
  };

  // Tính phí hoàn vé dựa trên thời gian
  const calculateRefundFee = (ticket: any) => {
    const departureDate = new Date(ticket.date + " " + ticket.departure);
    const now = new Date();
    const hoursUntilDeparture = (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    // Phí hoàn vé theo quy định
    if (hoursUntilDeparture >= 24) {
      return ticket.price * 0.1; // 10% phí nếu hoàn trước 24h
    } else if (hoursUntilDeparture >= 12) {
      return ticket.price * 0.2; // 20% phí nếu hoàn trước 12h
    } else if (hoursUntilDeparture >= 2) {
      return ticket.price * 0.3; // 30% phí nếu hoàn trước 2h
    } else {
      return ticket.price * 0.5; // 50% phí nếu hoàn trong 2h
    }
  };

  const handleConfirmRefund = () => {
    if (!selectedTicket) return;

    if (!refundReason) {
      alert("Vui lòng chọn lý do hoàn vé");
      return;
    }

    if (refundReason === "Khác" && !otherReason.trim()) {
      alert("Vui lòng nhập lý do khác");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleProcessRefund = () => {
    if (!selectedTicket) return;

    const refundFee = calculateRefundFee(selectedTicket);
    const refundAmount = selectedTicket.price - refundFee;
    const refundId = `HV${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;

    const finalReason = refundReason === "Khác" ? otherReason : refundReason;

    const newRefund = {
      refundId,
      ticketId: selectedTicket.id,
      customer: selectedTicket.customer,
      originalAmount: selectedTicket.price,
      refundFee,
      refundAmount,
      reason: finalReason,
      refundDate: new Date().toLocaleString("vi-VN"),
      staff: "Nguyễn Văn An", // Mock staff name
    };

    setRefundHistory([newRefund, ...refundHistory]);
    setRefundData(newRefund);

    // Remove ticket from sold tickets list
    setSoldTickets(soldTickets.filter(ticket => ticket.id !== selectedTicket.id));

    // Update payment status in context
    updatePaymentStatus(selectedTicket.id, "Đã hoàn vé");

    setShowConfirmModal(false);
    setShowSuccessModal(true);

    // Reset
    setSelectedTicket(null);
    setSearchQuery("");
    setRefundReason("");
    setOtherReason("");
    setSearchAttempted(false);
  };

  const handleViewRefundDetail = (refund: any) => {
    setSelectedRefund(refund);
    setShowDetailModal(true);
  };

  const handleEditRefund = (refund: any) => {
    setEditingRefund({ ...refund });
    setEditReason(refund.reason);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingRefund) return;

    if (!editReason.trim()) {
      alert("Vui lòng nhập lý do hoàn vé");
      return;
    }

    const updatedHistory = refundHistory.map((refund) =>
      refund.refundId === editingRefund.refundId
        ? { ...refund, reason: editReason }
        : refund
    );
    setRefundHistory(updatedHistory);

    setShowEditModal(false);
    setEditingRefund(null);
    setEditReason("");
  };

  return (
    <>
      {/* Edit Modal */}
      {showEditModal && editingRefund && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chỉnh sửa hoàn vé</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã hoàn vé:</span>
                <span className="font-bold text-[#4A6B7C]">{editingRefund.refundId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé gốc:</span>
                <span className="font-medium text-[#4A6B7C]">{editingRefund.ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{editingRefund.customer}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#4A6B7C]">Số tiền hoàn:</span>
                <span className="font-bold text-emerald-600">{editingRefund.refundAmount.toLocaleString()} đ</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Lý do hoàn vé *</label>
              <select
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] mb-3"
              >
                <option value="">Chọn lý do hoàn vé</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {!reasons.includes(editReason) && editReason && (
                <textarea
                  value={editReason}
                  onChange={(e) => setEditReason(e.target.value)}
                  placeholder="Nhập lý do khác..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] resize-none"
                />
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedRefund && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chi tiết vé hoàn</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã hoàn vé:</span>
                <span className="font-bold text-[#4A6B7C]">{selectedRefund.refundId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé gốc:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedRefund.ticketId}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedRefund.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giá vé gốc:</span>
                <span className="text-[#4A6B7C]">{selectedRefund.originalAmount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Phí hoàn vé:</span>
                <span className="text-red-600">-{selectedRefund.refundFee.toLocaleString()} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#4A6B7C]">Số tiền hoàn:</span>
                <span className="font-bold text-emerald-600">{selectedRefund.refundAmount.toLocaleString()} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Lý do:</span>
                <span className="text-[#4A6B7C]">{selectedRefund.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Nhân viên:</span>
                <span className="text-[#4A6B7C]">{selectedRefund.staff}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Thời gian hoàn:</span>
                <span className="text-[#4A6B7C]">{selectedRefund.refundDate}</span>
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

      {/* Confirm Modal */}
      {showConfirmModal && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#4A6B7C] mb-2">Xác nhận hoàn vé</h3>
              <p className="text-[#7FA1B3]">Vui lòng kiểm tra thông tin trước khi xác nhận</p>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé:</span>
                <span className="font-bold text-[#4A6B7C]">{selectedTicket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedTicket.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giá vé gốc:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedTicket.price.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Phí hoàn vé:</span>
                <span className="font-medium text-red-600">-{calculateRefundFee(selectedTicket).toLocaleString()} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#4A6B7C]">Số tiền hoàn:</span>
                <span className="font-bold text-emerald-600">
                  {(selectedTicket.price - calculateRefundFee(selectedTicket)).toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Lý do:</span>
                <span className="text-[#4A6B7C]">{refundReason === "Khác" ? otherReason : refundReason}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleProcessRefund}
                className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium"
              >
                Xác nhận hoàn vé
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && refundData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#4A6B7C] mb-2">Hoàn vé thành công!</h3>
              <p className="text-[#7FA1B3]">Phiếu hoàn vé</p>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã hoàn vé:</span>
                <span className="font-bold text-[#4A6B7C]">{refundData.refundId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé gốc:</span>
                <span className="font-medium text-[#4A6B7C]">{refundData.ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{refundData.customer}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giá vé gốc:</span>
                <span className="text-[#4A6B7C]">{refundData.originalAmount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Phí hoàn vé:</span>
                <span className="text-red-600">-{refundData.refundFee.toLocaleString()} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#4A6B7C]">Số tiền hoàn:</span>
                <span className="font-bold text-emerald-600">{refundData.refundAmount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#7FA1B3]">Thời gian hoàn:</span>
                <span className="text-[#7FA1B3]">{refundData.refundDate}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Đóng
              </button>
              <button className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium flex items-center justify-center gap-2">
                <Printer size={18} />
                In phiếu
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4A6B7C]">Hoàn vé</h2>
            <p className="text-[#7FA1B3] mt-1">Tra cứu và xử lý hoàn vé cho khách hàng</p>
          </div>
        </div>

        {/* Refund Policy Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 mb-2">Quy định về phí hoàn vé</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>≥24h trước khởi hành: phí 10%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>≥12h trước khởi hành: phí 20%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>≥2h trước khởi hành: phí 30%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>&lt;2h trước khởi hành: phí 50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
          <h3 className="text-lg font-bold text-[#4A6B7C] mb-4">Tìm kiếm vé</h3>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={20} />
              <input
                type="text"
                placeholder="Nhập mã vé, số CCCD hoặc số điện thoại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium shadow-md hover:shadow-lg"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Search Result */}
          {searchAttempted && !selectedTicket && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} className="text-orange-600" />
              <span className="text-orange-800">Không tìm thấy vé. Vui lòng kiểm tra lại thông tin.</span>
            </div>
          )}
        </div>

        {/* Ticket Info */}
        {selectedTicket && (
          <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
            <h3 className="text-lg font-bold text-[#4A6B7C] mb-4">Thông tin vé</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#F5F9FB] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <User size={18} className="text-[#7FA1B3]" />
                  <span className="font-medium text-[#4A6B7C]">Thông tin khách hàng</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Họ tên:</span>
                    <span className="text-[#4A6B7C] font-medium">{selectedTicket.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">CCCD:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.customerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">SĐT:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.phone}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F5F9FB] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-[#7FA1B3]" />
                  <span className="font-medium text-[#4A6B7C]">Thông tin chuyến đi</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Mã vé:</span>
                    <span className="text-[#4A6B7C] font-bold">{selectedTicket.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Tàu:</span>
                    <span className="text-[#4A6B7C] font-medium">{selectedTicket.train}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Tuyến:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Khởi hành:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.date} {selectedTicket.departure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Ghế:</span>
                    <span className="text-[#4A6B7C] font-medium">{selectedTicket.seat}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F5F9FB] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={18} className="text-[#7FA1B3]" />
                  <span className="font-medium text-[#4A6B7C]">Thông tin thanh toán</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Giá vé:</span>
                    <span className="text-[#4A6B7C] font-bold">{selectedTicket.price.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Hình thức:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Ngày mua:</span>
                    <span className="text-[#4A6B7C]">{selectedTicket.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7FA1B3]">Trạng thái:</span>
                    <span className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full">
                      {selectedTicket.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={18} className="text-orange-600" />
                  <span className="font-medium text-orange-800">Phí hoàn vé</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-700">Giá vé gốc:</span>
                    <span className="text-orange-800 font-medium">{selectedTicket.price.toLocaleString()} đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-700">Phí hoàn:</span>
                    <span className="text-red-600 font-medium">-{calculateRefundFee(selectedTicket).toLocaleString()} đ</span>
                  </div>
                  <div className="h-px bg-orange-200 my-2"></div>
                  <div className="flex justify-between text-base">
                    <span className="text-orange-800 font-bold">Số tiền hoàn:</span>
                    <span className="text-emerald-600 font-bold">
                      {(selectedTicket.price - calculateRefundFee(selectedTicket)).toLocaleString()} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Reason */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Lý do hoàn vé *</label>
              <select
                value={refundReason}
                onChange={(e) => {
                  setRefundReason(e.target.value);
                  if (e.target.value !== "Khác") {
                    setOtherReason("");
                  }
                }}
                className="w-full px-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              >
                <option value="">Chọn lý do hoàn vé</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {/* Other Reason Input */}
              {refundReason === "Khác" && (
                <div className="mt-3">
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Nhập lý do khác..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] resize-none"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  setSearchQuery("");
                  setRefundReason("");
                  setOtherReason("");
                  setSearchAttempted(false);
                }}
                className="flex-1 px-6 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmRefund}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Hoàn vé
              </button>
            </div>
          </div>
        )}

        {/* Refund History */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
          <div className="p-6 border-b border-[#E5EFF5]">
            <h3 className="text-lg font-bold text-[#4A6B7C]">Lịch sử hoàn vé</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F9FB] border-b border-[#E5EFF5]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Mã hoàn vé
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Mã vé gốc
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Giá vé gốc
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Phí hoàn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Tiền hoàn
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Lý do
                  </th>
                  {userRole === "manager" && (
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                      Nhân viên
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EFF5]">
                {refundHistory.map((refund) => (
                  <tr key={refund.refundId} className="hover:bg-[#F5F9FB]/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{refund.refundId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#7FA1B3]">{refund.ticketId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-[#4A6B7C]">{refund.customer}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#4A6B7C]">{refund.originalAmount.toLocaleString()} đ</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-red-600">-{refund.refundFee.toLocaleString()} đ</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-emerald-600">{refund.refundAmount.toLocaleString()} đ</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#7FA1B3] text-sm">{refund.reason}</span>
                    </td>
                    {userRole === "manager" && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-[#7FA1B3] text-sm">{refund.staff}</span>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[#7FA1B3] text-sm">{refund.refundDate}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewRefundDetail(refund)}
                          className="p-2 text-[#4A6B7C] hover:bg-[#7FA1B3]/10 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditRefund(refund)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
