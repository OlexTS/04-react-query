import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";
import MovieGrid from "./MovieGrid/MovieGrid";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import MovieModal from "./MovieModal/MovieModal";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movies=[],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["movies", searchQuery],
    queryFn: () => fetchMovies(searchQuery),
    enabled: !!searchQuery,
  });

  const handleSearch = async (movie: string) => {
    setSearchQuery(movie);
    const result = await refetch();
    if (result.data?.length === 0) {
      toast.error("No movies found for your request.");
    }
  };

  const handleSelect = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
      setSelectedMovie(movie);
      setIsModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid onSelect={handleSelect} movies={movies} />
        )
      )}
      {isLoading && <Loader />}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={handleModalClose} movie={selectedMovie} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
