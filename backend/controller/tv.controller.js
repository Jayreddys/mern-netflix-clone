import { fetchfromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchfromTMDB(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    );
    const randomTv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.json({ success: true, details: data });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimilarTv(req, res) {
  try {
    const { id } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    res.json({ success: true, details: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvByCategories(req, res) {
  try {
    const { category } = req.params;
    const data = await fetchfromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    res.json({ success: true, details: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getTvByPopularity(req, res) {
  try {
    const data = await fetchfromTMDB(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
    );
    res.json({ success: true, details: data.results });
  } catch (error) {
    if (error.message.include("404")) {
      return res.status(404).send(null);
    }
  }
  res.status(500).json({ success: false, message: "Internal Server Error" });
}
