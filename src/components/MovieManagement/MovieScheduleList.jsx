import React, { useEffect, useState } from "react";
import {
  getMovieScheduleApi,
  deleteScheduleApi,
} from "../../services/movie.api";

const MovieScheduleList = ({ movieId, onClose }) => {
  const [lichChieu, setLichChieu] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const data = await getMovieScheduleApi(movieId);
      setLichChieu(data.heThongRapChieu || []);
    };
    fetchSchedule();
  }, [movieId]);

  const handleDeleteSchedule = async (maLichChieu) => {
    if (window.confirm("Bạn có chắc muốn xoá lịch chiếu này?")) {
      await deleteScheduleApi(maLichChieu);
      const data = await getMovieScheduleApi(movieId);
      setLichChieu(data.heThongRapChieu || []);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📅 Danh sách lịch chiếu</h2>
          <button onClick={onClose} className="text-red-600 font-semibold">
            Đóng
          </button>
        </div>

        {lichChieu.length === 0 ? (
          <p className="text-gray-500 italic">Chưa có lịch chiếu nào.</p>
        ) : (
          lichChieu.map((heThong) => (
            <div key={heThong.maHeThongRap} className="mb-4">
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
                {heThong.tenHeThongRap}
              </h3>
              {heThong.cumRapChieu.map((cumRap) => (
                <div key={cumRap.maCumRap} className="ml-4 mb-2">
                  <p className="font-medium text-gray-800">
                    🎬 {cumRap.tenCumRap}
                  </p>
                  <ul className="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
                    {cumRap.lichChieuPhim.map((lich) => (
                      <li
                        key={lich.maLichChieu}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {new Date(lich.ngayChieuGioChieu).toLocaleString()} –{" "}
                          {lich.tenRap} –{" "}
                          <strong>{lich.giaVe.toLocaleString()}đ</strong>
                        </span>
                        <button
                          className="text-red-600 hover:text-red-800 ml-2"
                          onClick={() => handleDeleteSchedule(lich.maLichChieu)}
                          title="Xoá lịch chiếu"
                        >
                          🗑
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieScheduleList;
