import NelaTicket2 from "../../NELATICKET2.svg";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {config} from "../../Config";

export default function SignUp() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    validate: (values) => {
      let errors = {};
      let pattern = new RegExp(/^[a-zA-Z\-]+$/);
      if (!values.username) {
        errors.username = "Please enter the name";
      } else if (values.username.length < 5) {
        errors.username = "Length should be more than 5 Characters";
      } else if (values.username.length > 20) {
        errors.username = "Length should be less than 20 Characters";
      } else if (!pattern.test(formik.values.username)) {
        errors.username = "Enter the valid Name";
      }

      if (!values.email) {
        errors.email = "Please enter your email address";
      }
      if (!values.password1) {
        errors.salary = "Please enter the password";
      } else if (values.password1.length < 8) {
        errors.password1 = "Length should be more than 8 Characters";
      }
      if (!values.password2) {
        errors.password2 = "Please enter the password";
      } else if (values.password1 != values.password2) {
        errors.password2 = "Password does not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(
          `${config.api}/user/register`,
          values
        );
        console.log(register.data);
        alert(register.data.message);
        navigate("/login");
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  });
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-56 w-auto"
            src={NelaTicket2}
            alt="Your Company"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type={"text"}
                  name={"username"}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Enter your name"
                  id="name"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.username ? (
                    <span style={{ color: "red" }}>
                      {" "}
                      {formik.errors.username}
                    </span>
                    ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter Email Address..."
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.email ? (
                    <span style={{ color: "red" }}> {formik.errors.email}</span>
                  ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name={"password1"}
                  onChange={formik.handleChange}
                  value={formik.values.password1}
                  placeholder="Enter Password"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.password1 ? (
                    <span style={{ color: "red" }}>
                      {" "}
                      {formik.errors.password1}
                    </span>
                  ) : null}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name={"password2"}
                  onChange={formik.handleChange}
                  value={formik.values.password2}
                  placeholder="Confirm Password"
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.password2 ? (
                    <span style={{ color: "red" }}>
                      {" "}
                      {formik.errors.password2}
                    </span>
                  ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
