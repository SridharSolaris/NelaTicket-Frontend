import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
function ViewTrailer2() {
  const [trailerData, setTrailerData] = useState([]);
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type');
  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(`/${type}/${id}/videos`);
        setTrailerData(response.data.results);
      } catch (error) {
        console.log("Error fetching trailer data:", error);
      }
    };

    getTrailer();
  }, [id]);

  const trailers = trailerData.filter(item => item.type === 'Trailer');

  return (
    <>
      <div className="flex h-full w-full justify-center my-5">
        {trailers.length > 0 && (
          <div style={{ width: '1000px', height: '560px' }}>
            <ReactPlayer
              controls
              width="100%"
              height="100%"
              url={`https://www.youtube.com/watch?v=${trailers[0].key}`}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ViewTrailer2;
