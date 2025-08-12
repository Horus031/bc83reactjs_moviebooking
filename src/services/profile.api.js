import api from "./api";

export const getUserInfoApi = async () => {
  try {
    const response = await api.post("QuanLyNguoiDung/ThongTinTaiKhoan");

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfoApi = async (values) => {
  try {
    const response = await api.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);

    return response.data.content;
  } catch (error) {
    console.log(error)
  }
}