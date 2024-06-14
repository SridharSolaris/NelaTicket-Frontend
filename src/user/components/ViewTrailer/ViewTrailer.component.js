import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { config } from "../../../Config";
import ViewTrailer2 from "./ViewTrailer2.component";



function ViewTrailer() {
  const [trailerData, setTrailerdata] = useState([]);
  // const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const getTrailer = async () => {
    try {
      const movies = await axios.get(`${config.api}/movies/viewtrailer/${id}`);
      if (movies) {
        setTrailerdata(movies.data.newmve);
       
        //console.log(movieData);
        // toast.success("Success");
      } else {
        setTrailerdata([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrailer();
  }, []);


 
  return( trailerData && trailerData.length > 0?(
        <div className="flex w-full h-full justify-center my-5">
          {trailerData.map((item) => {
            return (
            <div style={{ width: '1000px', height: '560px' }}>
            <ReactPlayer controls width="100%" height="100%" url={item.trailer_link}></ReactPlayer>
            </div>
            );
          })}
        </div>):<ViewTrailer2/>
  )
}

export default ViewTrailer;