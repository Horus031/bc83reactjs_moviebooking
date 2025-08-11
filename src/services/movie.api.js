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
        const response = await api.get("QuanLyPhim/LayDanhSachBanner")

        return response.data.content;
    } catch (error) {
        console.log(error);
    }
}

export const getMovieDetailsApi = async (maPhim) => {
    try {
        const response = await api.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getTheaterListApi = async () => {
  try {
    const response = await api.get("QuanLyRap/LayThongTinHeThongRap")


    return response.data.content;
  } catch (error) {
    console.log(error)
  }
}

export const getMovieScheduleApi = async (maPhim) => {
  try {
    const response = await api.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);


    return response.data.content;
  } catch (error) {
    console.log(error)
  }
}

export const getSeatInformationApi = async(maLichChieu) => {
  try {
    const response = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);

    return response.data.content;
  } catch (error) {
    console.log(error)
  }
}