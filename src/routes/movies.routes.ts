import { Router, Request, Response } from "express";
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const tmdb_client = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// tmdb api url
const movies_url: string = '/discover/movie';

const router = Router();

router.get("/year/:year", async (req: Request, res: Response): Promise<void> => {
  const config: AxiosRequestConfig = {
    headers: {
      //'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`, // uncomment if using access token
      'Accept': 'application/json'
    } as RawAxiosRequestHeaders,
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'language': 'en-US',
      'page': '1',
      'sort_by': 'popularity.desc',
      'primary_release_year': `${req.params.year}`
    }
  };

  let movie_list = [];
  try {
    const moviesResponse: AxiosResponse = await tmdb_client.get(movies_url, config);

    // return error if main request failed
    if (moviesResponse.status >= 400) {
      res.status(400).send({"error": `${movies_url} returned error ${moviesResponse.statusText}`});
    }

    // get list of movies with properties to return
    movie_list = moviesResponse.data.results.map((movie: any) => {
      const { id, title, release_date, vote_average} = movie;
      return { id, title, release_date, vote_average, editors: [] }
    });

    // get editors for each movie; fail silently if a credits request fails for a movie
    const creditsConfig: AxiosRequestConfig = {
      headers: {
        //'Authorization': `Bearer ${process.env.TMDB_ACCESS_TOKEN}`, // uncomment if using access token
        'Accept': 'application/json'
      } as RawAxiosRequestHeaders,
      params: {
        'api_key': process.env.TMDB_API_KEY,
        'language': 'en-US'
      }
    };
    await Promise.all(
        movie_list.map(async (movie: any) => {
          try {
            const creditsUrl = `/movie/${movie.id}/credits`;
            delete movie.id;  // not used in response
            const creditsResponse = await tmdb_client.get(creditsUrl, creditsConfig);
            movie.editors = creditsResponse.data.crew
                .filter((crew: {known_for_department: string;}) => crew.known_for_department === 'Editing')
                .map((crew: { name: string }) => crew.name );
          }
          catch (error: any) {
            console.error(`error getting credits for movie id ${movie.id}`);
          }
        })
    );

  } catch(err) {
    console.log(`exception: ${err}`);
    res.status(500).send({"error": `exception: ${err}`});
  }

  res.status(200).send(movie_list);
});

export { router };
