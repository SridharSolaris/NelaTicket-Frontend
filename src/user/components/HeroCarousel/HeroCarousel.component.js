import React , {useState,useEffect} from "react";
import HeroSlider from "react-slick";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

//component
import {NextArrow, PrevArrow} from "./Arrows.component";



import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroCarousel = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const requestNowPlayingMovies = async() => {
            const getImages = await axios.get("/movie/now_playing");
            console.log(getImages);
            setImages(getImages.data.results);
        }
        requestNowPlayingMovies();
    }, []);

    const settingsLg = {
        arrows: true,
        dots: false,
        autoplay: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "300px",
        infinite: true,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    }



    const settings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow/>
    };


    return (
        <>
        <div className="lg:hidden">
            <HeroSlider {...settings} >
            {
                images.map((image)=> (
                    <div className="w-full h-64 md:h-80 py-3">
                        <img src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`} 
                        alt="testing" className="w-full h-full rounded-md"/>
                    </div>
                ))
            }
            </HeroSlider>
            
        </div>


        <div className="hidden lg:block">
        <HeroSlider {...settingsLg} >
            {
                images.map((image)=> (
                    <div className="relative">
                        
                        <div className="w-full h-96">
                        <div className="absolute top-0 right-0 h-96 w-full z-10"
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(26, 26, 26, 0.5) 0%, rgba(26, 26, 26, 0.5) 50%, rgba(26, 26, 26, 0.8) 100%)",
                            zIndex: "10"
                        }}
                    />

                            <Link className="absolute z-30 top-72 left-16 text-white font-bold text-4xl" to={`/movie/${image.id}`}>{image.original_title}</Link>
                            <img src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`} 
                            alt="testing" className="w-full h-full rounded-md"/>
                        </div>

                    </div>
                    
                ))
            }
            </HeroSlider>
            
        </div>

        </>
    );
};

export default HeroCarousel;