import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const token = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

interface MoviesHttpResponse {
  results: Movie[];
}

export const fetchMovies = async (movie: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data.results;
};
