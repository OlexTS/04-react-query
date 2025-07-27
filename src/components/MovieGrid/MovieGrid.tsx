import css from "./MovieGrid.module.css";
import noImage from "../../assets/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  onSelect: (id: number) => void;
  movies: Movie[];
}

const MovieGrid = ({ onSelect, movies }: MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie.id)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/` + movie.poster_path
                  : noImage
              }
              alt="movie title"
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
