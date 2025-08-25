import React, { useEffect, useState } from "react";
import {
  getTheaterSystemApi,
  getTheaterClusterApi,
  createScheduleApi,
} from "../../services/movie.api";

const AddScheduleForm = ({ movieId, onClose }) => {
  const [heThongRap, setHeThongRap] = useState([]);
  const [cumRap, setCumRap] = useState([]);
  const [form, setForm] = useState({
    maPhim: movieId,
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  useEffect(() => {
    const fetchHeThong = async () => {
      const data = await getTheaterSystemApi();
      setHeThongRap(data);
    };
    fetchHeThong();
  }, []);

  const handleSelectHeThong = async (e) => {
    const maHeThongRap = e.target.value;
    const data = await getTheaterClusterApi(maHeThongRap);
    const rapList = data.flatMap((cum) => cum.danhSachRap);
    setCumRap(rapList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createScheduleApi(form);
      alert("Tạo lịch chiếu thành công!");
      onClose();
    } catch (err) {
      alert("Tạo lịch thất bại!");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">
          🎬 Tạo lịch chiếu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hệ thống rạp */}
          <div>
            <label className="block font-semibold mb-1">
              Chọn hệ thống rạp
            </label>
            <select
              onChange={handleSelectHeThong}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Chọn hệ thống --</option>
              {heThongRap.map((htr) => (
                <option key={htr.maHeThongRap} value={htr.maHeThongRap}>
                  {htr.tenHeThongRap}
                </option>
              ))}
            </select>
          </div>

          {/* Rạp */}
          <div>
            <label className="block font-semibold mb-1">Chọn rạp</label>
            <select
              name="maRap"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">-- Chọn rạp --</option>
              {cumRap.map((rap) => (
                <option key={rap.maRap} value={rap.maRap}>
                  {rap.tenRap}
                </option>
              ))}
            </select>
          </div>

          {/* Ngày giờ chiếu */}
          <div>
            <label className="block font-semibold mb-1">Ngày giờ chiếu</label>
            <input
              type="datetime-local"
              name="ngayChieuGioChieu"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Giá vé */}
          <div>
            <label className="block font-semibold mb-1">Giá vé</label>
            <input
              type="number"
              name="giaVe"
              onChange={handleChange}
              placeholder="VD: 75000"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Lưu lịch chiếu
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Huỷ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleForm;
