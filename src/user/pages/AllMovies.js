import axios from "axios";
import React, { useEffect, useState } from "react";
import {config} from "../../Config";
import Poster from "../components/Poster/poster.component";
import { useNavigate } from "react-router-dom";

function Allmovies() {
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
  const getMovies = async () => {
    try {
      const movies = await axios.get(`${config.api}/movies/allmovies`);
      if (movies) {
        setMovieData(movies.data.newmve);
        console.log(movies.data.newmve);
        // toast.success("Success");
      } else {
        // toast.error("Movies not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
    <div className="w-full lg:flex lg:flex-row-reverse">
      <div className="w-8/12">
        <h2 className="text-2xl font-bold mb-4">All Movies</h2>
        <div className="flex flex-wrap">
            {movieData.map((movie) => (
                <div className="w-1/2 md:w-1/3 my-3 lg:w-1/4">
                    <Poster 
                    id={movie._id}
                    poster_path={movie.mve_poster}
                    title={movie.mve_name}
                    subtitle={movie.vote_average}
                    path="moviedup"
                    />
                    <button
                    onClick={() =>
                        navigate(`/moviedup/${movie._id}`)
                    }
                    className="btn btn-primary">
                        View Details
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Allmovies;