import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";

//axios
import axios from "axios";

//HOC
import DefaultHOC from "./HOC/Default.HOC";
import UserHOC from "./HOC/User.HOC";
import AdminHOC from "./HOC/Admin.HOC";

//Component
import HomePage from "./user/pages/Home.page"
import Movie from "./user/pages/Movie.page";
import Plays from "./user/pages/Plays.page";
import Shows from "./user/pages/Shows.page";
import Login from "./user/pages/Login.page";
import SignUp from "./user/pages/SignUp.page";
import MovieTrailer from "./user/pages/MovieTrailer";
import Allmovies from "./user/pages/AllMovies";
import Moviedup from "./user/pages/moviedup";


import Dashboard from "./admin/components/Dashboard";
import Addmovie from "./admin/pages/Addmovie";
import Editmovie from "./admin/pages/Editmovie";
import Bookings from "./admin/pages/Bookings";
import Movies from "./admin/pages/Movies";
import Showsz from "./admin/pages/Shows";
import Query from "./admin/pages/Query";
import Theatre from "./admin/pages/Theatre";
import Users from "./admin/pages/Users";
import Seatbooking from "./user/pages/Seatbooking";
import Mybookings from "./user/pages/MyBookings";
import MovieTicket from "./user/pages/MovieTicket";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


//axios default settings 
axios.defaults.baseURL ="https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params["api_key"] = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <>
    <DefaultHOC path="/" exact Component={HomePage} />

    <UserHOC path="/movie/:id" exact Component={Movie} />
    <UserHOC path="/moviedup/:id" exact Component={Moviedup}/>
    <UserHOC path="/plays" exact Component={Plays} />
    <UserHOC path="/tv/:id" exact Component={Shows} />
    <UserHOC path="/trailer/:id" exact Component={MovieTrailer} />
    <UserHOC path="/allmovies" exact Component={Allmovies} />
    <UserHOC path="/booking/:id" exact Component={Seatbooking} />
    <UserHOC path="/mybookings" exact Component={Mybookings} />
    <UserHOC path="/print/:id" exact Component={MovieTicket} />


    <AdminHOC path="/dashboard" exact Component={Dashboard} />
    <AdminHOC path="/movies" exact Component={Movies} />
    <AdminHOC path="/theatre" exact Component={Theatre} />
    <AdminHOC path="/shows" exact Component={Showsz} />
    <AdminHOC path="/bookings" exact Component={Bookings} />
    <AdminHOC path="/query" exact Component={Query} />
    <AdminHOC path="/users" exact Component={Users} />
    <AdminHOC path="/add" exact Component={Addmovie} />
    <AdminHOC path="/edit/:id" exact Component={Editmovie} />
    
    <Routes>
    <Route path="/login" exact Component={Login} />
    <Route path="/signup" exact Component={SignUp} />
    </Routes>
    </>
  );
}

export default App;
