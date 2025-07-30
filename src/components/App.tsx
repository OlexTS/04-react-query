import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
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
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: !!searchQuery,
  });
  
  useEffect(() => {
    if (data && data.movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = async (movie: string) => {
    setPage(1);
    setSearchQuery(movie);
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
      {totalPages>1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />}
      <Toaster />
    </div>
  );
}

export default App;
