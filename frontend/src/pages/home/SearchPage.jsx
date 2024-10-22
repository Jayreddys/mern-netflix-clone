import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { useSearchStore } from "../../store/searchtype";
import { Search } from "lucide-react";
import { Loader } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const { searchType, setSearchType } = useSearchStore();
  const [searchContent, setSearchContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    switch (searchType) {
      case "movie":
        const mbutton = document.getElementById("1");
        mbutton.classList.add("bg-red-700", "ring-2", "ring-red-800");
        mbutton.classList.remove("bg-slate-700");
        break;
      case "tv":
        const tbutton = document.getElementById("2");
        tbutton.classList.add("bg-red-700", "ring-2", "ring-red-800");
        tbutton.classList.remove("bg-slate-700");
        break;
      case "person":
        const pbutton = document.getElementById("3");
        pbutton.classList.add("bg-red-700", "ring-2", "ring-red-800");
        pbutton.classList.remove("bg-slate-700");
        break;
      default:
        break;
    }
  }, [searchType]); // Run this effect whenever `searchType` changes

  const handleSearch = () => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/v1/search/${searchType}/${input}`);
        setSearchContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setSearchContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
    setInput("");
  };

  return (
    <div className="bg-black flex flex-col justify-center items-center text-white pt-28 gap-8">
      <Navbar />
      <div className="flex justify-center items-center gap-2 py-2">
        <button
          id="1"
          className="bg-slate-700 px-2 py-1 border border-slate-600/80 rounded-sm"
          onClick={() => {
            setSearchType("movie");
            for (let i = 1; i < 4; i++) {
              const button = document.getElementById(`${i}`);
              button.classList.remove("bg-red-700", "ring-2", "ring-red-800");
              button.classList.add("bg-slate-700");
            }
          }}
        >
          Movies
        </button>
        <button
          id="2"
          className="bg-slate-700 px-2 py-1 border border-slate-600/80 rounded-sm"
          onClick={() => {
            setSearchType("tv");
            for (let i = 1; i < 4; i++) {
              const button = document.getElementById(`${i}`);
              button.classList.remove("bg-red-700", "ring-2", "ring-red-800");
              button.classList.add("bg-slate-700");
            }
          }}
        >
          Tv Shows
        </button>
        <button
          id="3"
          className="bg-slate-700 px-2 py-1 border border-slate-600/80 rounded-sm"
          onClick={() => {
            setSearchType("person");
            for (let i = 1; i < 4; i++) {
              const button = document.getElementById(`${i}`);
              button.classList.remove("bg-red-700", "ring-2", "ring-red-800");
              button.classList.add("bg-slate-700");
            }
          }}
        >
          People
        </button>
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder={`Enter ${
            searchType === "tv"
              ? "Tv Serie's "
              : searchType === "movie"
              ? "Movie's"
              : "Person's"
          } name to be Searched`}
          className=" w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-[30px] outline-none bg-slate-700 py-1 px-2 rounded-sm text-sm border border-slate-600"
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch} ref={buttonRef}>
          <Search className="bg-red-700 h-[30px] w-[35px] p-1 rounded-sm border border-slate-600" />
        </button>
      </div>
      <div>
        {loading ? (
          <div className="h-[600px]">
            <div className="flex justify-center items-center bg-black h-full">
              <Loader className=" animate-spin text-red-700 size-10" />
            </div>
          </div>
        ) : (
          <div>
            {searchContent.length == 0 ? (
              <div className="bg-black text-white h-[600px]">
                <div className="max-w-6xl mx-auto">
                  <Navbar />
                  <div className="flex justify-center items-center mx-auto px-4 py-8 h-full">
                    <h2 className="text-2xl sm:text-5xl font-bold text-balance">
                      Content not found 😥
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" min-h-[600px] w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 whitespace-normal p-8">
                {searchContent.map((record, index) => {
                  const imagePath =
                    searchType === "person"
                      ? record.profile_path
                      : record.poster_path;

                  // Skip rendering if neither poster_path nor profile_path exists
                  if (!imagePath) return null;

                  return (
                    <div
                      key={index}
                      className="relative h-[450px] bg-slate-600/50 text-white rounded-sm cursor-pointer z-0"
                    >
                      <div className="absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] h-[95%] shadow-2xl border-[0.2px] border-white/20 rounded-sm">
                        <img
                          src={`${ORIGINAL_IMG_BASE_URL}${imagePath}`}
                          alt={
                            searchType === "movie" ? record.title : record.name
                          }
                          className="w-full h-full object-cover object-center rounded-sm transition hover:scale-150 hover:opacity-20 ease-in-out"
                        />
                        <Link
                          to={
                            searchType === "person"
                              ? `/watch/${record.known_for[0].id}`
                              : `/watch/${record.id}`
                          }
                        >
                          <div className="absolute h-full w-full opacity-0 hover:opacity-100 hover:scale-105 rounded-lg bg-black/90 flex items-center justify-center sm:text-sm left-0 top-0 whitespace-nowrap text-white z-50 text-xs transition ease-in-out">
                            {searchType === "movie"
                              ? record.title
                              : record.name}
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
