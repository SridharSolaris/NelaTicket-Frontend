import NelaTicket2 from "../../NELATICKET2.svg";
import React, { useContext } from "react";
import "./login.css";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import * as Yup from "yup";
import {config} from "../../Config";

export default function Login() {

  let navigate = useNavigate();
  const userContextData = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email().required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        let login = await axios.post(`${config.api}/user/login`, values);
        if (login.data.token) {
          localStorage.setItem("token", login.data.token);
          localStorage.setItem("email", login.data.email);
          localStorage.setItem("role", login.data.role);
          localStorage.setItem("name", login.data.name);
          userContextData.setmailid(login.data.email);
          userContextData.setUser(login.data.name);
          const role = await localStorage.getItem("role");
          console.log(role);
          
          localStorage.setItem('isAuthenticated', 'true');
          // Example: Check local storage for authentication state
          



          {
            role == "admin" ? navigate("/dashboard") : navigate("/");
          }
          userContextData.setIsvisible(true);
        } else {
          alert(login.data.message);
          // navigate("/auth/login");
          userContextData.setIsvisible(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-56 w-auto"
            src={NelaTicket2}
            alt="Your Company"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Enter Email"  
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.email ? (
                          <span style={{ color: "red" }}>
                            {formik.errors.email}
                          </span>
                        ) : null}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="Enter Password..."
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formik.errors.password ? (
                          <span style={{ color: "red" }}>
                            {formik.errors.password}
                          </span>
                        ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an Account?{' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
