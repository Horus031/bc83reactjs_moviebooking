import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  getUserInfoApi,
  updateUserInfoApi,
} from "../../../services/profile.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/auth.slice";
import { format } from "date-fns";

const ProfilePage = () => {
  const [currentTabs, setCurrentTabs] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userValues, setUserValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  const dispatch = useDispatch();

  const { mutate: handleUserInfor } = useMutation({
    mutationFn: () => getUserInfoApi(),
    onSuccess: (userInfor) => {
      if (!userInfor) return;

      setCurrentUser(userInfor);
      setUserValues({
        taiKhoan: userInfor.taiKhoan,
        matKhau: userInfor.matKhau,
        email: userInfor.email,
        soDt: userInfor.soDT || "",
        maNhom: userInfor.maNhom,
        maLoaiNguoiDung: userInfor.maLoaiNguoiDung,
        hoTen: userInfor.hoTen,
      });
    },

    onError: () => {
      console.log("Get information failed");
    },
  });

  const { mutate: handleUpdateUser } = useMutation({
    mutationFn: (values) => updateUserInfoApi(values),
    onSuccess: (userInfor) => {
      if (!userInfor) return;

      const storedUser = JSON.parse(localStorage.getItem("user"));
      const accessToken = storedUser?.accessToken || "";

      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken,
          ...userInfor,
        })
      );
      dispatch(setUser({ accessToken, ...userInfor }));
      setCurrentUser({
        ...userInfor,
        thongTinDatVe: currentUser.thongTinDatVe,
      });
    },
    onError: () => {
      console.log("Update information failed");
    },
  });

  useEffect(() => {
    handleUserInfor();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (event) => {
    setUserValues({
      ...userValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser(userValues);
    setIsEditing(false);
  };


  const handleRenderTickets = () => {
    return currentUser.thongTinDatVe.map((item) => {
      return (
        <div
          key={item.maVe}
          className="bg-slate-900 border-slate-700 rounded-lg p-2 border"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <img
                  src={item.hinhAnh}
                  alt=""
                  width={120}
                  height={180}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col space-y-4 items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.tenPhim}
                    </h3>
                    <div className="flex items-center space-x-4 text-slate-400">
                      <div className="flex items-center space-x-1">
                        <span>{item.danhSachGhe[0].tenHeThongRap}</span>
                      </div>
                    </div>
                  </div>

                  <span className="w-full border border-slate-700"></span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm">
                        Booking ID
                      </label>
                      <p className="text-white font-mono">{item.maVe}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Seats</label>
                      <p className="text-white">
                        {item.danhSachGhe.map((seat) => {
                          return `${seat.tenGhe} `;
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">
                        Total Amount
                      </label>
                      <p className="text-white font-semibold">${item.giaVe}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <p className="text-slate-400 text-sm">
                      Booked on {format(item.ngayDat, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="bg-slate-800 border-slate-700 rounded-lg text-sm p-1 text-center text-white font-medium w-fit">
          <button
            onClick={() => setCurrentTabs("profile")}
            className={`rounded-md p-2 cursor-pointer ${
              currentTabs === "profile" ? "bg-red-500" : ""
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setCurrentTabs("booking")}
            className={`rounded-md p-2 cursor-pointer ${
              currentTabs === "booking" ? "bg-red-500" : ""
            }`}
          >
            My Bookings
          </button>
        </div>

        <div>
          <div className="bg-slate-800 border-slate-700 rounded-lg p-4 text-white">
            {currentTabs === "profile" ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                      alt=""
                      className="size-20"
                    />
                    <div className="font-medium">
                      <h3 className="text-2xl">{currentUser?.hoTen}</h3>
                      <p className="text-slate-400">Member of CinemaMax</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {!isEditing && (
                      <div className="col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="bg-red-600 hover:bg-red-800 px-4 py-2 font-medium rounded-lg"
                        >
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <form
                    onSubmit={handleOnSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                  >
                    {isEditing && (
                      <div className="col-span-2 flex justify-end space-x-4">
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-800 px-4 py-2 font-medium rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-600 border bg-transparent px-4 py-2 font-medium rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="hoTen"
                          className="text-slate-300 flex items-center mb-2"
                        >
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            onChange={handleOnChange}
                            type="text"
                            name="hoTen"
                            id="hoTen"
                            className="w-full rounded-lg bg-slate-700 border-slate-600 text-white"
                            value={userValues?.hoTen}
                          />
                        ) : (
                          <p className="text-white bg-slate-700 p-3 rounded-md">
                            {currentUser?.hoTen}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="soDt"
                          className="text-slate-300 flex items-center mb-2"
                        >
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            onChange={handleOnChange}
                            type="text"
                            name="soDt"
                            id="soDt"
                            className="w-full rounded-lg bg-slate-700 border-slate-600 text-white"
                            value={userValues?.soDt}
                          />
                        ) : (
                          <p className="text-white bg-slate-700 p-3 rounded-md">
                            {currentUser?.soDT}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="text-slate-300 flex items-center mb-2"
                        >
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            onChange={handleOnChange}
                            type="text"
                            name="email"
                            id="email"
                            className="w-full rounded-lg bg-slate-700 border-slate-600 text-white"
                            value={userValues?.email}
                          />
                        ) : (
                          <p className="text-white bg-slate-700 p-3 rounded-md">
                            {currentUser?.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="matKhau"
                          className="text-slate-300 flex items-center mb-2"
                        >
                          Password
                        </label>
                        {isEditing ? (
                          <input
                            onChange={handleOnChange}
                            type="text"
                            name="matKhau"
                            id="matKhau"
                            className="w-full rounded-lg bg-slate-700 border-slate-600 text-white"
                            value={userValues?.matKhau}
                          />
                        ) : (
                          <p className="text-white bg-slate-700 p-3 rounded-md">
                            {currentUser?.matKhau}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">My Bookings</h3>
                    <span className="bg-slate-700 text-slate-300 text-sm px-2 py-1 font-medium rounded-full">{currentUser.thongTinDatVe.length} Total Bookings</span>
                </div>

                <div className="grid gap-6">{handleRenderTickets()}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
