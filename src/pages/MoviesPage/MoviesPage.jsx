import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/movies";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get("query");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieName) return;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(movieName);
        setMovies(data);
      } catch {
        setError("Sorry, there no such  request results!");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieName]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          placeholder="Search for a movie..."
          name="query"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
