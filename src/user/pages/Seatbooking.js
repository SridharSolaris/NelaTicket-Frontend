import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import { config } from "../../Config";
import "./Seatbooking.css";
import { useNavigate, useParams } from "react-router-dom";

function Seatbooking(props) {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const { id } = useParams();
  const userContextData = useContext(UserContext);
  const email = localStorage.getItem("email");

  const axiosInstance = axios.create({
    baseURL: config.api,
    // You can add other default configurations like headers if needed
  });

  console.log(props.mve_poster);

  function clickable(a) {
    const selectedid = document.getElementById(a).classList;
    if (selectedid.value == "seat") {
      console.log(selectedid);
      setSeats((prevSeats) => [...prevSeats, a]);
      console.log(seats);
      selectedid.add("selected");
    } else {
      setSeats((prevSeats) => prevSeats.filter((seat) => seat !== a));
      selectedid.remove("selected");
    }
  }

  const launchRazorPay = () => {
    let options = {
      key: "rzp_test_bBK2a1SPnIJzWK",
      amount: 110 * 100 * seats.length,
      currency: "INR",
      name: `Book ${userContextData.bookingDetails.mve_name}`,
      description: "Movie purchase on Rental",
      image: userContextData.bookingDetails.mve_poster,
      handler: () => {
        alert("Payment Done");
        const currentBookings = async () => {
          const up = await axiosInstance.get(`/bookings/booked/`);
          const bookingId = up.data.at(-1)._id;
          console.log(up);
          navigate(`/print/${bookingId}`);
        };
        currentBookings();
      },
      theme: { color: "#c4242d" },
    };
    console.log(options);
    let rzp = new window.Razorpay(options);
    rzp.open();
  };
  console.log(userContextData.bookingDetails);
  const formik = useFormik({
    initialValues: {
      show_date: userContextData.bookingDetails.show_date,
      theatre_name: userContextData.bookingDetails.theatre_name || "",
      show_name: userContextData.bookingDetails.show_name || "",
      ticket_price: userContextData.bookingDetails.ticket * seats.length || 0,
      seat_count: seats.length,
      seat_numbers: seats.join(","),
      book_date: new Date().toISOString().split("T")[0],
    },
    onSubmit: async (values) => {
      try {
        const bookings = await axiosInstance.post(
          `/bookings/bookticket/${email}/${id}`,
          { ...values, seat_numbers: seats.join(","), seat_count: seats.length }
        );
        console.log(bookings);
        launchRazorPay();
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });

  const handleSeatChange = (seats) => {
    formik.setFieldValue("seat_count", seats.length);
    formik.setFieldValue("seat_numbers", seats.join(","));
    formik.setFieldValue(
      "ticket_price",
      userContextData.bookingDetails.ticket * seats.length
    );
  };

  useEffect(() => {
    handleSeatChange(seats);
  }, [seats]);

  return (
    <section>
      <div className="flex justify-center mt-5">
        <h3>{`Movie : ${userContextData.bookingDetails.mve_name}`}</h3>
      </div>

      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div class="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div class="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div class="screen"></div>

            <div className="allseats">
              <div className="col-numbers">
                <div className="colnumber">1</div>
                <div className="colnumber">2</div>
                <div className="colnumber">3</div>
                <div className="colnumber">4</div>
                <div className="colnumber">5</div>
                <div className="colnumber">6</div>
                <div className="colnumber">7</div>
                <div className="colnumber">8</div>
                <div className="colnumber">9</div>
                <div className="colnumber">10</div>
              </div>

              <div className="row-numbers">
                <div className="rownumber">A</div>
                <div className="rownumber">B</div>
                <div className="rownumber">C</div>
                <div className="rownumber">D</div>
                <div className="rownumber">E</div>
                <div className="rownumber">F</div>
                <div className="rownumber">G</div>
                <div className="rownumber">H</div>
                <div className="rownumber">I</div>
                <div className="rownumber">J</div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A1");
                  }}
                  id="A1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A2");
                  }}
                  id="A2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A3");
                  }}
                  id="A3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A4");
                  }}
                  id="A4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A5");
                  }}
                  id="A5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A6");
                  }}
                  id="A6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A7");
                  }}
                  id="A7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A8");
                  }}
                  id="A8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A9");
                  }}
                  id="A9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("A10");
                  }}
                  id="A10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B1");
                  }}
                  id="B1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B2");
                  }}
                  id="B2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B3");
                  }}
                  id="B3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B4");
                  }}
                  id="B4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B5");
                  }}
                  id="B5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B6");
                  }}
                  id="B6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B7");
                  }}
                  id="B7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B8");
                  }}
                  id="B8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B9");
                  }}
                  id="B9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("B10");
                  }}
                  id="B10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C1");
                  }}
                  id="C1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C2");
                  }}
                  id="C2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C3");
                  }}
                  id="C3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C4");
                  }}
                  id="C4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C5");
                  }}
                  id="C5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C6");
                  }}
                  id="C6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C7");
                  }}
                  id="C7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C8");
                  }}
                  id="C8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C9");
                  }}
                  id="C9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("C10");
                  }}
                  id="C10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D1");
                  }}
                  id="D1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D2");
                  }}
                  id="D2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D3");
                  }}
                  id="D3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D4");
                  }}
                  id="D4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D5");
                  }}
                  id="D5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D6");
                  }}
                  id="D6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D7");
                  }}
                  id="D7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D8");
                  }}
                  id="D8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D9");
                  }}
                  id="D9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("D10");
                  }}
                  id="D10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E1");
                  }}
                  id="E1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E2");
                  }}
                  id="E2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E3");
                  }}
                  id="E3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E4");
                  }}
                  id="E4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E5");
                  }}
                  id="E5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E6");
                  }}
                  id="E6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E7");
                  }}
                  id="E7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E8");
                  }}
                  id="E8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E9");
                  }}
                  id="E9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("E10");
                  }}
                  id="E10"
                ></div>
              </div>

              <div class="backrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F1");
                  }}
                  id="F1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F2");
                  }}
                  id="F2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F3");
                  }}
                  id="F3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F4");
                  }}
                  id="F4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F5");
                  }}
                  id="F5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F6");
                  }}
                  id="F6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F7");
                  }}
                  id="F7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F8");
                  }}
                  id="F8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F9");
                  }}
                  id="F9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("F10");
                  }}
                  id="F10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G1");
                  }}
                  id="G1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G2");
                  }}
                  id="G2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G3");
                  }}
                  id="G3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G4");
                  }}
                  id="G4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G5");
                  }}
                  id="G5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G6");
                  }}
                  id="G6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G7");
                  }}
                  id="G7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G8");
                  }}
                  id="G8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G9");
                  }}
                  id="G9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("G10");
                  }}
                  id="G10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H1");
                  }}
                  id="H1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H2");
                  }}
                  id="H2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H3");
                  }}
                  id="H3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H4");
                  }}
                  id="H4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H5");
                  }}
                  id="H5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H6");
                  }}
                  id="H6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H7");
                  }}
                  id="H7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H8");
                  }}
                  id="H8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H9");
                  }}
                  id="H9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("H10");
                  }}
                  id="H10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I1");
                  }}
                  id="I1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I2");
                  }}
                  id="I2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I3");
                  }}
                  id="I3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I4");
                  }}
                  id="I4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I5");
                  }}
                  id="I5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I6");
                  }}
                  id="I6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I7");
                  }}
                  id="I7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I8");
                  }}
                  id="I8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I9");
                  }}
                  id="I9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("I10");
                  }}
                  id="I10"
                ></div>
              </div>

              <div class="seatrow">
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J1");
                  }}
                  id="J1"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J2");
                  }}
                  id="J2"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J3");
                  }}
                  id="J3"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J4");
                  }}
                  id="J4"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J5");
                  }}
                  id="J5"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J6");
                  }}
                  id="J6"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J7");
                  }}
                  id="J7"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J8");
                  }}
                  id="J8"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J9");
                  }}
                  id="J9"
                ></div>
                <div
                  class="seat"
                  onClick={() => {
                    clickable("J10");
                  }}
                  id="J10"
                ></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-dark-800 mt-16">
            <form onSubmit={formik.handleSubmit}>
              <table className="table-auto">
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Show Date
                    </th>
                    <td>
                      <input
                        name="show_date"
                        type="date"
                        className="form-control"
                        value={formik.values.show_date}
                        onChange={formik.handleChange}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Theatre Name
                    </th>
                    <td>
                      <input
                        name="theatre_name"
                        type="text"
                        className="form-control"
                        value={formik.values.theatre_name}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      show Name
                    </th>
                    <td>
                      <input
                        name="show_name"
                        type="text"
                        className="form-control"
                        value={formik.values.show_name}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Ticket Price
                    </th>
                    <td>
                      <input
                        name="ticket_price"
                        type="text"
                        className="form-control"
                        value={formik.values.ticket_price}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Number of Seats
                    </th>
                    <td>
                      <input
                        name="seat_count"
                        type="number"
                        className="form-control"
                        value={formik.values.seat_count}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Seat Numbers
                    </th>
                    <td>
                      <input
                        name="seat_numbers"
                        type="text"
                        className="form-control"
                        value={formik.values.seat_numbers}
                        onChange={handleSeatChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">
                      Booked on
                    </th>
                    <td>
                      <input
                        name="book_date"
                        type="text"
                        className="form-control"
                        value={formik.values.book_date}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button
                type="submit"
                className="btn bg-green-500 text-white hover:bg-green-700"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Seatbooking;
