import React from "react";
import Card from "./Card";

function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between px-4 my-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <div className="flex flex-start gap-4 mx-4">
        <Card title="Theatre" value="0" color="primary" />
        <Card title="Movies" value="0" color="success" />
        <Card title="Users" value="2" color="info" />
        <Card title="Bookings" value="0" color="warning" />
      </div>
    </>
  );
}

export default Dashboard;