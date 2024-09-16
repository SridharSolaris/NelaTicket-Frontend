import { React, useState } from "react";
import { BiChevronRight, BiStar, BiShareAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import axios from "axios";
import { config } from "../../../Config";

const MovieInfo = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theatre, setTheatre] = useState(false);

  const axiosInstance = axios.create({
    baseURL: config.api,
    params: {
      api_key: {},
    },
  });

  const launchRazorPay = () => {
    let options = {
      key: "rzp_test_BRVxWrSVhyKh1m",
      amount: 500 * 100,
      currency: "INR",
      name: `${props.ot}`,
      description: "Movie purchase on Rental",
      image: `${props.pp}`,
      handler: () => {
        alert("Payment Done");
      },
      theme: { color: "#c4242d" },
    };
    let rzp = new window.Razorpay(options);
    rzp.open();
  };
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div className="container flex flex-col lg:flex-col col-white-500 col-grey-100 text-white">
        <h1 className="font-bold lg:text-4xl">{props.ot}</h1>
        <h1 className="italic font-semibold lg:text-lg ">{props.tl}</h1>
        <div className=" flex items-center">
          <BiStar className="h-6 w-6" />
          <h3 className="font-medium text-2xl">
            {parseFloat(props.r && props.r.toFixed(1))}/10
          </h3>
          <div className="flex items-center mt-1 p-2">
            <p className="text-2sm">{props.vc} Votes</p>
            <BiChevronRight />
          </div>
        </div>
        <div className="flex text-black text-lg italic">
          {props.gen &&
            props.gen.map((genre) => (
              <div
                key={genre.id}
                className="bg-gray-500 font-medium text-sm md:text-lg px-1 md:px-2 my-1 md:my-2 mx-1 md:mx-2 rounded-sm max-w-max"
              >
                &bull; {genre.name}
              </div>
            ))}
        </div>
        <div className="flex text-black text-lg font-medium italic mb-2">
          <div className="bg-green-300 px-1 md:px-3 my-2 md:my-3 mx-1 md:mx-2 text-sm md:text-lg rounded-sm max-w-max">
            &bull; {props.s}
          </div>
          {props.sl &&
            props.sl.map((lan) => (
              <div
                key={lan.iso_639_1}
                className="bg-orange-400 px-2 md:px-3 my-2 mx-2 text-sm md:text-lg rounded-sm max-w-max"
              >
                &bull; {lan.english_name}
              </div>
            ))}
        </div>
        <div className="flex">
          <button
            onClick={async () => {
              if (localStorage.getItem("isAuthenticated")) {
                const response = await axiosInstance.get(
                  `/movies/getmve/${id}`
                );
                if (response.data.message !== "something went wrong") {
                  console.log(response);
                  setTheatre(true);
                  setIsModalOpen(true);
                } else {
                  setTheatre(false);
                  setIsModalOpen(true);
                }
              } else {
                navigate("/login");
              }
            }}
            className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 md:px-8 max-w-max rounded"
          >
            Book Tickets
          </button>
          {console.log(props.id)}
          <button
            onClick={() => navigate(`/trailer/${id}?type=${props.type}`)}
            className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 max-w-max rounded"
          >
            Show Trailer
          </button>
          {isModalOpen && <Modal setOpen={setIsModalOpen} theatre={theatre} />}
        </div>

        <div className="bg-gray-700 my-4 px-4 py-2 gap-8 w-full md:w-58 lg:w-58 rounded-md flex">
          <div className="flex flex-col">
            <h3>Add your rating & review</h3>
            <p> Your ratings matter</p>
          </div>
          <button className="bg-gray-100 text-black font-bold rounded px-4 my-1 ">
            Rate now
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
