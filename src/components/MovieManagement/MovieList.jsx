import React, { useEffect, useState } from "react";
import { getMovieListApi, deleteMovieApi } from "../../services/movie.api";
import AddMovieForm from "./AddMovieForm";
import EditMovieForm from "./EditMovieForm";
import AddScheduleForm from "./AddScheduleForm";
import MovieScheduleList from "./MovieScheduleList";
import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showScheduleList, setShowScheduleList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (tuKhoa = "") => {
    const allMovies = await getMovieListApi("GP01");
    const filtered = allMovies.filter((movie) =>
      movie.tenPhim.toLowerCase().includes(tuKhoa.toLowerCase())
    );
    setMovieList(filtered);
  };

  const handleDelete = async (maPhim) => {
    if (window.confirm("Bạn có chắc muốn xoá phim này?")) {
      await deleteMovieApi(maPhim);
      fetchMovies();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(keyword);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="ml-64 p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎬 Quản lý phim</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Thêm phim
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Tìm phim..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border rounded w-64 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tìm
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 w-[80px]">Mã</th>
              <th className="border px-3 py-2 w-[160px]">Hình ảnh</th>
              <th className="border px-3 py-2 w-[200px]">Tên phim</th>
              <th className="border px-3 py-2">Mô tả</th>
              <th className="border px-3 py-2 w-[160px] text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {movieList.map((movie) => (
              <tr key={movie.maPhim} className="hover:bg-gray-50 border-b">
                <td className="border px-3 py-2">{movie.maPhim}</td>
                <td className="border px-3 py-2 text-center">
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    className="w-16 h-24 object-cover mx-auto rounded shadow-sm"
                  />
                </td>
                <td className="border px-3 py-2 font-semibold">
                  {movie.tenPhim}
                </td>
                <td className="px-3 py-2 text-gray-700">{movie.moTa}</td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Sửa"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowEditForm(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    title="Tạo lịch chiếu"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowScheduleForm(true);
                    }}
                  >
                    <FaCalendarAlt />
                  </button>
                  <button
                    className="text-gray-600 hover:text-black underline text-sm"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowScheduleList(true);
                    }}
                  >
                    Xem lịch
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(movie.maPhim)}
                    title="Xoá"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Movie */}
      {showAddForm && (
        <AddMovieForm
          onClose={() => setShowAddForm(false)}
          onRefresh={fetchMovies}
        />
      )}

      {/* Edit Movie */}
      {showEditForm && selectedMovie && (
        <EditMovieForm
          movie={selectedMovie}
          onClose={() => setShowEditForm(false)}
          onRefresh={fetchMovies}
        />
      )}

      {/* Add Schedule */}
      {showScheduleForm && selectedMovie && (
        <AddScheduleForm
          movieId={selectedMovie.maPhim}
          onClose={() => setShowScheduleForm(false)}
        />
      )}

      {/* View Schedule List */}
      {showScheduleList && selectedMovie && (
        <MovieScheduleList
          movieId={selectedMovie.maPhim}
          onClose={() => {
            setShowScheduleList(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </div>
  );
};

export default MovieList;
