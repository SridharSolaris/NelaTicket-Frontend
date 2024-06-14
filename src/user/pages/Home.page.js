import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import EntertainmentCardSlider from "../components/Entertainment/Entertainmentcard.component";
import PosterSlider from "../components/PosterSlider/PosterSlider.component";
import axios from"axios";
import showPosterSlider from "../components/PosterSlider/showPosterSlider.component";
import {config} from "../../Config"
import Poster from "../components/Poster/poster.component";
import DPosterSlider from "../components/PosterSlider/DPosterSlider";
import Pre from "../../PREMIERE.png"

const HomePage = () => {

  const navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcommingMovies, setUpcommingMovies] = useState([]);
  const [tvSeries, setTvSeries] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get("/movie/popular");
      setPopularMovies(getPopularMovies.data.results)
    };
    requestPopularMovies();

    const requestUpcommingMovies = async () => {
      const getUpcommingMovies = await axios.get('/movie/upcoming');
      setUpcommingMovies(getUpcommingMovies.data.results);
    };
    requestUpcommingMovies();
    
    const requestTvSeries = async () => {
      const getTvSeries = await axios.get('/tv/popular');
      setTvSeries(getTvSeries.data.results);
    };
    requestTvSeries();

    const requestRecentMovies = async () => {
      const getRecentMovies = await axios.get(`${config.api}/movies/allmovies`);
      setRecentMovies(getRecentMovies.data.newmve);
    };
    requestRecentMovies();
  },[]);
  

  console.log({popularMovies});

  const [movieData, setMovieData] = useState([]);
  const getMovies = async () => {
    try {
       const movies = await axios.get(`${config.api}/movies/allmovies`);
       if (movies) {
          setMovieData(movies.data);
          console.log(movies.data);
       } else  {
        // toast.error("Movies not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movieData);
  useEffect(() => {
    getMovies();
  }, []);
  

  return (
    <>
    <div className="flex flex-col gap-10">

    <div className="container mx-auto px-4">
      <DPosterSlider
      images={recentMovies}
      title="Recently Added"
      isDark={false}
      />
    </div>

    <div className="bg-navCol-200 py-16">
      <div className="container mx-auto px-4">
      <div className="flex">
        <img src={Pre} 
        alt="Rupay"
        className="w-full h-full"
        />
      </div>
        <PosterSlider 
        images={popularMovies} 
        title="Premieres" 
        subtitle="Brand New Releases Every Friday" 
        isDark />
      </div>
    </div>
    </div>

    <div className="container mx-auto px-4">
      <PosterSlider
      images={upcommingMovies}
      title="Online Streaming Events"
      isDark={false}
      />
    </div>

    <div className="container mx-auto px-4">
      <showPosterSlider
      images={tvSeries}
      title="TV Series"
      isDark={false}
      />
    </div>

    </>
  )
}

export default HomePage;
