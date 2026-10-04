import { Search, Printer, XCircle, User, Calendar, Train as TrainIcon, CheckCircle, CreditCard, Banknote } from "lucide-react";
import { useState } from "react";

export function TicketSales() {
  const [selectedTrain, setSelectedTrain] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedCarriage, setSelectedCarriage] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer">("cash");
  const [discount, setDiscount] = useState<"none" | "student" | "elderly" | "child">("none");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [recentBookings, setRecentBookings] = useState([
    {
      id: "VE001234",
      customer: "Nguyễn Văn Minh",
      phone: "0912345678",
      train: "SE1",
      seat: "A12",
      price: "420,000 đ",
      priceNum: 420000,
      date: "2026-04-02",
      status: "Đã thanh toán",
      method: "cash",
      time: "14:30",
    },
    {
      id: "VE001235",
      customer: "Trần Thị Lan",
      phone: "0987654321",
      train: "SE2",
      seat: "B08",
      price: "380,000 đ",
      priceNum: 380000,
      date: "2026-04-02",
      status: "Đã thanh toán",
      method: "transfer",
      time: "14:25",
    },
    {
      id: "VE001236",
      customer: "Lê Hoàng Nam",
      phone: "0901234567",
      train: "SE3",
      seat: "C15",
      price: "120,000 đ",
      priceNum: 120000,
      date: "2026-04-02",
      status: "Đã thanh toán",
      method: "cash",
      time: "14:20",
    },
  ]);

  const allTrains = [
    { id: "SE1", route: "Đà Nẵng → Sài Gòn", departure: "14:30", price: "420,000", date: "2026-04-02" },
    { id: "SE2", route: "Đà Nẵng → Hà Nội", departure: "15:45", price: "380,000", date: "2026-04-02" },
    { id: "SE3", route: "Đà Nẵng → Huế", departure: "09:20", price: "120,000", date: "2026-04-02" },
    { id: "SE4", route: "Đà Nẵng → Nha Trang", departure: "16:20", price: "350,000", date: "2026-04-02" },
    { id: "SE5", route: "Đà Nẵng → Quy Nhơn", departure: "18:00", price: "180,000", date: "2026-04-02" },
    { id: "SE1", route: "Đà Nẵng → Sài Gòn", departure: "14:30", price: "420,000", date: "2026-04-03" },
    { id: "SE2", route: "Đà Nẵng → Hà Nội", departure: "15:45", price: "380,000", date: "2026-04-03" },
    { id: "SE1", route: "Đà Nẵng → Sài Gòn", departure: "14:30", price: "420,000", date: "2026-04-01" },
    { id: "SE2", route: "Đà Nẵng → Hà Nội", departure: "15:45", price: "380,000", date: "2026-04-01" },
    { id: "SE3", route: "Đà Nẵng → Huế", departure: "09:20", price: "120,000", date: "2026-04-01" },
  ];

  const trains = filterDate
    ? allTrains.filter((train) => train.date === filterDate)
    : allTrains.filter((train) => train.date === "2026-04-02");

  // Seat layout: 2-2 configuration with aisle in middle
  const carriages = [
    { name: "Toa 1", rows: 10 },
    { name: "Toa 2", rows: 10 },
    { name: "Toa 3", rows: 10 },
  ];
  
  const occupiedSeats = ["1A-1", "1A-3", "1B-2", "1B-5", "1C-4", "1D-7", "2A-1", "2B-8", "2C-3", "2D-6"];

  const calculatePrice = () => {
    const train = trains.find((t) => t.id === selectedTrain);
    if (!train || selectedSeats.length === 0) return 0;

    const basePrice = parseInt(train.price.replace(",", ""));
    let discountRate = 1;

    if (discount === "student") discountRate = 0.9;
    if (discount === "elderly") discountRate = 0.85;
    if (discount === "child") discountRate = 0.75;

    const singlePrice = basePrice * discountRate;
    const numSeats = selectedSeats.length;

    // Vé khứ hồi = x2 (cả đi cả về)
    if (tripType === "round-trip") {
      return singlePrice * 2 * numSeats;
    }

    return singlePrice * numSeats;
  };

  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmSale = () => {
    if (!customerName || !customerId || !customerPhone || !travelDate || !selectedTrain || selectedSeats.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const train = trains.find((t) => t.id === selectedTrain);
    const finalPrice = calculatePrice();

    const ticketId = `VE${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;

    const invoice = {
      id: ticketId,
      customer: customerName,
      customerId,
      phone: customerPhone,
      train: train?.id,
      route: train?.route,
      departure: train?.departure,
      seats: selectedSeats.join(", "),
      numSeats: selectedSeats.length,
      price: finalPrice,
      discount,
      tripType,
      paymentMethod: paymentMethod === "cash" ? "Tiền mặt" : "Chuyển khoản",
      date: travelDate,
      bookingTime: new Date().toLocaleString("vi-VN"),
    };

    const newBooking = {
      id: ticketId,
      customer: customerName,
      phone: customerPhone,
      train: train?.id || "",
      seat: selectedSeats.join(", "),
      price: `${finalPrice.toLocaleString()} đ`,
      priceNum: finalPrice,
      date: travelDate,
      status: paymentMethod === "transfer" ? "Đã thanh toán" : "Đang chờ xử lý",
      method: paymentMethod,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setRecentBookings([newBooking, ...recentBookings]);
    setInvoiceData(invoice);
    setShowInvoiceModal(true);

    // Reset form
    setCustomerName("");
    setCustomerId("");
    setCustomerPhone("");
    setTravelDate("");
    setReturnDate("");
    setSelectedTrain("");
    setSelectedSeats([]);
    setDiscount("none");
    setTripType("one-way");
  };

  const handleCancelTicket = (ticketId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy vé này?")) {
      setRecentBookings(recentBookings.filter((booking) => booking.id !== ticketId));
    }
  };

  const handlePrintTicket = (ticketId: string) => {
    alert(`In vé ${ticketId}`);
  };

  return (
    <>
      {/* Invoice Modal */}
      {showInvoiceModal && invoiceData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#4A6B7C] mb-2">Bán vé thành công!</h3>
              <p className="text-[#7FA1B3]">Hóa đơn vé tàu</p>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã vé:</span>
                <span className="font-bold text-[#4A6B7C]">{invoiceData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khách hàng:</span>
                <span className="font-medium text-[#4A6B7C]">{invoiceData.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">CCCD:</span>
                <span className="text-[#4A6B7C]">{invoiceData.customerId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Số điện thoại:</span>
                <span className="text-[#4A6B7C]">{invoiceData.phone}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Tàu:</span>
                <span className="font-medium text-[#4A6B7C]">{invoiceData.train}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Tuyến:</span>
                <span className="text-[#4A6B7C]">{invoiceData.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Khởi hành:</span>
                <span className="text-[#4A6B7C]">{invoiceData.departure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ghế ({invoiceData.numSeats} vé):</span>
                <span className="font-medium text-[#4A6B7C]">{invoiceData.seats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ngày đi:</span>
                <span className="text-[#4A6B7C]">{invoiceData.date}</span>
              </div>
              {invoiceData.discount !== "none" && (
                <div className="flex justify-between">
                  <span className="text-[#7FA1B3]">Ưu đãi:</span>
                  <span className="text-emerald-600">
                    {invoiceData.discount === "student" && "Sinh viên (10%)"}
                    {invoiceData.discount === "elderly" && "Người cao tuổi (15%)"}
                    {invoiceData.discount === "child" && "Trẻ em (25%)"}
                  </span>
                </div>
              )}
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Loại vé:</span>
                <span className="text-[#4A6B7C]">
                  {invoiceData.tripType === "one-way" ? "Một chiều" : "Khứ hồi"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Thanh toán:</span>
                <span className="text-[#4A6B7C]">{invoiceData.paymentMethod}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between text-lg">
                <span className="font-bold text-[#4A6B7C]">Tổng tiền:</span>
                <span className="font-bold text-emerald-600">{invoiceData.price.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#7FA1B3]">Thời gian đặt:</span>
                <span className="text-[#7FA1B3]">{invoiceData.bookingTime}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Đóng
              </button>
              <button className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium flex items-center justify-center gap-2">
                <Printer size={18} />
                In vé
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Booking Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Customer Information */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
          <h3 className="text-lg font-bold text-[#4A6B7C] mb-4 flex items-center gap-2">
            <User size={20} className="text-[#7FA1B3]" />
            Thông tin khách hàng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ tên khách hàng"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Số CCCD</label>
              <input
                type="text"
                placeholder="Nhập số CCCD"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="Nhập số điện thoại"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ngày đi</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
            </div>
            {tripType === "round-trip" && (
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ngày về</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  />
                </div>
              </div>
            )}
            <div className={tripType === "round-trip" ? "" : "md:col-span-2"}>
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Loại vé</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  tripType === "one-way" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={() => setTripType("one-way")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Một chiều</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  tripType === "round-trip" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={tripType === "round-trip"}
                    onChange={() => setTripType("round-trip")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Khứ hồi</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Hình thức thanh toán</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "cash" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Tiền mặt</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "transfer" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={() => setPaymentMethod("transfer")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Chuyển khoản</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ưu đãi</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  discount === "none" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="discount"
                    value="none"
                    checked={discount === "none"}
                    onChange={() => setDiscount("none")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Không</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  discount === "student" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="discount"
                    value="student"
                    checked={discount === "student"}
                    onChange={() => setDiscount("student")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Sinh viên (-10%)</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  discount === "elderly" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="discount"
                    value="elderly"
                    checked={discount === "elderly"}
                    onChange={() => setDiscount("elderly")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Cao tuổi (-15%)</span>
                </label>
                <label className={`flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                  discount === "child" ? "border-[#4A6B7C] bg-[#7FA1B3]/5" : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}>
                  <input
                    type="radio"
                    name="discount"
                    value="child"
                    checked={discount === "child"}
                    onChange={() => setDiscount("child")}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium text-[#4A6B7C]">Trẻ em (-25%)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Train Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
          <h3 className="text-lg font-bold text-[#4A6B7C] mb-4 flex items-center gap-2">
            <TrainIcon size={20} className="text-[#7FA1B3]" />
            Chọn chuyến tàu
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Lọc theo ngày</label>
            <div className="relative max-w-xs">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => {
                  setFilterDate(e.target.value);
                  setSelectedTrain("");
                  setSelectedSeats([]);
                }}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
              />
            </div>
          </div>
          <div className="space-y-3">
            {trains.map((train, idx) => (
              <label
                key={`${train.id}-${idx}`}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedTrain === train.id
                    ? "border-[#4A6B7C] bg-[#7FA1B3]/5"
                    : "border-[#E5EFF5] hover:border-[#7FA1B3]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    name="train"
                    value={train.id}
                    checked={selectedTrain === train.id}
                    onChange={() => {
                      setSelectedTrain(train.id);
                      setSelectedSeats([]);
                    }}
                    className="w-5 h-5 text-[#4A6B7C]"
                  />
                  <div>
                    <p className="font-bold text-[#4A6B7C]">{train.id}</p>
                    <p className="text-sm text-[#7FA1B3]">{train.route}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-[#4A6B7C]">{train.departure}</p>
                  <p className="text-sm text-[#7FA1B3]">{train.price} đ</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Seat Selection - Train Layout */}
        {selectedTrain && (
          <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 p-6">
            <h3 className="text-lg font-bold text-[#4A6B7C] mb-4">Chọn chỗ ngồi</h3>
            <div className="flex gap-6 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E5EFF5] rounded border-2 border-[#7FA1B3]/30"></div>
                <span className="text-sm text-[#4A6B7C]">Trống</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-50 rounded border-2 border-red-300"></div>
                <span className="text-sm text-[#4A6B7C]">Đã bán</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4A6B7C] rounded border-2 border-[#3D5766]"></div>
                <span className="text-sm text-[#4A6B7C]">Đang chọn</span>
              </div>
            </div>
            
            {/* Carriage Tabs */}
            <div className="flex gap-2 mb-4">
              {carriages.map((carriage, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCarriage(idx)}
                  className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                    selectedCarriage === idx
                      ? "bg-[#4A6B7C] text-white shadow-md"
                      : "bg-[#E5EFF5] text-[#7FA1B3] hover:bg-[#7FA1B3]/10"
                  }`}
                >
                  {carriage.name}
                </button>
              ))}
            </div>

            {/* Selected Carriage Seats */}
            <div className="border-2 border-[#E5EFF5] rounded-xl p-4">
              <h4 className="font-bold text-[#4A6B7C] mb-3 text-center">{carriages[selectedCarriage].name}</h4>
              <div className="space-y-2">
                {Array.from({ length: carriages[selectedCarriage].rows }).map((_, rowIdx) => {
                  const rowNum = rowIdx + 1;
                  return (
                    <div key={rowIdx} className="flex items-center justify-center gap-3">
                      {/* Left side - 2 seats (A, B) */}
                      <div className="flex gap-2">
                        {["A", "B"].map((col) => {
                          const seatId = `${selectedCarriage + 1}${col}-${rowNum}`;
                          const isOccupied = occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);
                          return (
                            <button
                              key={seatId}
                              onClick={() => !isOccupied && handleSeatClick(seatId)}
                              disabled={isOccupied}
                              className={`w-12 h-12 rounded-lg border-2 font-medium text-xs transition-all ${
                                isSelected
                                  ? "bg-[#4A6B7C] text-white border-[#3D5766] shadow-md"
                                  : isOccupied
                                  ? "bg-red-50 border-red-300 text-red-400 cursor-not-allowed"
                                  : "bg-[#E5EFF5] border-[#7FA1B3]/30 hover:border-[#7FA1B3] hover:bg-[#7FA1B3]/10"
                              }`}
                              title={seatId}
                            >
                              {col}{rowNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      {/* Aisle */}
                      <div className="w-8 text-center text-xs text-[#7FA1B3] font-medium">
                        {rowNum}
                      </div>
                      
                      {/* Right side - 2 seats (C, D) */}
                      <div className="flex gap-2">
                        {["C", "D"].map((col) => {
                          const seatId = `${selectedCarriage + 1}${col}-${rowNum}`;
                          const isOccupied = occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.includes(seatId);
                          return (
                            <button
                              key={seatId}
                              onClick={() => !isOccupied && handleSeatClick(seatId)}
                              disabled={isOccupied}
                              className={`w-12 h-12 rounded-lg border-2 font-medium text-xs transition-all ${
                                isSelected
                                  ? "bg-[#4A6B7C] text-white border-[#3D5766] shadow-md"
                                  : isOccupied
                                  ? "bg-red-50 border-red-300 text-red-400 cursor-not-allowed"
                                  : "bg-[#E5EFF5] border-[#7FA1B3]/30 hover:border-[#7FA1B3] hover:bg-[#7FA1B3]/10"
                              }`}
                              title={seatId}
                            >
                              {col}{rowNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <div>
                {selectedSeats.length > 0 && (
                  <div>
                    <p className="text-lg text-[#4A6B7C]">
                      Ghế đã chọn ({selectedSeats.length} vé): <span className="font-bold text-[#4A6B7C]">{selectedSeats.join(", ")}</span>
                    </p>
                    <p className="text-sm text-[#7FA1B3] mt-1">
                      Loại vé: <span className="font-medium">{tripType === "one-way" ? "Một chiều" : "Khứ hồi"}</span>
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Tổng tiền: <span className="font-bold">{calculatePrice().toLocaleString()} đ</span>
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleConfirmSale}
                className="px-6 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Xác nhận bán vé
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Bookings Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20">
          <div className="p-4 border-b border-[#E5EFF5]">
            <h3 className="font-bold text-[#4A6B7C]">Vé vừa bán</h3>
          </div>
          <div className="p-3 space-y-2 max-h-[800px] overflow-y-auto">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-3 bg-[#F5F9FB] rounded-lg border border-[#E5EFF5]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-[#7FA1B3]">{booking.id}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    booking.status === "Đã thanh toán"
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-orange-700 bg-orange-50"
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <p className="font-medium text-[#4A6B7C] text-sm">{booking.customer}</p>
                <p className="text-xs text-[#7FA1B3]">{booking.phone}</p>
                <div className="mt-2 pt-2 border-t border-[#E5EFF5]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7FA1B3]">Tàu {booking.train} - Ghế {booking.seat}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-[#7FA1B3]">{booking.time}</span>
                    <span className="font-bold text-[#4A6B7C] text-sm">{booking.price}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {booking.method === "cash" ? (
                      <Banknote size={12} className="text-[#7FA1B3]" />
                    ) : (
                      <CreditCard size={12} className="text-[#7FA1B3]" />
                    )}
                    <span className="text-xs text-[#7FA1B3]">
                      {booking.method === "cash" ? "Tiền mặt" : "Chuyển khoản"}
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handlePrintTicket(booking.id)}
                    className="flex-1 px-2 py-1.5 text-xs bg-[#4A6B7C] text-white rounded-lg hover:bg-[#3D5766] transition-colors flex items-center justify-center gap-1"
                  >
                    <Printer size={12} />
                    In vé
                  </button>
                  <button
                    onClick={() => handleCancelTicket(booking.id)}
                    className="flex-1 px-2 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <XCircle size={12} />
                    Hủy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
