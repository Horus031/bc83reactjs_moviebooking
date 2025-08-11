import api from "./api";

export const loginApi = async (values) => {
  try {
    const response = await api.post("QuanLyNguoiDung/DangNhap", values);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const registerApi = async (values) => {
  try {
    const response = await api.post("QuanLyNguoiDung/DangKy", values);

    return response;
  } catch (error) {
    console.log(error);
  }
};
