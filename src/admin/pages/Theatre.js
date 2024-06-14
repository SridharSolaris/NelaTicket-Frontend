import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { config } from "../../Config";

function Theatre() {
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      theatre_name: "",
      theatre_location: "",
      theatre_capacity: "",
    },
    validationSchema: yup.object({
      theatre_name: yup.string().required().min(5),
      theatre_location: yup.string().required().min(3),
      theatre_capacity: yup.number().required().max(1000),
    }),

    onSubmit: async (values) => {
      try {
        const addtheatre = await axios.post(
          `${config.api}/theatres/create`,
          values
        );
        toast.success("Theatre added Successfully");
        getTheatres();
        formik.resetForm();
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });

  const getTheatres = async () => {
    try {
      const theatres = await axios.get(`${config.api}/theatres/listtheatres`);
      if (theatres) {
        setTheatres(theatres.data.newTheatres);
      } else {
        alert("Theatres not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheatres();
  }, []);

  return (
    <>
      <div className="container">
        <div className="flex">
          <div className="flex-1 pr-3">
            <h3>Theatres</h3>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Theatre ID</th>
                  <th scope="col">Theatre Name </th>
                  <th scope="col">Location</th>
                  <th scope="col">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {theatres.map((hall, index) => (
                  <tr key={index}>
                    <td>{hall._id}</td>
                    <td>{hall.theatre_name}</td>
                    <td>{hall.theatre_location}</td>
                    <td>{hall.theatre_capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-1">
            <h3>Add New Theatre</h3>
            <form onSubmit={formik.handleSubmit}>
              <label className="block">Theatre Name</label>
              <input
                name="theatre_name"
                type="text"
                className="form-input mt-1 block w-full"
                value={formik.values.theatre_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.theatre_name && formik.errors.theatre_name && (
                <p className="text-red-500">{formik.errors.theatre_name}</p>
              )}

              <label className="block mt-4">Theatre Location</label>
              <input
                name="theatre_location"
                type="text"
                className="form-input mt-1 block w-full"
                value={formik.values.theatre_location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.theatre_location &&
                formik.errors.theatre_location && (
                  <p className="text-red-500">{formik.errors.theatre_location}</p>
                )}

              <label className="block mt-4">Theatre Capacity</label>
              <input
                name="theatre_capacity"
                type="text"
                className="form-input mt-1 block w-full"
                value={formik.values.theatre_capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.theatre_capacity &&
                formik.errors.theatre_capacity && (
                  <p className="text-red-500">{formik.errors.theatre_capacity}</p>
                )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Save theatre
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Theatre;
