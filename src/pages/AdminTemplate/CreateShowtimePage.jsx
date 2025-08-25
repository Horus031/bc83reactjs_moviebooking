import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateShowtimePage = () => {
  const [heThongRap, setHeThongRap] = useState([]);
  const [selectedHeThong, setSelectedHeThong] = useState("");
  const [cumRap, setCumRap] = useState([]);
  const [selectedCumRap, setSelectedCumRap] = useState("");
  const [lichChieu, setLichChieu] = useState([]);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4MyIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2OTA0MDAwMDAwMCIsIm5iZiI6MTc0MTg4ODgwMCwiZXhwIjoxNzY5MTkxMjAwfQ.kBKKhbMMH6Pqm5TdwA9DOp9z6srHiyc9KnYL_084PPo";

  // Lấy danh sách hệ thống rạp
  useEffect(() => {
    const fetchHeThongRap = async () => {
      try {
        const res = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          {
            headers: {
              TokenCybersoft: TOKEN,
            },
          }
        );
        const data = res.data?.content || [];
        setHeThongRap(data);
      } catch (err) {
        console.error("Lỗi lấy hệ thống rạp:", err);
      }
    };
    fetchHeThongRap();
  }, []);

  // Lấy cụm rạp theo hệ thống
  useEffect(() => {
    if (!selectedHeThong) return;
    const fetchCumRap = async () => {
      try {
        const res = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${selectedHeThong}`,
          {
            headers: {
              TokenCybersoft: TOKEN,
            },
          }
        );
        setCumRap(res.data.content || []);
      } catch (err) {
        console.error("Lỗi lấy cụm rạp:", err);
      }
    };
    fetchCumRap();
  }, [selectedHeThong]);

  // Lấy lịch chiếu theo hệ thống + cụm rạp
  useEffect(() => {
    if (!selectedHeThong || !selectedCumRap) return;
    const fetchLichChieu = async () => {
      try {
        const res = await axios.get(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${selectedHeThong}&maNhom=GP00`,
          {
            headers: {
              TokenCybersoft: TOKEN,
            },
          }
        );

        const contentArray = res.data?.content || [];
        const cumRapData =
          contentArray.find((item) => item.maHeThongRap === selectedHeThong)
            ?.lstCumRap || [];

        const selectedCum = cumRapData.find(
          (c) => c.maCumRap === selectedCumRap
        );

        setLichChieu(selectedCum?.danhSachPhim || []);
      } catch (err) {
        console.error("Lỗi lấy lịch chiếu:", err);
      }
    };
    fetchLichChieu();
  }, [selectedCumRap, selectedHeThong]);

  return (
    <div className="p-6 bg-white min-h-screen" style={{ marginLeft: 200 }}>
      <h1 className="text-2xl font-bold mb-6">Lịch chiếu phim theo rạp</h1>

      {/* Chọn hệ thống rạp */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Chọn hệ thống rạp:</label>
        <select
          className="border p-2 w-full"
          value={selectedHeThong}
          onChange={(e) => {
            setSelectedHeThong(e.target.value);
            setSelectedCumRap("");
            setLichChieu([]);
          }}
        >
          <option value="">-- Chọn --</option>
          {heThongRap.map((rap) => (
            <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
              {rap.tenHeThongRap}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn cụm rạp */}
      {cumRap.length > 0 && (
        <div className="mb-6">
          <label className="block font-semibold mb-1">Chọn cụm rạp:</label>
          <select
            className="border p-2 w-full"
            value={selectedCumRap}
            onChange={(e) => setSelectedCumRap(e.target.value)}
          >
            <option value="">-- Chọn --</option>
            {cumRap.map((cum) => (
              <option key={cum.maCumRap} value={cum.maCumRap}>
                {cum.tenCumRap}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Hiển thị lịch chiếu */}
      {lichChieu.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lichChieu.map((phim) => (
            <div
              key={phim.maPhim}
              className="border p-4 rounded shadow bg-yellow-50"
            >
              <h3 className="font-bold text-lg mb-2">{phim.tenPhim}</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(phim.lstLichChieuTheoPhim) &&
                  phim.lstLichChieuTheoPhim.map((lich) => (
                    <span
                      key={lich.maLichChieu}
                      className="bg-yellow-300 text-black px-3 py-1 rounded text-sm"
                    >
                      {new Date(lich.ngayChieuGioChieu).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateShowtimePage;
