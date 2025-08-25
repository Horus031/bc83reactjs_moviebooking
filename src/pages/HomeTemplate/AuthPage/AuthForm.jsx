import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../../../services/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.slice";

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const AuthForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { mode } = props;

  const { mutate: handleLogin, isPending: isLoginPending, isError: isLoginError } = useMutation({
    mutationFn: (values) => loginApi(values),
    onSuccess: (user) => {
      if (!user) return;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin" : "/");
    },
    onError: () => {
      setErrors({ form: "Login failed. Please check your credentials." });
    },
  });

  const { mutate: handleRegister, isPending: isRegisterPending, isError: isRegisterError } = useMutation({
    mutationFn: (values) => registerApi(values),
    onSuccess: () => {
      alert("Successfully registered, please login");
      navigate("/login");
    },
    onError: () => {
      setErrors({ form: "Registration failed. Please try again." });
    },
  });

  const isLoading = isLoginPending || isRegisterPending;

  const [authValues, setAuthValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    hoTen: "",
    maLoaiNguoiDung: "KhachHang",
    xacNhanMatKhau: "",
  });

  const handleOnChange = (event) => {
    setAuthValues({
      ...authValues,
      [event.target.name]: event.target.value,
    });
    setErrors({ ...errors, [event.target.name]: "" }); // Clear error on change
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!authValues.taiKhoan) newErrors.taiKhoan = "Username is required.";
    if (!authValues.matKhau) newErrors.matKhau = "Password is required.";
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!authValues.hoTen) newErrors.hoTen = "Full name is required.";
    if (!authValues.taiKhoan) newErrors.taiKhoan = "Username is required.";
    if (!authValues.email) newErrors.email = "Email is required.";
    else if (!validateEmail(authValues.email)) newErrors.email = "Invalid email format.";
    if (!authValues.soDt) newErrors.soDt = "Phone number is required.";
    if (!authValues.matKhau) newErrors.matKhau = "Password is required.";
    else if (authValues.matKhau.length < 6) newErrors.matKhau = "Password must be at least 6 characters.";
    if (!authValues.xacNhanMatKhau) newErrors.xacNhanMatKhau = "Please confirm your password.";
    else if (authValues.matKhau !== authValues.xacNhanMatKhau) newErrors.xacNhanMatKhau = "Passwords do not match.";
    return newErrors;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let newErrors = {};

    if (mode === "/login") {
      newErrors = validateLogin();
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }
      const loginData = {
        taiKhoan: authValues.taiKhoan,
        matKhau: authValues.matKhau,
      };
      handleLogin(loginData);
    } else {
      newErrors = validateRegister();
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }
      const registerData = {
        taiKhoan: authValues.taiKhoan,
        matKhau: authValues.matKhau,
        email: authValues.email,
        soDt: authValues.soDt,
        hoTen: authValues.hoTen,
        maNhom: "GP00",
        maLoaiNguoiDung: "KhachHang",
      };
      handleRegister(registerData);
    }
  };

  const isError = isLoginError | isRegisterError;

  if (isError) {
    console.log("This is error")
  }

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
          <form onSubmit={handleOnSubmit} className="space-y-4">
            {errors.form && (
              <div className="text-red-500 text-center mb-2">{errors.form}</div>
            )}
            {mode === "/login" ? (
              <>
                <div className="space-y-4">
                  <label
                    htmlFor="taiKhoan"
                    className="text-slate-300 font-medium text-base"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.taiKhoan}
                    type="text"
                    name="taiKhoan"
                    id="taiKhoan"
                    placeholder="Enter your username"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.taiKhoan && (
                    <div className="text-red-500 text-sm">{errors.taiKhoan}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="matKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.matKhau}
                    type="password"
                    name="matKhau"
                    id="matKhau"
                    placeholder="Enter your password"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.matKhau && (
                    <div className="text-red-500 text-sm">{errors.matKhau}</div>
                  )}
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
                  <input
                    onChange={handleOnChange}
                    value={authValues.hoTen}
                    type="text"
                    name="hoTen"
                    id="hoTen"
                    placeholder="Enter your full name"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.hoTen && (
                    <div className="text-red-500 text-sm">{errors.hoTen}</div>
                  )}
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="taiKhoan"
                    className="text-slate-300 font-medium text-base"
                  >
                    Username
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.taiKhoan}
                    type="text"
                    name="taiKhoan"
                    id="taiKhoan"
                    placeholder="Enter your username"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.taiKhoan && (
                    <div className="text-red-500 text-sm">{errors.taiKhoan}</div>
                  )}
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="email"
                    className="text-slate-300 font-medium text-base"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.email}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="space-y-4">
                  <label
                    htmlFor="soDt"
                    className="text-slate-300 font-medium text-base"
                  >
                    Phone Number
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.soDt}
                    type="text"
                    name="soDt"
                    id="soDt"
                    placeholder="Enter your phone number"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.soDt && (
                    <div className="text-red-500 text-sm">{errors.soDt}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="matKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.matKhau}
                    type="password"
                    name="matKhau"
                    id="matKhau"
                    placeholder="Enter your password"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.matKhau && (
                    <div className="text-red-500 text-sm">{errors.matKhau}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="xacNhanMatKhau"
                    className="text-slate-300 font-medium text-base"
                  >
                    Confirm Password
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={authValues.xacNhanMatKhau}
                    type="password"
                    name="xacNhanMatKhau"
                    id="xacNhanMatKhau"
                    placeholder="Confirm your password"
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-lg w-full"
                  />
                  {errors.xacNhanMatKhau && (
                    <div className="text-red-500 text-sm">{errors.xacNhanMatKhau}</div>
                  )}
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold rounded-lg"
            >
              {isLoading
                ? "Processing..."
                : mode === "/login"
                ? "Sign In"
                : "Create Account"}
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
