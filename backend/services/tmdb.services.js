import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchfromTMDB = async (url) => {
  console.log("Fetching data from TMDB...", ENV_VARS.TMDB_API_KEY);
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + `${ENV_VARS.TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch data from TMDB" + response.statusText);
  }
};
