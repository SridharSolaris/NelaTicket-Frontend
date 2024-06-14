import React from "react";
import DPoster from "../Poster/DPoster";

import settings from "../config/PosterCarousel.config";

import Slider from "react-slick";

const DPosterSlider = (props) => {
    return (
        <>
        <div className="flex flex-col items-start py-4">
            <h3 className={
                `text-2xl font-bold ${
                    props.isDark ? "text-white": "text-gray-800"
                }`
            }>{props.title}</h3>
            <p className={
                `text-sm font-bold ${
                    props.isDark ? "text-white": "text-gray-800"
                }`
            }>{props.subtitle}</p>
        </div>
        <Slider {...settings} className="flex flex-row">
            {props.images.map((image) => (
                <DPoster {...image} isDark={props.isDark} path="moviedup" id={props.id} />
                
            )
            )}
        </Slider>

        </>
    )
        
}

export default DPosterSlider;