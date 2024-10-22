import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

const useGetPopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getPopularData = async () => {
      const res = await axios.get(`api/v1/${contentType}/popular`);
      setPopularMovies(res.data);
    };
    getPopularData();
  }, [contentType]);

  return { popularMovies };
};

export default useGetPopularMovies;
