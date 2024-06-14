import React from "react";
import showPoster from "../Poster/showPoster.component";
import settings from "../config/PosterCarousel.config";

import Slider from "react-slick";

const showPosterSlider = (r) => {
    return (
    <>
    <div className="flex flex-col items-start py-4">
        <h3 className={
            `text-2xl font-bold ${
                r.isDark ? "text-white": "text-gray-800"
            }`
        }>{r.title}</h3>
        <p className={
            `text-sm font-bold ${
                r.isDark ? "text-white": "text-gray-800"
            }`
        }>{r.subtitle}</p>
    </div>
    <Slider {...settings}>
    {r.images.map((image) => (
        <showPoster {...image} isDark={r.isDark} />
    ))}
    </Slider>
    </>
    )
}

export default showPosterSlider;