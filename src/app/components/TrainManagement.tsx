import { Plus, Search, Edit2, Trash2, MapPin, Clock, X, Calendar, Eye } from "lucide-react";
import { useState } from "react";

interface Train {
  id: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: string;
  seats: number;
  available: number;
  status: string;
  date: string;
}

export function TrainManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("2026-04-02");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    price: "",
    seats: 120,
    available: 120,
    date: "2026-04-02",
  });

  const [allTrains, setAllTrains] = useState<Train[]>([
    {
      id: "SE1",
      from: "Đà Nẵng",
      to: "Sài Gòn",
      departure: "14:30",
      arrival: "06:30",
      price: "420,000",
      seats: 120,
      available: 45,
      status: "Hoạt động",
      date: "2026-04-02",
    },
    {
      id: "SE2",
      from: "Đà Nẵng",
      to: "Hà Nội",
      departure: "15:45",
      arrival: "08:15",
      price: "380,000",
      seats: 120,
      available: 22,
      status: "Hoạt động",
      date: "2026-04-02",
    },
    {
      id: "SE3",
      from: "Đà Nẵng",
      to: "Huế",
      departure: "09:20",
      arrival: "11:30",
      price: "120,000",
      seats: 120,
      available: 78,
      status: "Hoạt động",
      date: "2026-04-02",
    },
    {
      id: "SE4",
      from: "Đà Nẵng",
      to: "Nha Trang",
      departure: "16:20",
      arrival: "02:45",
      price: "320,000",
      seats: 120,
      available: 97,
      status: "Hoạt động",
      date: "2026-04-02",
    },
    {
      id: "SE5",
      from: "Đà Nẵng",
      to: "Quy Nhơn",
      departure: "18:00",
      arrival: "22:30",
      price: "180,000",
      seats: 120,
      available: 56,
      status: "Hoạt động",
      date: "2026-04-02",
    },
    // Ngày 01/04/2026
    {
      id: "SE1",
      from: "Đà Nẵng",
      to: "Sài Gòn",
      departure: "14:30",
      arrival: "06:30",
      price: "420,000",
      seats: 120,
      available: 65,
      status: "Hoạt động",
      date: "2026-04-01",
    },
    {
      id: "SE2",
      from: "Đà Nẵng",
      to: "Hà Nội",
      departure: "15:45",
      arrival: "08:15",
      price: "380,000",
      seats: 120,
      available: 48,
      status: "Hoạt động",
      date: "2026-04-01",
    },
    {
      id: "SE3",
      from: "Đà Nẵng",
      to: "Huế",
      departure: "09:20",
      arrival: "11:30",
      price: "120,000",
      seats: 120,
      available: 92,
      status: "Hoạt động",
      date: "2026-04-01",
    },
  ]);

  const trains = allTrains.filter((train) => train.date === filterDate);

  const handleAdd = () => {
    const newTrain: Train = {
      ...formData,
      status: "Hoạt động",
    };
    setAllTrains([...allTrains, newTrain]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedTrain) {
      setAllTrains(
        allTrains.map((train) =>
          train.id === selectedTrain.id && train.date === selectedTrain.date ? { ...formData, status: train.status } : train
        )
      );
      setShowEditModal(false);
      setSelectedTrain(null);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (selectedTrain) {
      setAllTrains(allTrains.filter((train) => !(train.id === selectedTrain.id && train.date === selectedTrain.date)));
      setShowDeleteModal(false);
      setSelectedTrain(null);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
      price: "",
      seats: 120,
      available: 120,
      date: filterDate,
    });
  };

  const openEditModal = (train: Train) => {
    setSelectedTrain(train);
    setFormData({
      id: train.id,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      price: train.price,
      seats: train.seats,
      available: train.available,
      date: train.date,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (train: Train) => {
    setSelectedTrain(train);
    setShowDeleteModal(true);
  };

  const openDetailModal = (train: Train) => {
    setSelectedTrain(train);
    setShowDetailModal(true);
  };

  return (
    <>
      {/* Detail Modal */}
      {showDetailModal && selectedTrain && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chi tiết chuyến tàu</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>

            <div className="bg-[#F5F9FB] rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Mã tàu:</span>
                <span className="font-bold text-[#4A6B7C]">{selectedTrain.id}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ga đi:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedTrain.from}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ga đến:</span>
                <span className="font-medium text-[#4A6B7C]">{selectedTrain.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Tuyến đường:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.from} → {selectedTrain.to}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giờ khởi hành:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.departure}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giờ đến:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.arrival}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ngày chạy:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.date}</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Giá vé:</span>
                <span className="font-bold text-emerald-600">{selectedTrain.price} đ</span>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Tổng số ghế:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.seats}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ghế trống:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.available}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Ghế đã bán:</span>
                <span className="text-[#4A6B7C]">{selectedTrain.seats - selectedTrain.available}</span>
              </div>
              <div className="w-full bg-[#E5EFF5] rounded-full h-2 mt-2">
                <div
                  className="bg-[#4A6B7C] h-2 rounded-full"
                  style={{ width: `${(selectedTrain.available / selectedTrain.seats) * 100}%` }}
                ></div>
              </div>
              <div className="h-px bg-[#E5EFF5] my-2"></div>
              <div className="flex justify-between">
                <span className="text-[#7FA1B3]">Trạng thái:</span>
                <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
                  {selectedTrain.status}
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Thêm chuyến tàu mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Mã tàu</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="VD: SE6"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giá vé</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="VD: 250,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ga đi</label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="VD: Đà Nẵng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ga đến</label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="VD: Vinh"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giờ khởi hành</label>
                <input
                  type="time"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giờ đến</label>
                <input
                  type="time"
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Tổng số ghế</label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value), available: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium"
              >
                Thêm chuyến tàu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chỉnh sửa chuyến tàu</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Mã tàu</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl bg-[#F5F9FB] text-[#7FA1B3]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giá vé</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ga đi</label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ga đến</label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giờ khởi hành</label>
                <input
                  type="time"
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Giờ đến</label>
                <input
                  type="time"
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Tổng số ghế</label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ghế trống</label>
                <input
                  type="number"
                  value={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-3 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors font-medium"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTrain && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-[#4A6B7C] mb-4">Xác nhận xóa</h3>
            <p className="text-[#7FA1B3] mb-6">
              Bạn có chắc chắn muốn xóa chuyến tàu <span className="font-bold text-[#4A6B7C]">{selectedTrain.id}</span> ({selectedTrain.from} → {selectedTrain.to})?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-[#E5EFF5] text-[#4A6B7C] rounded-xl hover:bg-[#7FA1B3]/20 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm chuyến tàu theo mã, ga đi, ga đến..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] placeholder:text-[#7FA1B3]/50"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]" size={18} />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors shadow-md hover:shadow-lg" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Thêm chuyến tàu
        </button>
      </div>

      {/* Trains Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F9FB] border-b border-[#E5EFF5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Mã tàu
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Tuyến đường
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Giờ khởi hành
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Giờ đến
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Giá vé
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Ghế trống
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EFF5]">
              {trains.map((train) => (
                <tr key={train.id} className="hover:bg-[#F5F9FB]/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#7FA1B3]/10 rounded-lg flex items-center justify-center mr-3">
                        <span className="font-bold text-[#4A6B7C]">{train.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#7FA1B3]" />
                      <span className="font-medium text-[#4A6B7C]">{train.from}</span>
                      <span className="text-[#7FA1B3]">→</span>
                      <span className="font-medium text-[#4A6B7C]">{train.to}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#7FA1B3]" />
                      <span className="text-[#4A6B7C]">{train.departure}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#7FA1B3]" />
                      <span className="text-[#4A6B7C]">{train.arrival}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#4A6B7C]">{train.price} đ</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className="font-medium text-[#4A6B7C]">{train.available}</span>
                      <span className="text-[#7FA1B3]">/{train.seats}</span>
                    </div>
                    <div className="w-full bg-[#E5EFF5] rounded-full h-1.5 mt-1">
                      <div
                        className="bg-[#4A6B7C] h-1.5 rounded-full"
                        style={{ width: `${(train.available / train.seats) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1.5 inline-flex text-xs font-medium rounded-full bg-emerald-50 text-emerald-700">
                      {train.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDetailModal(train)}
                        className="p-2 text-[#4A6B7C] hover:bg-[#7FA1B3]/10 rounded-lg transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={18} />
                      </button>
                      <button onClick={() => openEditModal(train)} className="p-2 text-[#7FA1B3] hover:bg-[#7FA1B3]/10 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => openDeleteModal(train)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
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
