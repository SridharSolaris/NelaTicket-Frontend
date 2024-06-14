import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { config } from "../../Config";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import UserContext from '../../context/UserContext';
export default function Modal() {


  const [open, setOpen] = useState(true)
  const { id } = useParams();
  const cancelButtonRef = useRef(null)

  const userContextData = useContext(UserContext);

  const email = localStorage.getItem("email");

  let navigate = useNavigate();

  const [data, setData] = useState([]);

  const [theatre, setTheatre] = useState([]);

  // const [show, setShow] = useState([]);
  // const [price, setPrice] = useState("");

  const getDetails = async () => {
    try {
      const details = await axios.get(`${config.api}/theatres/alldetails`);
      console.log(details);
      if (details) {
        // const data = details.data.newdetails;
        // const data1 = data.filter((a, b) => data.indexOf(a) == b);

        // console.log(data1, data);
        console.log("Success");
        console.log(details.data.showdetails);
        setData(details.data.showdetails);
        setTheatre(details.data.name);

        toast.success("Got the data");
      } else {
        toast.error("Movies not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getTheatres = async () => {
  //   try {
  //     const detail = await axios.get(`${config.api}/theatres/alltheatres`);
  //     console.log(detail);
  //     if (detail) {
  //       // console.log("Success");
  //       console.log(detail.data);
  //       setTheatre(detail.data);

  //       toast.success("Got the data");
  //     } else {
  //       toast.error("Movies not found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getDetails();
    // getTheatres();
  }, []);

  const [moviedata, setMoviedata] = useState({});
  
  useEffect(() => {
    const fetchMovieData = async () => {

        const response = await axios.get(`/movie/${id}`);
        setMoviedata(response.data);
    };
    fetchMovieData();
  }, [id]); // Include id in the dependency array to fetch data when id changes
  console.log({moviedata})




  const formik = useFormik({
    initialValues: {
      book_date: "",
      theatre_name: "",
      show_name: "",
    },

    onSubmit: async (values) => {
      console.log(values);
      try {
        const bookings = await axios.post(
          `${config.api}/bookings/bookticket/${email}/${id}`,
          values
        );
        console.log(bookings);

        userContextData.setBookingDetails(bookings.data);

        navigate(`/booking/${id}`);
      } catch (error) {
        console.log(error);
        // alert(error.response.data.message);
      }
    },
  });



  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form onSubmit={formik.handleSubmit}>
                <table className="table">
                <thead></thead>
                <tbody>
                    <tr>
                    <th scope="col">Choose Date</th>
                    <td>
                        <input
                        name="book_date"
                        type="date"
                        className="form-control"
                        placeholder="dd-mm-yyyy"
                        value={formik.values.book_date}
                        onChange={formik.handleChange}
                        ></input>
                    </td>
                    </tr>

                    <tr>
                    <th scope="col">Choose Show</th>
                    <td>
                        <select
                        className="form-control"
                        name="show_name"
                        id="show"
                        onChange={formik.handleChange}
                        >
                        <option value="">--Please choose an option--</option>
                        {data.map((det) => {
                            console.log(formik.values.show_name);
                            return (
                            <option value={det}>
                                {console.log(det)}
                                {det}
                            </option>
                            );
                        })}
                        </select>
                    </td>
                    </tr>
                    <tr>
                    <th scope="col">Choose theatre</th>
                    <td>
                        <select
                        className="form-control"
                        name="theatre_name"
                        id="theatre"
                        onChange={formik.handleChange}
                        >
                        <option value="">--Please choose an option--</option>
                        {/* <option value={data[0]}>{`Hai ${data}`} </option> */}
                        {console.log(theatre)}
                        {theatre.map((det) => {
                            return (
                            <option value={det}>
                                {console.log(det)}
                                {det}
                            </option>
                            );
                        })}
                        </select>
                    </td>
                    </tr>
                </tbody>
                </table>

                
           
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                <button 
                 type="submit"
                 className="mt-3 inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600 sm:mt-0 sm:w-auto"
                 
                >
                Book Now
                </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
