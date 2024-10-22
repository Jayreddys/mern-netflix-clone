import React, { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
  };

  return (
    <div className="hero-bg relative">
      <header className="z-30 fixed top-0 left-0 right-0 bg-gradient-to-b from-black to-black/0">
        <div className="mx-auto flex justify-between items-center p-4 pb-10 px-4 sm:px-10 lg:px-40">
          <img
            src="/netflix-logo.png"
            alt="netflix-logo"
            height={52}
            width={160}
          />
          <Link
            to={"/login"}
            className="py-1 min-w-20 px-2 text-center rounded-sm shadow-lg text-base lg:text-lg bg-red-700 text-white"
          >
            Sign In
          </Link>
        </div>
      </header>

      <div className="relative pt-32 md:pt-60 pb-20 md:pb-40 px-4 sm:px-10 lg:px-80">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-[1.3rem] text-white font-bold leading-tight">
              Unlimited movies, TV shows and more
            </h1>
            <h6 className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-[2rem] text-white font-semibold">
              Starts at only $2. Cancel at anytime
            </h6>
            <p className="mb-4 md:mb-[1rem] text-white text-base sm:text-lg">
              Ready to watch? Enter your email to create or restart your
              membership
            </p>
          </div>
          <div className="w-full">
            <Form
              className="flex flex-col sm:flex-row gap-2 justify-center items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                className="w-full sm:w-[50%] rounded-md border shadow-2xl border-gray-600 p-3 bg-transparent focus:outline-none text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="w-full sm:w-[30%] bg-red-700 py-2 px-4 text-center text-xl sm:text-2xl font-bold rounded-sm text-white">
                {"Get Started "}
                <ChevronRight className="inline-block text-center mb-1 ml-1" />
              </button>
            </Form>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      <section className="bg-black w-full text-white py-16">
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 md:px-12 lg:px-32 xl:px-72">
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold">
              Enjoy on your TV
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-light">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more
            </p>
          </div>
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/tv.png"
                alt="smart-tv"
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[640px] h-auto z-20 relative"
              />
              <video
                className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[52%] w-[70%] max-w-[280px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"
                autoPlay={true}
                playsInline
                muted
                loop
              >
                <source src="/hero-vid.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      <section className="bg-black w-full text-white py-16">
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 md:px-12 lg:px-32 xl:px-72">
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="logo"
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[640px] h-auto max-h-[300px] z-20 relative"
              />
              <div className="left-1/2 -translate-x-1/2 bottom-3 h-[25%] w-[60%] bg-black border border-gray-500 rounded-2xl absolute z-30">
                <div className="flex justify-between items-center py-2 px-3">
                  <img
                    src="/stranger-things-sm.png"
                    className="h-full max-h-[58px]"
                    alt="sm"
                  />
                  <div className="flex flex-col justify-center items-start">
                    <span className=" text-xs">Stranger Things</span>
                    <span className=" text-[10px] text-blue-600">
                      Downloading...
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download"
                    className="h-full max-h-[54px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold">
              Download your shows to watch online
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-light">
              Save your favourites easily and always have something to watch
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      <section className="bg-black w-full text-white py-16">
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 md:px-12 lg:px-32 xl:px-72">
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold">
              Watch everywhere
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-light">
              Stream unlimited movies and Tv shows on your phone, tablet,
              laptop, and Tv
            </p>
          </div>
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/device-pile.png"
                alt="smart-tv"
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[640px] h-auto z-20 relative"
              />
              <video
                className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[72%] w-[60%] max-w-[280px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]"
                autoPlay={true}
                playsInline
                muted
                loop
              >
                <source src="/video-devices.m4v" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>

      <section className="bg-black w-full text-white py-16">
        <div className="flex flex-col lg:flex-row justify-center items-center px-4 sm:px-8 md:px-12 lg:px-32 xl:px-72">
          <div className="flex-1 mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/kids.png"
                alt="logo"
                className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[640px] h-auto max-h-[300px] z-20 relative"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <p className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-bold">
              Create profile for kids
            </p>
            <p className="text-xs sm:text-sm lg:text-base font-light">
              Send kids in advetures with their favourite characters in space
              made just for them. Use it for free with your membership
            </p>
          </div>
        </div>
      </section>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true"></div>
      <Footer />
    </div>
  );
};

export default AuthScreen;
