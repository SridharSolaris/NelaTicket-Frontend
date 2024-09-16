import React, { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { config } from "../../Config";
import axios from "axios";
import MovieTicket from "./MovieTicket";

function PrintTicket() {
  const { id } = useParams();
  const [presentBooking, setPresentBooking] = useState([]);

  const userContextData = useContext(UserContext);
  const email = localStorage.getItem("email");
  console.log(userContextData);

  const currentBookings = async () => {
    const bookedData = await axios.get(`${config.api}/bookings/booked/${id}`);
    setPresentBooking(bookedData.data);
  };

  useEffect(() => {
    currentBookings();
  }, []);

  return (
    <>
      {/* <div class="card mb-3 mt-3"> */}
      <div class="row g-0 d-flex justify-content-center ">
        <div class="col-lg-8">
          <div class="card-body py-5 px-md-5">
            <h3 className="text-center">Booking Details</h3>
            <MovieTicket />
          </div>
          <div className="col-lg-6 d-flex  text-right">
            <table class="table justify-content-center        ">
              <thead></thead>
              <tbody>
                <tr>
                  <th scope="col">Movie Name </th>
                  <td>{userContextData.bookingDetails.mve_name}</td>
                </tr>
                <tr>
                  <th scope="col">Theatre Name</th>
                  <td>{userContextData.bookingDetails.theatre_name}</td>
                </tr>
                <tr>
                  <th scope="col">Show details</th>
                  <td>{userContextData.bookingDetails.show_name}</td>
                </tr>
                <tr>
                  <th scope="col">Booking Date</th>
                  <td>{userContextData.bookingDetails.show_date}</td>
                </tr>
                <tr>
                  <th scope="col">Number of seats</th>
                  <td>{presentBooking.seat_count}</td>
                </tr>
                <tr>
                  <th scope="col">Seat Number</th>
                  <td>{presentBooking.seat_numbers}</td>
                </tr>
                <tr>
                  <th scope="col">Amount</th>
                  <td>{presentBooking.ticket_price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default PrintTicket;
