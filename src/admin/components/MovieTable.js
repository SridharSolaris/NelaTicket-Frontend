import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { config } from "../../Config";
import { toast } from "react-toastify";

function MovieTable({ mve, getfn }) {
  console.log(mve);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    try {
      const delmve = await axios.delete(`${config.api}/movies/delmve/${id}`);
      console.log("Delete response:", delmve);
      toast.success(delmve.data.message);
      getfn();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete movie.");
    }
  }
};


  return (
    <tr>
      <td>{mve._id}</td>
      <td>{mve.mve_name}</td>
      <td>{mve.release_date}</td>
      <td>{mve.director}</td>
      <td>{mve.actor}</td>
      <td>{mve.actress}</td>
      <td>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          to={`/moviedup/${mve._id}`}
        >
          View
        </Link>
        <Link
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-1"
          to={`/edit/${mve._id}`}
        >
          Edit
        </Link>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-1"
          onClick={() => handleDelete(mve._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default MovieTable;
