import React, { useState, useEffect } from "react";
import { updateMovieApi } from "../../services/movie.api";

const EditMovieForm = ({ movie, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    maPhim: "",
    tenPhim: "",
    moTa: "",
    trailer: "",
    ngayKhoiChieu: "",
    danhGia: 5,
    maNhom: "GP01",
  });
  const [hinhAnh, setHinhAnh] = useState(null);

  useEffect(() => {
    if (movie) {
      setFormData({
        maPhim: movie.maPhim,
        tenPhim: movie.tenPhim,
        moTa: movie.moTa,
        trailer: movie.trailer,
        ngayKhoiChieu: movie.ngayKhoiChieu?.slice(0, 10),
        danhGia: movie.danhGia,
        maNhom: "GP01",
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      await updateMovieApi(payload);
      alert("Cập nhật thành công!");
      onClose();
      onRefresh();
    } catch (err) {
      alert("Cập nhật thất bại!");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Sửa thông tin phim</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="tenPhim"
            value={formData.tenPhim}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Tên phim"
            required
          />
          <textarea
            name="moTa"
            value={formData.moTa}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Mô tả"
            rows={4}
            required
          />
          <input
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Trailer"
          />
          <input
            type="date"
            name="ngayKhoiChieu"
            value={formData.ngayKhoiChieu}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="danhGia"
            value={formData.danhGia}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Đánh giá"
            min={1}
            max={10}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Lưu
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

export default EditMovieForm;
