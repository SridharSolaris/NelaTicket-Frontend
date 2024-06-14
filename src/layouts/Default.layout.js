import React from "react";

//components
import Navbar from "../user/components/Navbar/navbar.component";
import HeroCarousel from "../user/components/HeroCarousel/HeroCarousel.component";

const DefaultLayout = (props) => {
    return (
        <>
            <Navbar/>
            <HeroCarousel/>
            {props.children}
        </>
    );
}

export default DefaultLayout;