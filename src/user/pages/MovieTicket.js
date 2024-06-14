// MovieTicket.js
import React from "react";
import { useEffect,useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import {config} from '../../Config';
import UserContext from "../../context/UserContext";
import G from '../../G.png';

const MovieTicket = () => {
    const ticketRef = useRef();
    const {id} = useParams();
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
    }, [id]); 
    console.log(presentBooking);

    const generatePdf = async () => {
        try {
            const canvas = await html2canvas(ticketRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(G, "PNG", 10, 10, 0, 100);
            pdf.addImage(imgData, "PNG", 10, 10, 300, 100);
            pdf.save("movie_ticket.pdf");
            
        } 
        catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

  return (
    <>
    <div ref={ticketRef} class="row g-0 d-flex justify-content-center ">
          <div class="col-lg-8">
            <div class="card-body py-5 px-md-5">
                <h3 className="text-lg text-red-500">Your Movie Ticket</h3>
            </div>
            <div className="col-lg-6 d-flex  text-right">
              <table class="table justify-content-center        ">
                <thead></thead>
                <tbody>
                  <tr>
                    <th scope="col">Movie Name </th>
                    <td>{presentBooking.mve_name}</td>
                  </tr>
                  <tr>
                    <th scope="col">Theatre Name</th>
                    <td>{presentBooking.theatre_name}</td>
                  </tr>
                  <tr>
                    <th scope="col">Show details</th>
                    <td>{presentBooking.show_name}</td>
                  </tr>
                  <tr>
                    <th scope="col">Booking Date</th>
                    <td>{presentBooking.book_date}</td>
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
        <button onClick={generatePdf} className="bg-blue-500 p-2 rounded-md mx-auto items-center justify-center flex ">Download Ticket</button>
    </>
  );
};

export default MovieTicket;
