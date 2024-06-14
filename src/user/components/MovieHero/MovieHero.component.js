import {React,useState} from "react";
import { BiChevronRight, BiStar, BiShareAlt } from "react-icons/bi";
import MovieInfo from "./MovieInfo.component";

 const MovieHero = (props) => {
    return (
        <>
            <div className="relative md:hidden w-full" style={{height: "calc(180vw)"}}>
                <div className="h-full w-full absolute z-10 bottom-0">
                    <img src={`https://image.tmdb.org/t/p/original${props.pp}`} alt='poster' className="w-full h-full" />
                </div>
                <div className="absolute w-full h-68 z-20 bg-opacity-90 bg-gray-900 pt-4 top-72">
                    <MovieInfo {...props}/>
                </div>
            </div>


            <div className="hidden md:block lg:hidden">
                <img src={`https://image.tmdb.org/t/p/original${props.bp}`} alt='poster' />
                <div className="absolute w-full h-68 z-20 bg-opacity-70 bg-gray-900 pt-4 top-48">
                    <MovieInfo {...props}/>
                </div>
            </div>


            <div className="relative hidden lg:block" style={{height:"30rem"}}>

                <div className="absolute h-full w-full z-10"
                style={{backgroundImage: "linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%)"}}
                />

                <div className="absolute z-30 left-40 top-10 flex items-start">
                    <img
                    src={`https://image.tmdb.org/t/p/original${props.pp}`}
                    alt='poster'
                    className='h-full w-64 rounded-xl shadow-2xl'
                    />
                    <MovieInfo {...props}/>
                    
                </div>
                <div>
                    <div className="text-white text-xl z-30 absolute right-12 top-8 flex">
                    <BiShareAlt className="w-8 h-8 "/>
                    <p className="px-4">Share</p>
                    </div>
                </div>

                <img
                 src={`https://image.tmdb.org/t/p/original${props.bp}`}
                alt="poster"
                className="w-full h-full"/>
            </div>
        </>
    )
 }

 export default MovieHero;