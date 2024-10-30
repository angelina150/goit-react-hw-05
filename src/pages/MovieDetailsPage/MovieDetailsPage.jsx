import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getMovieById, IMAGE_BASE_URL } from "../../api/movies";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/movies");

  useEffect(() => {
    getMovieById(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : defaultImg;

  return (
    <div className={css.wrapper}>
      <Link className={css.goBack} to={backLink.current}>
        Go back{" "}
      </Link>
      <div className={css.info}>
        <div className={css.imgWrapper}>
          <img
            className={css.img}
            src={imageUrl}
            alt={movie.title}
            width={250}
          />
        </div>
        <div className={css.descWrapper}>
          <h2>{movie.title}</h2>
          <h3>Overview</h3>
          <p>{movie.overview || "No overview available."}</p>
          <h3>Genres</h3>
          <p>
            {movie.genres?.map((genre) => genre.name).join(", ") ||
              "No genres available."}
          </p>
        </div>
      </div>

      <div className={css.navBlock}>
        <p>Additional information</p>
        <ul className={css.navList}>
          <li>
            <NavLink
              className={css.link}
              to={`/movies/${movieId}/cast`}
              state={{ from: location.state?.from }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              className={css.link}
              to={`/movies/${movieId}/reviews`}
              state={{ from: location.state?.from }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
