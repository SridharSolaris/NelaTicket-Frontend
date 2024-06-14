import React from 'react';
//props -> src, title,subtitle, isDark(bool), isCircle(bool)

const showPoster = (r) => {

  return (
    <>
      <a href={`/tv/${r.id}`}>
        <div
          className={`flex flex-col  gap-2 px-2  ${
            r.isCircle ? 'item-center max-w-max ' : 'items-start'
          } `}
        >
          <div className={`${r.isCircle ? 'h-40' : 'h-80'} `}>
            <img
              key={r.alt}
              src={`http://image.tmdb.org/t/p/original/${r.poster_path}`}
              alt={r.original_title}
              className={`${
                r.isCircle
                  ? 'rounded-full h-40 w-40 flex items-center justify-center'
                  : 'w-full h-full rounded-xl'
              } `}
            />
          </div>
          <div
            className={`${
              r.isCircle ? 'flex flex-col items-center ' : ''
            } `}
          >
            <h3
              className={`text-lg font-bold ${
                r.isDark ? 'text-white' : 'text-gray-700'
              }`}
            >
              {r.title}
            </h3>
            <p
              className={`text-sm font-bold ${
                r.isDark ? 'text-white' : 'text-gray-700'
              }`}
            >
              {r.subtitle}
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default showPoster;