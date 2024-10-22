import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProgramIntro from "../../components/ProgramIntro";
import useGetTrendingContent from "../../hooks/useGetTrendingContext";
import { Loader } from "lucide-react";
import {
  ORIGINAL_IMG_BASE_URL,
  SMALL_IMG_BASE_URL,
} from "../../utils/constants";
import ProgramList from "../../components/ProgramList";

const HomeScreen = () => {
  const { trendingContents } = useGetTrendingContent();

  const [index, setIndex] = useState(0);
  const [trendingContent, setTrendingContent] = useState([]);
  const [isImageFading, setIsImageFading] = useState(false);

  useEffect(() => {
    if (!trendingContents || trendingContents.length === 0) return;

    const content = trendingContents[index];
    if (content && content.backdrop_path) {
      setIsImageFading(true); // Start fade-out for image

      setTimeout(() => {
        setTrendingContent(content);
        setIsImageFading(false); // Fade-in image
      }, 1000); // Wait 1 second before updating the image
    }

    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % trendingContents.length);
    }, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, [index, trendingContents]);

  if (!trendingContents) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    ); // Show a loading message if data is null
  }

  if (trendingContent.length === 0) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    ); // Show a loading message if data is null
  }
  console.log(trendingContent, index);
  return (
    <div>
      <div className="relative h-screen text-white bg-black">
        <Navbar />
        <div
          className="absolute top-0 left-0 w-full h-1/5 object-cover z-20 bg-gradient-to-b from-black to-black/0 "
          aria-hidden="true"
        ></div>
        <div
          className="absolute top-0 left-0 w-1/4 h-full object-cover z-20 bg-gradient-to-r from-black/80 to-black/0 "
          aria-hidden="true"
        ></div>
        <div
          className={`absolute top-0 right-0 w-1/4 h-full object-cover z-20 bg-gradient-to-l from-black/80 to-black/0 `}
          aria-hidden="true"
        ></div>
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="home-movie"
          className={`absolute hidden lg:block top-0 left-0 w-full h-full object-fill z-10 transition-opacity duration-1000 ease-in-out ${
            isImageFading ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={SMALL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="home-movie"
          className={`absolute lg:hidden top-0 left-0 w-full h-full object-fill z-10 transition-opacity duration-1000 ease-in-out ${
            isImageFading ? "opacity-0" : "opacity-100"
          }`}
        />
        <ProgramIntro
          trendingContent={trendingContent}
          watch={""}
          isHome={true}
        />
      </div>
      <ProgramList />
    </div>
  );
};

export default HomeScreen;
