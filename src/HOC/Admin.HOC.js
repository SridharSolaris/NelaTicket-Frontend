import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/Admin.layout";

const AdminHOC = ({ Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        Component={(props) => (
          <AdminLayout>
            <Component {...props} />
          </AdminLayout>
        )}
      />
    </Routes>
  );
};

export default AdminHOC;
