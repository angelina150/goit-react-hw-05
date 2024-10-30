import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/movies";
import css from "./HomePage.module.css";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
