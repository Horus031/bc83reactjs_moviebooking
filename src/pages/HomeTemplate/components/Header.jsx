import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../../store/auth.slice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
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
          {user ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                type="button"
                className="bg-red-500 rounded-lg px-4 py-2 text-white font-medium cursor-pointer"
              >
                Profile
              </button>
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
