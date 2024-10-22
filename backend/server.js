import express from "express";
import auth from "./routes/auth.js";
import movie from "./routes/movie.js";
import tv from "./routes/tv.js";
import search from "./routes/search.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", auth);
app.use("/api/v1/movie", protectRoute, movie);
app.use("/api/v1/tv", protectRoute, tv);
app.use("/api/v1/search", protectRoute, search);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const Port = ENV_VARS.PORT;
app.listen(Port, () => {
  console.log("Server is running on port 5001");
  connectDB();
});
