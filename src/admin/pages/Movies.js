import React, { useEffect, useState } from "react";
import MovieTable from "../components/MovieTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../Config";
import { toast } from "react-toastify";

function Movies() {
  const [movieData, setMovieData] = useState([]);

  const getMovies = async () => {
    try {
      const movies = await axios.get(`${config.api}/movies/allmovies`);
      if (movies) {
        setMovieData(movies.data.newmve);
        console.log(movies.data.newmve);
        toast.success("Success");
      } else {
        toast.error("Movies not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movieData);
  return (
    <>
      <div className="flex justify-between mb-2">
        <h3>All Movies</h3>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          to="/add"
        >
          Add Movie
        </Link>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Movie ID</th>
            <th className="px-4 py-2">Movie Name </th>
            <th className="px-4 py-2">Release Date</th>
            <th className="px-4 py-2">Director</th>
            <th className="px-4 py-2">Actor</th>
            <th className="px-4 py-2">Actress</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movieData.map((mve) => (
            <MovieTable key={mve._id} mve={mve} getfn={getMovies} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Movies;
