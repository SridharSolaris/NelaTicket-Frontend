import React, { useContext, useEffect, useState } from "react";
import MovieHero from "../components/MovieHero/MovieHero.component";
import { BiMoviePlay } from "react-icons/bi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import {FaCcVisa} from 'react-icons/fa';
import Cast from "../components/Cast/Cast.component";
import PosterSlider from "../components/PosterSlider/PosterSlider.component";


const Movie = () => {

  const settings = {
    infinite: true,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    InitialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
};




  const [moviedata, setMoviedata] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const [cast,setCast] = useState([]);
  const [crew,setCrew] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    const fetchMovieData = async () => {

        const response = await axios.get(`/movie/${id}`);
        
        setMoviedata(response.data);
    };
    fetchMovieData();
  }, [id]); // Include id in the dependency array to fetch data when id changes
  console.log({moviedata})
  
  useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get(`/movie/${id}/similar`);
      setPopularMovies(getPopularMovies.data.results)
    };
    requestPopularMovies();
  },[]);
  console.log(popularMovies);
  useEffect(() => {
    const requestCast = async () => {
      const getCast = await axios.get(`/movie/${id}/credits`);
      setCast(getCast.data.cast)
      setCrew(getCast.data.crew)
    };
    requestCast();
  },[]);
  console.log(cast)
  console.log(crew);
  return (
    <>
      <div>
        <MovieHero bp={moviedata.backdrop_path} sl={moviedata.spoken_languages} s={moviedata.status} r={moviedata.vote_average} vc={moviedata.vote_count} ot={moviedata.title} pp={moviedata.poster_path} gen={moviedata.genres} tl = {moviedata.tagline} id={id} type='movie' />
        <div className="my-12 container sm:mx-auto px-4 lg:w-1/2 lg:ml-40">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-gray-800 font-bold text-2xl">About the movie</h2>
            <p>{moviedata.overview}</p> {/* Use overview from moviedata */}
          </div>

          <div className="my-8">
            <hr />
          </div>

          <div className="flex flex-col items-start my-8 gap-3">
            <h2 className="text-gray-800 font-bold text-2xl">Applicable Offers</h2>
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex item-start gap-2 bg-yellow-100 border-yellow-400 border-dashed border-2 p-3 rounded-md md:w-96">
                <div className="w-8 h-8">
                  <FaCcVisa className="w-full h-full"/>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-gray-700 text-lg">Visa Stream Offer</h3>
                  <p className="text-gray-600 text-sm">Get 50% upto INR on all Visa cards* on NelaTicket Stream</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-yellow-100 border-yellow-400 border-dashed border-2 rounded-md p-3 md:w-96">
                <div className="w-8 h-8">
                  <BiMoviePlay className="w-full h-full" />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-gray-900 text-lg">Filmy Pass</h3>
                  <p className="text-gray-600 text-sm">
                    Get Rs.75* off on 3 movies you buy/rent on Stream. Buy Filmy Pass @Rs.99
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-8">
            <hr />
          </div>

          <div className="my-8">
            <PosterSlider 
              config = {settings}
              images={cast} 
              title="Cast"  
              isDark = {false}
              cast
              isCircle />
          </div>
          
          <div className="my-8">
            <PosterSlider 
              config = {settings}
              images={crew} 
              title="Crew"  
              isDark = {false}
              cast
              isCircle />
          </div>

          <div className="my-8">
            <PosterSlider 
              config = {settings}
              images={popularMovies} 
              title="Recommended"  
              isDark = {false} />
          </div>
        </div>
           
      </div>  
          
    </>
  );
};


export default Movie;

