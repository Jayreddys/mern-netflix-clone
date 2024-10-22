import express from "express";
import {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategories,
  getMoviesByPopularity,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategories);
router.get("/popular", getMoviesByPopularity);

export default router;
