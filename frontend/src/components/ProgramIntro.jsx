import React from "react";
import { Play, Info } from "lucide-react";
import { Loader } from "lucide-react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";

const ProgramIntro = ({ trendingContent, watch, isHome }) => {
  const { contentType } = useContentStore();
  if (!trendingContent) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    ); // Show a loading message if data is null
  }
  return (
    <div
      className={`${
        isHome
          ? "absolute top-3/4 md:top-1/2 -translate-y-3/4 lg:max-w-[80%]"
          : ""
      } z-30 flex flex-col max-w-[50rem] md:left-[2rem] lg:left-[4rem] px-4 md:px-10 lg:px-16`}
    >
      <h1 className=" font-bold mb-3 text-shadow text-2xl md:text-3xl lg:text-5xl text-white">
        {contentType === "movie" ? trendingContent.title : trendingContent.name}
      </h1>
      <div
        className={`flex items-center justify-start gap-2 mb-6 text-slate-300 `}
      >
        <p className="font-light">
          {contentType === "movie"
            ? trendingContent.release_date?.split("-")[0]
            : trendingContent.first_air_date?.split("-")[0]}{" "}
          |
        </p>
        <p
          className={`font-light text-shadow ${
            isHome ? "text-slate-300" : "text-blue-500"
          }`}
        >
          {trendingContent.adult ? "R" : "PG-13"}
        </p>
      </div>
      <p
        className={`font-light text-[16px] text-slate-300 text-sm text-n-1 text-shadow opacity-85 mb-8 max-w-full overflow-hidden ${
          isHome
            ? "text-ellipsis md:max-w-[70%] lg:max-w-[50%] max-h-[6rem]"
            : ""
        } whitespace-normal line-clamp-3 md:text-base lg:text-lg`}
      >
        {trendingContent.overview}
      </p>
      <div className={`${watch} flex flex-col sm:flex-row gap-4`}>
        <Link to={`/watch/${trendingContent.id}`}>
          <div className="flex justify-start cursor-pointer text-black px-3 py-2 bg-white gap-2 rounded-sm transition ease-in-out hover:scale-110">
            <Play
              color="black"
              style={{ fill: "black", stroke: "none" }}
              size={24}
            />
            <button className="font-bold shadow-sm">Play</button>
          </div>
        </Link>

        <div className="flex shadow-sm cursor-pointer justify-start bg-gray-600/60 px-3 py-2 gap-2 rounded-sm transition ease-in-out hover:scale-110">
          <Info />
          <button className="font-bold text-shadow">More info</button>
        </div>
      </div>
    </div>
  );
};

export default ProgramIntro;
