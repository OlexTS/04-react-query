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

export interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  movie: string,
  page: number
): Promise<{ movies: Movie[]; totalPages: number }> => {
  const { data } = await axios.get<MoviesHttpResponse>(
    `search/movie?query=${movie}&include_adult=false&language=en-US&page=${page}`,
    options
  );

  return { movies: data.results, totalPages: data.total_pages };
};
