import React, { useState, useEffect } from "react";
import { updateUserInfoApi } from "../../services/profile.api";
import { getUserListApi } from "../../services/auth.api";

const EditUserForm = ({ user, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",
    matKhau: "",
    maNhom: "GP01",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        soDt: user.soDT,
        matKhau: user.matKhau || "123456",
        maNhom: "GP01",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserInfoApi(formData);
      alert("Cập nhật thành công!");
      onClose();
      onRefresh();
    } catch (error) {
      alert("Cập nhật thất bại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
        <h3 className="text-xl font-bold mb-6">
          🛠 Chỉnh sửa: {formData.taiKhoan}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-1">Tài khoản</label>
              <input
                type="text"
                name="taiKhoan"
                disabled
                value={formData.taiKhoan}
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="matKhau"
                  value={formData.matKhau}
                  onChange={handleChange}
                  className="w-full p-2 border rounded pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Họ tên</label>
              <input
                type="text"
                name="hoTen"
                value={formData.hoTen}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Số điện thoại</label>
              <input
                type="text"
                name="soDt"
                value={formData.soDt}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Loại người dùng
              </label>
              <select
                name="maLoaiNguoiDung"
                value={formData.maLoaiNguoiDung}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
