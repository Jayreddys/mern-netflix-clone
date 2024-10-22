import React from "react";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import ProgramListScroll from "./ProgramListScroll";
import { useContentStore } from "../store/content";

const ProgramList = () => {
  const { popularMovies } = useGetPopularMovies();
  const { contentType } = useContentStore();
  const text = contentType === "movie" ? "Popular Movies" : "Popular Tv Show's";

  if (!popularMovies) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    ); // Show a loading message if data is null
  }
  return (
    <div className="w-full">
      <ProgramListScroll data={popularMovies} text={text} />
    </div>
  );
};

export default ProgramList;
