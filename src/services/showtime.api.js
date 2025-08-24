import axios from "./api";

export const getTheaterSystems = () => {
  return axios.get("/api/QuanLyRap/LayThongTinHeThongRap");
};

export const getTheaterClusters = (maHeThongRap) => {
  return axios.get(
    `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
  );
};

export const createShowtime = (data) => {
  return axios.post("/api/QuanLyDatVe/TaoLichChieu", data);
};

export const getShowtimes = (maHeThongRap) => {
  return axios.get(
    `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP00`
  );
};

export const getMovies = () => {
  return axios.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00");
};

export const getAllShowtimes = () => {
  return axios.get("/api/QuanLyDatVe/LayDanhSachLichChieu");
};
