import api from "./api";

export const getMovieListApi = async (maNhom) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`
    );

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieBannerApi = async () => {
  try {
    const response = await api.get("QuanLyPhim/LayDanhSachBanner");

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetailsApi = async (maPhim) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTheaterListApi = async () => {
  try {
    const response = await api.get("QuanLyRap/LayThongTinHeThongRap");

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieScheduleApi = async (maPhim) => {
  try {
    const response = await api.get(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getSeatInformationApi = async (maLichChieu) => {
  try {
    const response = await api.get(
      `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const seatBookingApi = async (values) => {
  try {
    const response = await api.post(`QuanLyDatVe/DatVe`, values);

    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// Thêm phim mới (có hình)
export const addMovieApi = async (formData) => {
  // KHÔNG tự set headers Authorization ở đây để khỏi đè instance
  return api.post("QuanLyPhim/ThemPhimUploadHinh", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// Cập nhật phim (có hình)
export const updateMovieApi = async (formData) => {
  try {
    const response = await api.post("QuanLyPhim/CapNhatPhimUpload", formData);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

// Xoá phim
export const deleteMovieApi = async (maPhim) => {
  try {
    const response = await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getTheaterSystemApi = async () => {
  try {
    const response = await api.get("QuanLyRap/LayThongTinHeThongRap");
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getTheaterClusterApi = async (maHeThongRap) => {
  try {
    const response = await api.get(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const createScheduleApi = async (data) => {
  try {
    const response = await api.post("QuanLyDatVe/TaoLichChieu", data);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const deleteScheduleApi = async (maLichChieu) => {
  try {
    const response = await api.delete(
      `QuanLyDatVe/XoaLichChieu?MaLichChieu=${maLichChieu}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};
