import React from "react";
import { useState } from "react";
import { getMovieScheduleApi } from "../../../services/movie.api";
import { useQuery } from "@tanstack/react-query";
import { getTheaterListApi } from "../../../services/movie.api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const MovieModal = (props) => {
  const { movie, modalContent, setModalContent } = props;
  const [theaterName, setTheaterName] = useState("BHDStar");
  const navigate = useNavigate();

  const {
    data: theaterList,
    isLoading: isTheaterLoading,
    isError: isTheaterError,
  } = useQuery({
    queryKey: ["theater"],
    queryFn: () => getTheaterListApi(),
  });

  const {
    data: movieSchedule,
    isLoading: isMovieScheduleLoading,
    isError: isMovieScheduleError,
  } = useQuery({
    queryKey: ["movie-schedule", movie?.maPhim],
    queryFn: () => getMovieScheduleApi(movie?.maPhim),
    enabled: !!movie?.maPhim,
  });

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";
    // Match standard YouTube URLs
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  const handleShowTrailer = () => {
    const embedUrl = getYoutubeEmbedUrl(movie?.trailer);
    return (
      <iframe
        src={embedUrl}
        frameBorder="0"
        height="400"
        width="100%"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Trailer"
      ></iframe>
    );
  };

  const handleRenderTheatre = () => {
    if (isTheaterLoading) return <div>Loading theaters...</div>;
    if (isTheaterError) return <div>Error loading theaters.</div>;
    if (!theaterList) return null;

    return theaterList.map((theater) => {
      return (
        <button
          onClick={() => setTheaterName(theater?.maHeThongRap)}
          key={theater?.maHeThongRap}
          className={`rounded-lg ${
            theaterName === theater?.maHeThongRap ? "bg-white/50" : ""
          } cursor-pointer active:scale-90 p-2`}
        >
          <img
            src={theater?.logo}
            alt={theater?.biDanh}
            width={80}
            height={80}
          />
        </button>
      );
    });
  };

  const handleRenderSchedule = (theaterName) => {
    if (isMovieScheduleLoading) return <div>Loading schedules...</div>;
    if (isMovieScheduleError) return <div>Error loading schedules.</div>;
    if (!movieSchedule) return null;

    // Filter schedule with theater
    const scheduleWithTheater = movieSchedule?.heThongRapChieu.filter(
      (schedule) => schedule.maHeThongRap === theaterName
    );

    console.log(scheduleWithTheater);

    if (!scheduleWithTheater || scheduleWithTheater.length === 0) {
      return <div>No schedule available for this theater.</div>;
    }

    const { cumRapChieu } = scheduleWithTheater[0];

    return cumRapChieu.map((item) => {
      return (
        <div key={item.maCumRap} className="p-4 space-y-4">
          <h3 className="text-2xl font-semibold">{item.tenCumRap}</h3>
          <div className="grid grid-cols-4 gap-4">
            {item.lichChieuPhim.map((schedule) => {
              return (
                <button
                  onClick={() =>
                    navigate(`/movie-booking/${schedule.maLichChieu}`)
                  }
                  key={schedule.maLichChieu}
                  className="px-4 py-2 border border-slate-400 cursor-pointer rounded-lg font-medium active:scale-90"
                >
                  {format(new Date(schedule.ngayChieuGioChieu), "HH:mm")}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-gray-700 rounded-lg shadow-sm">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 ">
            <h3 className="text-xl font-semibold text-white">
              {modalContent.type === "booking"
                ? `Movie Schedule - ${movie?.tenPhim}`
                : `Trailer - ${movie?.tenPhim}`}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() =>
                setModalContent({
                  ...modalContent,
                  state: false,
                })
              }
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          {modalContent.type === "booking" ? (
            <div className="p-4 md:p-5 space-y-4 flex h-[700px]">
              <div className="flex-3/12 p-4 flex flex-col items-center space-y-4">
                {handleRenderTheatre(theaterList)}
              </div>
              <div className="flex-9/12 overflow-scroll">
                {handleRenderSchedule(theaterName)}
              </div>
            </div>
          ) : (
            <div className="p-4 md:p-5 space-y-4">{handleShowTrailer()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
