import React, { useEffect, useState } from "react";
import { getMovieScheduleApi } from "../../services/movie.api";

const InlineScheduleList = ({ movieId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMovieScheduleApi(movieId);
      setData(res.heThongRapChieu || []);
    };
    fetch();
  }, [movieId]);

  if (!data.length)
    return <p className="text-gray-400 italic">Chưa có lịch chiếu</p>;

  return (
    <div className="bg-gray-50 rounded border p-3 mt-2">
      {data.map((heThong) => (
        <div key={heThong.maHeThongRap} className="mb-2">
          <h4 className="text-blue-600 font-bold">{heThong.tenHeThongRap}</h4>
          {heThong.cumRapChieu.map((cum) => (
            <div key={cum.maCumRap} className="ml-4 mb-2">
              <p className="font-semibold">{cum.tenCumRap}</p>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {cum.lichChieuPhim.map((lich) => (
                  <li key={lich.maLichChieu}>
                    {new Date(lich.ngayChieuGioChieu).toLocaleString()} –{" "}
                    {lich.tenRap} –{" "}
                    <strong>{lich.giaVe.toLocaleString()}đ</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InlineScheduleList;
