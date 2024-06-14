import React, { useContext } from "react";
import {BiChevronRight, BiSearch, BiChevronDown, BiMenu} from "react-icons/bi";
import NelaTicket from '../../../NELATICKET.svg';
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";

const NavSm = () => {
    return (
        <>
            <div className="text-white flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold">NelaTicket.com</h3>
                    <span className="text-gray-400 text-xs flex items-center">
                        Kakinada <BiChevronRight/>
                    </span>
                </div>
                <div className="w-16 h-12 flex items-center flex-end gap-2">
                    <BiSearch className="w-full h-full"/>
                    <BiMenu className="w-full h-full" />
                </div>
            </div>
        </>
    )
};

const NavMd = () => {
    return (
    <>
        <div className="w-full flex items-center bg-white gap-3 px-3 py-2 rounded-md">
            <BiSearch/>
            <input type="search" className="w-full focus:outline-none" placeholder="Search for movies, events, plays, sports and activities "/>
        </div>
        <div className="text-white flex items-center justify-between px-2">
        <BiMenu className="w-12 h-12" />
        </div>
    </>
    )
};

const NavLg = () => {
    const navigate = useNavigate();

    const userContextData = useContext(UserContext);

   


// Example: Check local storage for authentication state
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
userContextData.setIsvisible(isAuthenticated);

    const home = () => {
        userContextData.setIsvisible(false);
        localStorage.clear();
        navigate("/");
    };

    return(
        <>
        <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center w-1/2">
                <div className="w-36 h-8 mb-4">
                    <a href="/">
                    <img 
                    src={NelaTicket} 
                    alt="logo" 
                    className="w-full h-24 pb-4" /></a>
                </div>
                <div className="w-full flex items-center bg-white gap-3 rounded-lg">
                    <BiSearch className="ml-4 w-4"/>
                    <input type="search" className="w-full focus:outline-none rounded-sm h-10" placeholder="Search for movies, events, plays, sports and activities "/>
                </div>
            </div>
            <div className="">
            <NavLink
            className="rounded-md px-2 py-2 text-red-700 font-medium hover:bg-indigo-300 hover:text-slate-900 active:text-slate-100"
            to={"/"}
            >
                Home
            </NavLink>
            
            <NavLink
            className="rounded-md px-3 py-2 text-red-700 font-medium hover:bg-indigo-300 hover:text-slate-900"
            to={"/allmovies"}
            >
                All Movies
            </NavLink>
            <NavLink
            className="rounded-md px-3 py-2 text-red-700 font-medium hover:bg-indigo-300 hover:text-slate-900"
            to={"/plays"}
            >
                TV Series
            </NavLink>
            {userContextData.isvisible ? (
                  <>
                    <NavLink
                    className="rounded-lg px-3 py-2 text-red-700 font-medium hover:bg-indigo-300 hover:text-slate-900"
                    to={"/mybookings"}
                    >
                        My Bookings
                    </NavLink>
                   </>):(null)
            }
            </div>
            <div className="flex items-center gap-2">
            {userContextData.isvisible ? (
                  <>
                      <NavLink className="nav-link" to={"/"}>
                        <span className="text-gray-300">
                          {localStorage.getItem('name')}
                        </span>
                      </NavLink>
                    <button
                      className="bg-red-600 text-white text-xs rounded-sm px-2 py-1"
                      onClick={() => home()}
                      type={"submit"}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                    onClick={() =>
                        navigate(`/login`)
                    }
                    className="bg-red-600 text-white text-xs rounded px-2 py-1">
                        Sign In
                    </button>
                  </>
                )}

                <div className="w-8 h-8 text-white">
                    {/* <BiMenu className="w-full h-full" /> */}
                </div>
            </div>
        </div>
        </>
    )
};

const Navbar = () => {
    
    return (
        <>
            <nav className="bg-indigo-950 px-4 py-2">
                <div className="md:hidden">{
                    /*Mobile Screen*/
                    <NavSm/>
                }</div>
                <div className="hidden lg:hidden md:flex">{
                    /*Tablet Screen*/
                    <NavMd/>
                }</div>
                <div className="hidden lg:flex">{
                    /*Desktop Screen*/
                    <NavLg/>
                }</div>
            </nav>
        </>
    )
};

export default Navbar;
