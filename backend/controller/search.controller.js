import { fetchfromTMDB } from "../services/tmdb.services.js";
import { User } from "../models/users.model.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          creditedAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error("Error in Search Person Controll Space ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in Search Controll Space" });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "movie",
          creditedAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error("Error in Search Movie Controll Space ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in Search Controll Space" });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchfromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length == 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "tv",
          creditedAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error("Error in Search Tv Controll Space ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error in Search Controll Space" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, history: req.user.searchHistory });
  } catch (error) {
    console.error("Error in get Search History Controll Space ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteSearchHistory = async (req, res) => {
  const { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({ success: true, message: "Search History Deleted" });
  } catch (error) {
    console.error("Error in get Search History Controll Space ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
