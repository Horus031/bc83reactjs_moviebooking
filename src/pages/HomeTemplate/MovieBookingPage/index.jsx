import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSeatInformationApi } from "../../../services/movie.api";

const MovieBookingPage = () => {
  const { scheduleId } = useParams();
  const [chosenSeats, setChosenSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const {
    data: seatInformation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["seat-information"],
    queryFn: () => getSeatInformationApi(scheduleId),
  });

  if (isLoading) return <p>Loading seats...</p>;

  if (isError) return <p>Something went wrong.</p>;

  const { danhSachGhe, thongTinPhim } = seatInformation;

  const handleChooseSeat = (seat) => {
    const isChosen = chosenSeats.includes(seat.tenGhe);
    let updatedSeats;
    if (isChosen) {
      updatedSeats = chosenSeats.filter((ghe) => ghe !== seat.tenGhe);
      setTotalPrice(totalPrice - seat.giaVe);
    } else {
      updatedSeats = [...chosenSeats, seat.tenGhe];
      setTotalPrice(totalPrice + seat.giaVe);
    }
    setChosenSeats(updatedSeats);
  };

  const renderSeats = () => {
    return danhSachGhe.map((seat) => {
      const isChosen = chosenSeats.includes(seat.tenGhe);
      return (
        <button
          onClick={() => handleChooseSeat(seat)}
          key={seat.maGhe}
          className={`border text-xs text-center py-2 w-[6.25%] cursor-pointer ${
            seat.loaiGhe === "Thuong" ? "border-green-500" : "border-red-500"
          } ${isChosen ? "bg-red-800 text-white" : ""}`}
        >
          <span>{seat.tenGhe}</span>
        </button>
      );
    });
  };

  const handleConfirmOrder = () => {
    if (!chosenSeats.length) {
        alert("Please choose some seats!")
        return;
    }

    alert("Successfully booking! Please check your information")
    navigate("/");
  }

  return (
    <div className="container flex mx-auto text-center  text-white p-4 mt-4 space-x-4">
      <div className="flex-8/12 flex flex-col items-center space-y-4 bg-black border border-slate-600 p-4 rounded-lg">
        <h1 className="font-bold text-4xl">
          Booking Online - {thongTinPhim?.tenPhim}
        </h1>

        <span className="w-full border border-slate-700"></span>

        <span className="text-2xl font-medium border px-56 py-4 rounded-lg">
          Screen
        </span>

        <div className="flex flex-wrap justify-center w-[500px] gap-2 text-sm">
          {renderSeats()}
        </div>

        <div className="flex gap-4">
          <div className="space-x-2">
            <span className="border border-green-500 px-2.5"></span>
            <span>Normal</span>
          </div>
          <div className="space-x-2">
            <span className="border border-red-500 px-2.5"></span>
            <span>VIP</span>
          </div>
          <div className="space-x-2">
            <span className="bg-red-800 px-2.5"></span>
            <span>Checked</span>
          </div>
        </div>
      </div>
      <div className="flex-4/12 flex flex-col items-end">
        <div className="flex flex-col space-y-4 bg-black border-slate-700 border rounded-lg p-4 h-fit">
          <div className="flex items-center justify-around">
            <img src={thongTinPhim?.hinhAnh} alt="" width={150} />
            <h3 className="text-3xl font-medium">
              Confirmation Order - {thongTinPhim?.tenPhim}
            </h3>
          </div>

          <span className="w-full border border-slate-700"></span>

          <div className="flex flex-col items-start text-lg">
            <p>Theater: {thongTinPhim?.tenCumRap}</p>
            <p>
              Showtime: {thongTinPhim?.gioChieu}, {thongTinPhim?.ngayChieu}{" "}
            </p>
            <p>Screening Room: {thongTinPhim?.tenRap}</p>
            {chosenSeats ? <p>Chosen Seats: {chosenSeats.join(",")}</p> : <></>}
            <p>Total Price: {totalPrice}</p>
          </div>
          <div className="ml-auto p-4">
            <button onClick={handleConfirmOrder} className="px-4 py-2 bg-red-600 rounded-lg text-2xl font-medium cursor-pointer hover:bg-red-800">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingPage;
