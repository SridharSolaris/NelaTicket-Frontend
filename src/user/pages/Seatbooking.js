import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";
import { config } from "../../Config";
// import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquare } from "@fortawesome/free-solid-svg-icons";
import "./Seatbooking.css";
import { useNavigate, useParams } from "react-router-dom";

function Seatbooking(props) {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);

  const {id} = useParams();

  const userContextData = useContext(UserContext);
  const email = localStorage.getItem("email");

  function clickable(a) {
    const selectedid = document.getElementById(a).classList;
    if (selectedid.value == "seat") {
      console.log(selectedid);
      setSeats(a);
      console.log(seats);
      selectedid.add("selected");
    } else {
      selectedid.remove("selected");
    }
  }

  const launchRazorPay = () => {
    let options = {
        key:"rzp_test_BRVxWrSVhyKh1m",
        amount: 110*100,
        currency: "INR",
        name: `${userContextData.bookingDetails.mve_name}`,
        description: "Movie purchase on Rental",
        image: `${props.mve_poster}`,
        handler: () => {
            alert("Payment Done")
            const currentBookings = async () => {
              const up = await axios.get(`${config.api}/bookings/booked/`)
              const bookingId = up.data.at(-1)._id;
              console.log(bookingId)
              navigate(`/print/${bookingId}`)
            }
            currentBookings();
            
            
        },
        theme: {color: "#c4242d"}
    };
    let rzp = new window.Razorpay(options);
    rzp.open();
}

  const formik = useFormik({
    initialValues: {
      book_date: userContextData.bookingDetails.book_date,
      theatre_name: userContextData.bookingDetails.theatre_name,
      show_name: userContextData.bookingDetails.show_name,
      ticket_price: userContextData.bookingDetails.ticket,
      seat_count: "",
      seat_numbers: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      try {
        const bookings = await axios.post(`${config.api}/bookings/bookticket/${email}/${id}`, values);
        
        
        console.log(bookings);
    
        
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },    
  });

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
                <div class="seat" id="A3"></div>
                <div class="seat" id="A4"></div>
                <div class="seat" id="A5"></div>
                <div class="seat" id="A6"></div>
                <div class="seat" id="A7"></div>
                <div class="seat" id="A8"></div>
                <div class="seat" id="A9"></div>
                <div class="seat" id="A10"></div>
              </div>

              <div class="seatrow">
                
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat occupied"></div>
                <div class="seat occupied"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat "></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat occupied"></div>
                <div class="seat occupied"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat occupied"></div>
                <div class="seat occupied"></div>
                <div class="seat occupied"></div>
                <div class="seat"></div>
              </div>

              <div class="backrow">
                <div class="seat occupied"></div>
                <div class="seat occupied"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>

              <div class="seatrow">
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
                <div class="seat"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 bg-dark-800 mt-16">
            <form onSubmit={formik.handleSubmit} >
              <table className="table-auto">
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="w-1/4" scope="col">Booking Date</th>
                    <td>
                      <input
                        name="book_date"
                        type="date"
                        className="form-control"
                        value={formik.values.book_date}
                        onChange={formik.handleChange}
                        disabled
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">Theatre Name</th>
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
                    <th className="w-1/4" scope="col">show Name</th>
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
                    <th className="w-1/4" scope="col">Ticket Price</th>
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
                    <th className="w-1/4" scope="col">Number of Seats</th>
                    <td>
                      <input
                        name="seat_count"
                        type="number"
                        className="form-control"
                        value={formik.values.seat_count}
                        onChange={formik.handleChange}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th className="w-1/4" scope="col">Seat Numbers</th>
                    <td>
                      <input
                        name="seat_numbers"
                        type="text"
                        className="form-control"
                        value={formik.values.seat_numbers}
                        onChange={formik.handleChange}
                      ></input>
                    </td>
                  </tr>
                </tbody>
              </table>

              <button type="submit" onClick={launchRazorPay}  className="btn bg-green-500 text-white hover:bg-green-700">
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