import React, { useState } from "react";
import { addMovieApi } from "../../services/movie.api";

const AddMovieForm = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    tenPhim: "",
    moTa: "",
    ngayKhoiChieu: "",
    trailer: "",
    maNhom: "GP00",
    danhGia: 5,
    dangChieu: false,
    sapChieu: false,
    hot: false,
  });

  const [hinhAnh, setHinhAnh] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
    if (hinhAnh) payload.append("File", hinhAnh);

    try {
      await addMovieApi(payload);
      alert("Thêm phim thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      alert("Thêm thất bại");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Thêm phim mới</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="tenPhim"
            placeholder="Tên phim"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="moTa"
            placeholder="Mô tả"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="trailer"
            placeholder="Trailer"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="date"
            name="ngayKhoiChieu"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="danhGia"
            placeholder="Đánh giá"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={1}
            max={10}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
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

export default AddMovieForm;
