import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/movies";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (movieId) {
      getMovieCredits(movieId)
        .then((castData) => setCast(castData))
        .catch((error) =>
          console.error("Error fetching movie credits:", error)
        );
    }
  }, [movieId]);
  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>
          {actor.name} as {actor.character}
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
