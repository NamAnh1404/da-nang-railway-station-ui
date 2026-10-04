import { Plus, Search, Edit2, Trash2, Shield, User as UserIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "Nhân viên bán vé",
    status: "Hoạt động",
    joinDate: "",
  });

  const [users, setUsers] = useState<Employee[]>([
    {
      id: "QL001",
      name: "Lê Văn Cường",
      email: "lvcuong@gadanang.vn",
      phone: "0901234567",
      role: "Quản lý ga",
      status: "Hoạt động",
      joinDate: "01/12/2023",
    },
    {
      id: "QL002",
      name: "Võ Thị Hà",
      email: "vtha@gadanang.vn",
      phone: "0902345678",
      role: "Quản lý ga",
      status: "Hoạt động",
      joinDate: "15/12/2023",
    },
    {
      id: "QL003",
      name: "Trương Minh Khang",
      email: "tmkhang@gadanang.vn",
      phone: "0903456789",
      role: "Quản lý ga",
      status: "Hoạt động",
      joinDate: "01/01/2024",
    },
    {
      id: "NV001",
      name: "Nguyễn Văn An",
      email: "nvan@gadanang.vn",
      phone: "0912345678",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/01/2024",
    },
    {
      id: "NV002",
      name: "Trần Thị Bình",
      email: "ttbinh@gadanang.vn",
      phone: "0987654321",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "15/01/2024",
    },
    {
      id: "NV003",
      name: "Phạm Thị Dung",
      email: "ptdung@gadanang.vn",
      phone: "0934567890",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/02/2024",
    },
    {
      id: "NV004",
      name: "Hoàng Văn Em",
      email: "hvem@gadanang.vn",
      phone: "0945678901",
      role: "Nhân viên bán vé",
      status: "Tạm nghỉ",
      joinDate: "15/02/2024",
    },
    {
      id: "NV005",
      name: "Đinh Thị Giang",
      email: "dtgiang@gadanang.vn",
      phone: "0956789012",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/03/2024",
    },
    {
      id: "NV006",
      name: "Ngô Văn Hùng",
      email: "nvhung@gadanang.vn",
      phone: "0967890123",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "15/03/2024",
    },
    {
      id: "NV007",
      name: "Bùi Thị Lan",
      email: "btlan@gadanang.vn",
      phone: "0978901234",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/04/2024",
    },
    {
      id: "NV008",
      name: "Lý Văn Minh",
      email: "lvminh@gadanang.vn",
      phone: "0989012345",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "15/04/2024",
    },
    {
      id: "NV009",
      name: "Đặng Thị Nga",
      email: "dtnga@gadanang.vn",
      phone: "0990123456",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/05/2024",
    },
    {
      id: "NV010",
      name: "Phan Văn Oanh",
      email: "pvoanh@gadanang.vn",
      phone: "0991234567",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "15/05/2024",
    },
    {
      id: "NV011",
      name: "Dương Thị Phương",
      email: "dtphuong@gadanang.vn",
      phone: "0992345678",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "01/06/2024",
    },
    {
      id: "NV012",
      name: "Cao Văn Quân",
      email: "cvquan@gadanang.vn",
      phone: "0993456789",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "15/06/2024",
    },
  ]);

  const handleAdd = () => {
    const newEmployee: Employee = {
      ...formData,
      id: `NV${String(users.length + 1).padStart(3, "0")}`,
    };
    setUsers([...users, newEmployee]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedEmployee) {
      setUsers(
        users.map((user) =>
          user.id === selectedEmployee.id ? { ...formData } : user
        )
      );
      setShowEditModal(false);
      setSelectedEmployee(null);
      resetForm();
    }
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      setUsers(users.filter((user) => user.id !== selectedEmployee.id));
      setShowDeleteModal(false);
      setSelectedEmployee(null);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "Nhân viên bán vé",
      status: "Hoạt động",
      joinDate: "",
    });
  };

  const openEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      status: employee.status,
      joinDate: employee.joinDate,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const stats = [
    {
      label: "Tổng nhân viên",
      value: "15",
      color: "bg-[#4A6B7C]",
    },
    {
      label: "Nhân viên bán vé",
      value: "12",
      color: "bg-[#5B7C8F]",
    },
    {
      label: "Quản lý ga",
      value: "3",
      color: "bg-[#7FA1B3]",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Thêm nhân viên mới</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="email@gadanang.vn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                  placeholder="0123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] bg-white"
                >
                  <option value="Nhân viên bán vé">Nhân viên bán vé</option>
                  <option value="Quản lý ga">Quản lý ga</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ngày vào làm</label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] bg-white"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm nghỉ">Tạm nghỉ</option>
                </select>
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
                Thêm nhân viên
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
              <h3 className="text-2xl font-bold text-[#4A6B7C]">Chỉnh sửa thông tin nhân viên</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-[#E5EFF5] rounded-lg">
                <X size={24} className="text-[#7FA1B3]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Mã nhân viên</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl bg-[#F5F9FB] text-[#7FA1B3]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Họ và tên</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Vai trò</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] bg-white"
                >
                  <option value="Nhân viên bán vé">Nhân viên bán vé</option>
                  <option value="Quản lý ga">Quản lý ga</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Ngày vào làm</label>
                <input
                  type="text"
                  value={formData.joinDate}
                  disabled
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl bg-[#F5F9FB] text-[#7FA1B3]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-[#4A6B7C] mb-2">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C] bg-white"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Tạm nghỉ">Tạm nghỉ</option>
                </select>
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
      {showDeleteModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-[#4A6B7C] mb-4">Xác nhận xóa</h3>
            <p className="text-[#7FA1B3] mb-6">
              Bạn có chắc chắn muốn xóa nhân viên <span className="font-bold text-[#4A6B7C]">{selectedEmployee.name}</span> ({selectedEmployee.id})?
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
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 border border-[#7FA1B3]/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7FA1B3] mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#4A6B7C]">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <UserIcon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7FA1B3]"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm nhân viên theo tên, email, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5EFF5] rounded-xl focus:outline-none focus:border-[#7FA1B3] text-[#4A6B7C]"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4A6B7C] text-white rounded-xl hover:bg-[#3D5766] transition-colors shadow-md hover:shadow-lg whitespace-nowrap" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Thêm nhân viên
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#7FA1B3]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F9FB] border-b border-[#E5EFF5]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Mã NV
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Họ và tên
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#4A6B7C] uppercase tracking-wider">
                  Ngày vào
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F5F9FB]/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#4A6B7C]">{user.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#7FA1B3]/10 rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold text-[#4A6B7C]">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-[#4A6B7C]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#7FA1B3]">{user.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#4A6B7C]">{user.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Shield
                        size={16}
                        className={
                          user.role === "Quản lý ga" ? "text-[#4A6B7C]" : "text-[#7FA1B3]"
                        }
                      />
                      <span className="text-[#4A6B7C]">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[#7FA1B3]">{user.joinDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 inline-flex text-xs font-medium rounded-full ${
                        user.status === "Hoạt động"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(user)} className="p-2 text-[#7FA1B3] hover:bg-[#7FA1B3]/10 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => openDeleteModal(user)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E5EFF5]">
            <div className="text-sm text-[#7FA1B3]">
              Hiển thị {startIndex + 1} - {Math.min(endIndex, filteredUsers.length)} trong tổng số {filteredUsers.length} nhân viên
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? "bg-[#E5EFF5] text-[#7FA1B3] cursor-not-allowed"
                    : "bg-[#4A6B7C] text-white hover:bg-[#3D5766]"
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#4A6B7C] text-white"
                        : "bg-[#E5EFF5] text-[#7FA1B3] hover:bg-[#7FA1B3]/20"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? "bg-[#E5EFF5] text-[#7FA1B3] cursor-not-allowed"
                    : "bg-[#4A6B7C] text-white hover:bg-[#3D5766]"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
