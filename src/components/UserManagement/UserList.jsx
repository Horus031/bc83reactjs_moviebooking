import React, { useEffect, useState } from "react";
import { getUserListApi, deleteUserApi } from "../../services/auth.api";
import EditUserForm from "./EditUserForm";
import AddUserForm from "./AddUserForm";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchUserList = async (tuKhoa = "") => {
    const data = await getUserListApi(tuKhoa);
    setUserList(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (taiKhoan) => {
    if (window.confirm("Bạn có chắc muốn xoá tài khoản này?")) {
      await deleteUserApi(taiKhoan);
      fetchUserList(); // refresh
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUserList(keyword);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="ml-64 p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">👤 Quản lý người dùng</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm người dùng
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-4 flex">
        <input
          type="text"
          placeholder="Tìm tài khoản..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border rounded mr-2 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tìm
        </button>
      </form>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Tài khoản</th>
              <th className="border px-4 py-2">Họ tên</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">SĐT</th>
              <th className="border px-4 py-2">Phân loại</th> {/* ✅ Mới */}
              <th className="border px-4 py-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.taiKhoan} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.taiKhoan}</td>
                <td className="border px-4 py-2">{user.hoTen}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.soDT}</td>
                <td
                  className={`border px-4 py-2 text-center font-semibold ${
                    user.maLoaiNguoiDung === "QuanTri"
                      ? "bg-green-100 text-green-800"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {user.maLoaiNguoiDung === "QuanTri"
                      ? "👑 Quản trị viên"
                      : "👤 Khách hàng"}
                  </span>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(user.taiKhoan)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditForm && selectedUser && (
        <EditUserForm
          user={selectedUser}
          onClose={() => setShowEditForm(false)}
          onRefresh={fetchUserList}
        />
      )}

      {showAddForm && (
        <AddUserForm
          onClose={() => setShowAddForm(false)}
          onRefresh={fetchUserList}
        />
      )}
    </div>
  );
};

export default UserList;
