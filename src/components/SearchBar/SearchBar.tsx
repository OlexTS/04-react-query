import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchFormProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchFormProps) => {
  const handleSubmit = (formData: FormData) => {
    const movie = formData.get("query") as string;
    if (movie === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(movie);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
