import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { Loader, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import ProgramIntro from "../components/ProgramIntro";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import ProgramListScroll from "../components/ProgramListScroll";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  //console.log(similarContent);

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className=" animate-spin text-red-700 size-10" />
        </div>
      </div>
    ); // Show a loading message if data is null
  }
  if (Object.keys(content).length === 0) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="flex justify-center items-center mx-auto px-4 py-8 h-screen">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }
  const noOfTrailers = trailers.length;

  return (
    <div className="bg-black">
      <Navbar />
      <div className="pt-28">
        <div className="relative z-20 flex justify-between items-center w-full md:px-12 lg:px-24 bg-black">
          <ArrowLeft
            className={` text-white bg-slate-800 w-[40px] h-[30px] rounded-sm ${
              currentTrailerIdx === 0
                ? "opacity-0 cursor-none"
                : "opacity-100 cursor-pointer"
            }`}
            onClick={() => {
              if (currentTrailerIdx > 0) {
                setCurrentTrailerIdx((prevIdx) => prevIdx - 1);
              }
            }}
          />
          <ArrowRight
            className={` text-white bg-slate-800 w-[40px] h-[30px] rounded-sm ${
              currentTrailerIdx === noOfTrailers - 1
                ? "opacity-0 cursor-none"
                : "opacity-100 cursor-pointer"
            }`}
            onClick={() => {
              if (currentTrailerIdx < noOfTrailers - 1) {
                setCurrentTrailerIdx((prevIdx) => prevIdx + 1);
              }
            }}
          />
        </div>
        <div className="relative z-10 -top-4 bg-black w-full h-[400px] md:h-[600px] lg:h-[800px] flex justify-center items-center">
          {trailers.length === 0 ? (
            <img
              src={"https://i.ytimg.com/vi/_6UMhk3LD-c/sddefault.jpg"}
              alt="videoNotFound"
              className="w-[60%] h-[70%]"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${trailers[currentTrailerIdx].key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-[80%] h-[80%]"
            ></iframe>
          )}
        </div>
        <div className=" relative w-full flex-col md:flex-row flex justify-center items-center">
          <ProgramIntro
            trendingContent={content}
            watch={"hidden"}
            isHome={false}
          />
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            className="w-[50%] h-[250px] md:h-[400px] md:w-[20%] rounded-md"
          />
        </div>
        <div>
          {Array.isArray(similarContent) && similarContent.length === 0 ? (
            <div className="text-white bg-black py-12 md:pl-[10%] text-2xl font-bold">
              No Similar Content Available
            </div>
          ) : similarContent.details && similarContent.details.length !== 0 ? (
            <ProgramListScroll
              data={similarContent}
              text={"Similar Movies / TV Shows"}
            />
          ) : (
            <div className="text-white bg-black py-12 md:pl-[10%] text-2xl font-bold">
              No Similar Content Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
