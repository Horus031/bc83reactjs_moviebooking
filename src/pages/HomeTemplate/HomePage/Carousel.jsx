import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieBannerApi } from "../../../services/movie.api";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    data: bannerMovies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-banner"],
    queryFn: () => getMovieBannerApi(),
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerMovies.length) % bannerMovies.length
    );
  };

  if (isLoading) return <div>Loading</div>;

  if (isError) return <div>Something went wrong, please try again</div>;

  const renderMovieBanner = () => {
    return bannerMovies.map((movie, index) => {
      return (
        <div
          key={movie?.maPhim}
          className={`${
            index === currentSlide ? "block" : "hidden"
          } duration-700 ease-in-out`}
          data-carousel-item
        >
          <div>
            <img
              src={movie?.hinhAnh}
              className="object-cover absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center my-44">
            <div className="max-w-2xl text-white">
              <h2 className="text-8xl font-bold mb-4">CinemaMax</h2>
              <p className="text-3xl mb-6 text-slate-200">
                Unlimited experience.
              </p>

              <div className="flex space-x-4 font-medium">
                <NavLink to={`movie-details/${movie?.maPhim}`} className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer flex items-center">
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
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div
        id="default-carousel"
        className="relative w-full lg:h-full md:h-56"
        data-carousel="slide"
      >
        {/* Carousel wrapper */}
        <div className="relative lg:h-full overflow-hidden rounded-lg md:h-56">
          {renderMovieBanner()}
        </div>
        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
          {bannerMovies?.map((_, index) => (
            <button
              key={index}
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              data-carousel-slide-to={index}
            />
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={prevSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={nextSlide}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
