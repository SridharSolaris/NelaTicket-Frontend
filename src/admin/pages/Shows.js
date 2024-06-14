import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { config } from "../../Config";
import { toast } from "react-toastify";

function Shows() {
  const [show, setShow] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      show_name: "",
      show_time: "",
      end_time: "",
      theatre_name: "",
      ticket_price: "",
    },
    validationSchema: yup.object({
      show_name: yup.string().required().min(5),
      show_time: yup.string().required(),
      end_time: yup.string().required(),
      theatre_name: yup.string().required(),
      ticket_price: yup.number().required().min(50),
    }),

    onSubmit: async (values) => {
      try {
        const addshow = await axios.post(
          `${config.api}/theatres/addshow`,
          values
        );
        toast.success(addshow.data.message);
        getShow();
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });

  const getShow = async () => {
    try {
      const shows = await axios.get(`${config.api}/theatres/allshows`);
      if (shows) {
        setShow(shows.data.newshow);
      } else {
        alert("Shows not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex justify-between mb-2">
          <h3>Shows</h3>
          <button
            onClick={() => navigate("/movies")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm"
          >
            Back
          </button>
        </div>

        <div className="flex">
          <div className="flex-1 pr-3">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Show Name</th>
                  <th className="px-4 py-2">Show Time </th>
                  <th className="px-4 py-2">End Time</th>
                  <th className="px-4 py-2"> Theatre</th>
                  <th className="px-4 py-2">Ticket Price</th>
                </tr>
              </thead>
              <tbody>
                {show.map((show, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{show.show_name}</td>
                    <td className="border px-4 py-2">{show.show_time}</td>
                    <td className="border px-4 py-2">{show.end_time}</td>
                    <td className="border px-4 py-2">{show.theatre_name}</td>
                    <td className="border px-4 py-2">{show.ticket_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-1">
            <h3>Add Show</h3>
            <form onSubmit={formik.handleSubmit}>
              <label>Show Name</label>
              <br />
              <input
                name="show_name"
                type="text"
                className="form-control"
                value={formik.values.show_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.show_name && formik.errors.show_name
                ? formik.errors.show_name
                : null}
              <br />
              <label>Show Timing</label>
              <br />
              <input
                name="show_time"
                type="time"
                className="form-control"
                value={formik.values.show_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.show_time && formik.errors.show_time
                ? formik.errors.show_time
                : null}
              <br />
              <label>End Time</label>
              <br />
              <input
                name="end_time"
                type="time"
                className="form-control"
                value={formik.values.end_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.end_time && formik.errors.end_time
                ? formik.errors.end_time
                : null}
              <br />
              <label>Select Theatre</label>
              <br />
              <input
                name="theatre_name"
                type="text"
                className="form-control"
                value={formik.values.theatre_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.theatre_name && formik.errors.theatre_name
                ? formik.errors.theatre_name
                : null}
              <br />
              <label>Ticket Price</label>
              <br />
              <input
                name="ticket_price"
                type="text"
                className="form-control"
                value={formik.values.ticket_price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></input>
              {formik.touched.ticket_price && formik.errors.ticket_price
                ? formik.errors.ticket_price
                : null}
              <br />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Show
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shows;
