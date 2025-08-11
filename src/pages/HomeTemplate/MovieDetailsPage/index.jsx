import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieDetailsApi,
} from "../../../services/movie.api";
import { format } from "date-fns";
import { useState } from "react";
import MovieModal from "../components/MovieModal";
import { useSelector } from "react-redux";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [modalContent, setModalContent] = useState({
    state: false,
    type: "",
  });

  const {
    data: movieDetail,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetailsApi(movieId),
    enabled: !!movieId,
  });

  

  if (isMovieLoading) return <div>Loading...</div>;

  if (isMovieError) return <div>Something went wrong, please try again</div>;

  const movie = movieDetail.content;

  const handleShowModalContent = (type) => {
    if (type === "booking" && !user) {
      navigate("/login")
    }

    setModalContent({
      state: true,
      type: type,
    });
  };


  return (
    <div>
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie?.hinhAnh || "/placeholder.svg"}
            alt={`${movie?.biDanh} backdrop`}
            className="object-cover w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-shrink-0">
              <img
                src={movie?.hinhAnh || "/placeholder.svg"}
                alt={movie?.biDanh}
                width={300}
                height={450}
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-white flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-red-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                  Now Playing
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {movie?.tenPhim}
              </h1>
              <div className="flex items-center space-x-6 mb-6">
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
                  <span className="text-xl font-semibold">
                    {movie?.danhGia}
                  </span>
                </div>
                <span className="border-slate-400 text-slate-300 border text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                  Sci-Fi, Adventure
                </span>
              </div>
              <p className="text-xl text-slate-200 mb-6 max-w-2xl">
                {movie?.moTa}
              </p>
              <div className="flex space-x-4 items-center">
                <button
                  onClick={() => handleShowModalContent("booking")}
                  className="block text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg px-4 py-2 text-center"
                  type="button"
                >
                  Book Now
                </button>

                <button
                  onClick={() => handleShowModalContent("trailer")}
                  className="px-4 py-2 rounded-lg bg-black hover:bg-white/20 cursor-pointer text-white"
                >
                  Watch Trailer
                </button>

                {/* Main modal */}
                {modalContent.state && (
                  <MovieModal
                    movie={movie}
                    modalContent={modalContent}
                    setModalContent={setModalContent}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-slate-300 leading-relaxed">{movie?.moTa}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Cast & Crew
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Director
                  </h3>
                  <p className="text-slate-300">
                    {movie?.director || "Updating"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie?.cast?.map((actor) => (
                      <span
                        key={actor}
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        {actor}
                      </span>
                    )) || <span className="text-slate-300">Updating</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 border-slate-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Movie Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Release Date:</span>
                    <span className="text-white">
                      {movie?.ngayKhoiChieu
                        ? format(movie.ngayKhoiChieu, "dd/MM/yyyy")
                        : "Updating"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white">
                      {movie.duration || "Updating"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Genre:</span>
                    <span className="text-white">
                      {movie.genre || "Updating"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rating:</span>
                    <span className="text-white">{movie?.danhGia}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
