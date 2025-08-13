import React from "react";
import { useNavigate } from "react-router-dom";

const Movie = (props) => {
  const { movie } = props;

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movie-details/${movie.maPhim}`);
  };

  return (
    <div
      onClick={handleViewDetails}
      className="bg-slate-800 border-slate-700 border rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300"
    >
      <div className="relative">
        <img className="w-full h-80 object-cover" src={movie?.hinhAnh} alt="" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer text-white font-medium">
            Book Now
          </button>
        </div>
      </div>
      <div className="p-5">
        <h5 className="text-lg font-semibold text-white mb-2">
          {movie?.tenPhim}
        </h5>
        <p className="text-slate-400 text-sm mb-3 line-clamp-3">
          {movie?.moTa}
        </p>

        <div className="flex items-center justify-between mb-4 text-white">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="text-white font-medium">{movie?.danhGia}</span>
          </div>

          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-sm">166 min</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="border-slate-400 text-slate-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            10:30 AM
          </span>
          <span className="border-slate-400 text-slate-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            2:00 PM
          </span>
          <span className="border-slate-400 text-slate-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            6:30 PM
          </span>
          <span className="border-slate-400 text-slate-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
            +1 more
          </span>
        </div>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:outline-none "
        >
          View Detail
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Movie;
