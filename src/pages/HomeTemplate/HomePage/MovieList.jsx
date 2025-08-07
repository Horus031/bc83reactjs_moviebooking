import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieListApi } from "../../../services/movie.api";
import Movie from "./Movie";

const MovieList = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movie-list"],
        queryFn: () => getMovieListApi("GP02")
    })

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>There is no movie now, please try again.</div>

    const renderMovieList = () => {
        return data.map((movie) => {
            return (
                <Movie key={movie.maPhim} movie={movie}/>
            )
        })
    }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-white">Now Playing</h3>
        <div className="space-x-4">
          <button className="bg-gray-600 px-4 py-2 rounded-lg cursor-pointer active:scale-90">
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
          </button>
          <button className="bg-gray-600 px-4 py-2 rounded-lg cursor-pointer active:scale-90">
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
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderMovieList()}
      </div>
    </div>
  );
};

export default MovieList;
