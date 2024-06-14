import React from "react";

//components
import Navbar from "../user/components/Navbar/navbar.component";

const UserLayout = (props) => {
    return (
        <>
            <Navbar/>
            {props.children}
        </>
    );
}

export default UserLayout;