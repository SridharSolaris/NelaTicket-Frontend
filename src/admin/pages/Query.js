import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../Config";

function Query() {
  const [message, setMessage] = useState([]);

  const getMsg = async () => {
    try {
      const msg = await axios.get(`${config.api}/user/getcontact`);
      if (msg) {
        setMessage(msg.data.newcontact);
        console.log(msg.data.newcontact);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMsg();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-2">
        <h3>Query</h3>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-sm"
          to="/movies"
        >
          Back
        </Link>
      </div>

      <table className="table-auto">
        <thead>
          <tr className="bg-primary">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone number</th>
            <th className="px-4 py-2">Email ID</th>
            <th className="px-4 py-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {message.map((msg, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{msg.username}</td>
              <td className="border px-4 py-2">{msg.ph_no}</td>
              <td className="border px-4 py-2">{msg.email}</td>
              <td className="border px-4 py-2">{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Query;
