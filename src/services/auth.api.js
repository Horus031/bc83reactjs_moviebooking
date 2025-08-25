import api from "./api";

export const loginApi = async (values) => {
  try {
    const response = await api.post("QuanLyNguoiDung/DangNhap", values);

    return response.data.content;
  } catch (error) {
    alert(error.response?.data.content)
    return
  }
};

export const registerApi = async (values) => {
  try {
    const response = await api.post("QuanLyNguoiDung/DangKy", values);
    return response;
  } catch (error) {
    alert(error.response?.data.content)
    return
  }
};

export const getUserListApi = async (tuKhoa = "") => {
  try {
    const params = { maNhom: "GP00" }; // dùng maNhom (viết thường) cho đồng bộ các endpoint
    if (tuKhoa && tuKhoa.trim()) params.tuKhoa = tuKhoa.trim(); // chỉ thêm khi có giá trị

    const response = await api.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params,
    });
    return response.data.content;
  } catch (error) {
    alert(error.response?.data.content)
    return
  }
};

export const deleteUserApi = async (taiKhoan) => {
  try {
    const response = await api.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    return response.data.content;
  } catch (error) {
    alert(error.response?.data.content)
    return
  }
};
