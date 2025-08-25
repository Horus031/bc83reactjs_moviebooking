import React, { useState } from "react";
import { registerApi } from "../../services/auth.api";

const AddUserForm = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(formData);
      alert("Thêm người dùng thành công!");
      onClose();
      onRefresh();
    } catch (error) {
      alert("Không thể thêm người dùng.");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h3 className="text-xl font-bold mb-4">Thêm người dùng</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="taiKhoan"
            placeholder="Tài khoản"
            value={formData.taiKhoan}
            onChange={handleChange}
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="matKhau"
            placeholder="Mật khẩu"
            value={formData.matKhau}
            onChange={handleChange}
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="hoTen"
            placeholder="Họ tên"
            value={formData.hoTen}
            onChange={handleChange}
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="soDT"
            placeholder="Số điện thoại"
            value={formData.soDT}
            onChange={handleChange}
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <select
            name="maLoaiNguoiDung"
            value={formData.maLoaiNguoiDung}
            onChange={handleChange}
            className="mb-4 w-full p-2 border rounded"
          >
            <option value="KhachHang">Khách Hàng</option>
            <option value="QuanTri">Quản Trị</option>
          </select>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
