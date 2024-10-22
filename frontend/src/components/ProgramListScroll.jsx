import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useRef } from "react";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";

const ProgramListScroll = ({ data, text }) => {
  if (data.length === 0) {
    return <div>...Loading</div>;
  }
  //console.log(data);
  const scrollRef = useRef(null);
  const leftScroll = useRef(null);
  const rightScroll = useRef(null);
  const { contentType } = useContentStore();

  const scrollFront = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 299;
    }
  };

  const scrollBack = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 299;
    }
  };

  const getScrollPosition = () => {
    if (scrollRef.current) {
      const rightmost = scrollRef.current.clientWidth;
      const position = scrollRef.current.scrollLeft;
      if (position != 0) {
        leftScroll.current.style.display = "block";
      } else {
        leftScroll.current.style.display = "none";
      }

      if (position != 0 && (position - rightmost) % rightmost == 0) {
        rightScroll.current.style.display = "none";
      } else {
        rightScroll.current.style.display = "block";
      }
    }
  };

  return (
    <div className="relative w-[100%] overflow-hidden bg-black group md:pl-20 pt-12">
      <div className="text-white text-xl font-bold pl-2 pt-2">{text}</div>
      <ChevronLeft
        ref={leftScroll}
        className="absolute bg-black/80 rounded-full opacity-0 group-hover:opacity-80 hidden left-5 top-[58%] text-white z-50 w-[40px] h-[40px] hover:scale-110 cursor-pointer transition ease-in-out"
        onClick={scrollBack}
      />
      <ChevronRight
        ref={rightScroll}
        className="absolute bg-black/80 rounded-full opacity-0 group-hover:opacity-80 right-5 top-[58%] text-white z-50 w-[40px] h-[40px] hover:scale-110 cursor-pointer transition ease-in-out"
        onClick={scrollFront}
      />
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth w-full h-[200px] flex overflow-y-hidden mb-12"
        style={{ scrollBehavior: "smooth" }}
        onScroll={getScrollPosition}
      >
        {data.details.map(
          (record, index) =>
            record.backdrop_path && (
              <div
                key={index}
                className="relative flex-shrink-0 h-full w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 bg-black text-white rounded-sm cursor-pointer z-0"
              >
                <Link to={`/watch/${record.id}`}>
                  <div className="absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] h-[80%] shadow-2xl border-[0.2px] border-white/20 rounded-sm">
                    <img
                      src={`${ORIGINAL_IMG_BASE_URL}${record?.backdrop_path}`}
                      alt={record.title}
                      className=" relative w-full h-full  object-cover object-center rounded-sm transition hover:scale-150 hover:opacity-20 ease-in-out"
                    />
                    <div className="absolute hidden md:flex h-full w-full opacity-0 hover:opacity-100 bg-black/90 items-center justify-center sm:text-sm left-0 top-0 whitespace-nowrap text-white z-50 text-xs transition ease-in-out">
                      {contentType === "movie" ? record.title : record.name}
                    </div>
                  </div>
                </Link>
                <div className="absolute -bottom-5 z-50 font-sm text-white md:hidden text-center font-light h-[40px] w-full py-1 px-2">
                  {contentType === "movie" ? record.title : record.name}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProgramListScroll;
