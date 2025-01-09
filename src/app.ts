import express, { Application, Request, Response, NextFunction } from "express";

import { router as moviesRoutes } from "./routes/movies.routes";
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
console.log(process.env.TMDB_API_KEY);

const app: Application = express();

app.use("/movies", moviesRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Usage: GET BASE_URL:PORT/movies/year/YYYY" });
});

export default app;
