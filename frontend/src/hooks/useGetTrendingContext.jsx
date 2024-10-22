import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
  const [trendingContents, setTrendingContents] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setTrendingContents(res.data.content);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContents };
};
export default useGetTrendingContent;
