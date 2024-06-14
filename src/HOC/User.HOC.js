import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/User.layout";

const UserHOC = ({ Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        Component={(props) => (
          <UserLayout>
            <Component {...props} />
          </UserLayout>
        )}
      />
    </Routes>
  );
};

export default UserHOC;
