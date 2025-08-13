import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../../../services/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.slice";

const AuthForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = props;

  const { mutate: handleLogin } = useMutation({
    mutationFn: (values) => loginApi(values),
    onSuccess: (user) => {
      if (!user) return;

      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin" : "/");
    },

    onError: () => {
      console.log("Login failed")
    }
  })

  const { mutate: handleRegister } = useMutation({
    mutationFn: (values) => (registerApi(values)),
    onSuccess: () => {
      alert("Successfully registered, please login");
      navigate("/login")
    },
    onError: () => {
      console.log("Registration failed")
    }
  })
  

  const isLoading = handleLogin.isPending || handleRegister.isPending;

  const [authValues, setAuthValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    hoTen: "",
    xacNhanMatKhau: "",
  });

  const handleOnChange = (event) => {
    setAuthValues({
      ...authValues,
      [event.target.name]: event.target.value,
    });
  };


  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (mode === "/login") {
      const loginData = {
        taiKhoan: authValues.taiKhoan,
        matKhau: authValues.matKhau,
      };
      handleLogin(loginData);
    } else {
      if (authValues.matKhau !== authValues.xacNhanMatKhau) {
        alert("Passwords don't match");
        return;
      }

      const registerData = {
        taiKhoan: authValues.taiKhoan,
        matKhau: authValues.matKhau,
        email: authValues.email,
        soDt: authValues.soDt,
        maNhom: authValues.maNhom,
        hoTen: authValues.hoTen
      };
      handleRegister(registerData);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-8">
        {mode == "/login" ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400">
              Sign in to your account to continue
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-2">
              Join CinemaMax
            </h1>
            <p className="text-slate-400">
              Create your account to start booking movies
            </p>
          </>
        )}
      </div>
      <div className="bg-slate-800/80 backdrop-blur-md border-slate-700 shadow-2xl p-6 border rounded-xl">
        <h3 className="text-2xl font-bold text-center text-white">
          {mode === "/login" ? "Sign In" : "Create Account"}
        </h3>

        <div className="space-y-6">
          <form onSubmit={handleOnSubmit} action="" className="space-y-4" >
            {mode === "/login" ? (
              <>
                <div className="space-y-4">
                  <label
                    htmlFor="taiKhoan"
                    className="text-slate-300 font-medium text-base"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="taiKhoan"
                      id="taiKhoan"
                      placeholder="Enter your username"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="matKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="password"
                      name="matKhau"
                      id="matKhau"
                      placeholder="Enter your password"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="border-slate-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 rounded-sm"
                    />
                    <span className="text-sm text-slate-300">Remember me</span>
                  </div>
                  <NavLink className="text-sm text-red-500 hover:text-red-400">
                    Forgot password?
                  </NavLink>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <label
                    htmlFor="hoTen"
                    className="text-slate-300 font-medium text-base"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="hoTen"
                      id="hoTen"
                      placeholder="Enter your full name"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="taiKhoan"
                    className="text-slate-300 font-medium text-base"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="taiKhoan"
                      id="taiKhoan"
                      placeholder="Enter your username"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="email"
                    className="text-slate-300 font-medium text-base"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="soDt"
                    className="text-slate-300 font-medium text-base"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="soDt"
                      id="soDt"
                      placeholder="Enter your phone number"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="matKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="password"
                      name="matKhau"
                      id="matKhau"
                      placeholder="Enter your password"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="xacNhanMatKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleOnChange}
                      type="password"
                      name="xacNhanMatKhau"
                      id="xacNhanMatKhau"
                      placeholder="Confirm your password"
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold rounded-lg"
            >
              {isLoading ? "Processing..." : (mode === "/login" ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-400">
              {mode === "/login" ? (
                <>
                  Don't have an account?{" "}
                  <NavLink
                    to="/register"
                    className="text-red-500 hover:text-red-400 font-semibold"
                  >
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  Already have account?{" "}
                  <NavLink
                    to="/login"
                    className="text-red-500 hover:text-red-400 font-semibold"
                  >
                    Sign in
                  </NavLink>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
