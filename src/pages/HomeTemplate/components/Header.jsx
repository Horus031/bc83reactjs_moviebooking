import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearUser } from "../../../store/auth.slice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
  };
  return (
    <div className=" sticky top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-slate-700">
      <div className="container mx-auto flex w-full justify-between items-center">
        <div className="flex space-x-8 items-center py-4">
          <span className="text-2xl font-bold text-white">CinemaMax</span>
          <div>
            <ul className="flex space-x-8 text-gray-400 font-semibold">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>News</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <form className="w-full">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block rounded-lg bg-gray-800 w-80 text-sm px-10"
                placeholder="Search movies..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-0.5 bottom-1 font-medium rounded-l-none rounded-lg text-sm px-4 py-1.5 bg-black/80 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                type="button"
                className="bg-red-500 rounded-lg px-4 py-2 text-white font-medium cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="bg-red-500 rounded-lg px-4 py-2 text-white font-medium cursor-pointer"
              >
                <NavLink to="/login">Login</NavLink>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
