import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const moviesInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2FhZjllMDU3YmE1ZTU0YmVkYTgxYTBjYTc2OTgzZCIsIm5iZiI6MTczMDI4MTMwMC44NDc1OTc0LCJzdWIiOiI2NzFkMjVmZTFlYTMzOTI4Mjk3ZDY1NGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-4kfBHUEvQfq1_QKS9VLwV3CWm00XhrFnC0Ou8qqRVw`,
  },
  params: {
    include_adult: false,
    language: "en-US",
  },
});

export const fetchTrendingMovies = async (params) => {
  const { data } = await moviesInstance.get("/trending/movie/day", {
    params,
  });
  return data.results;
};

export const searchMovies = async (query) => {
  try {
    const response = await moviesInstance.get(`/search/movie`, {
      params: { query, include_adult: false, language: "en-US" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export const getMovieById = async (id) => {
  const { data } = await moviesInstance.get(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async (id) => {
  try {
    const { data } = await moviesInstance.get(`/movie/${id}/credits`);
    return data.cast;
  } catch (error) {
    console.error(`Failed to fetch credits for movie with ID ${id}`, error);
    return [];
  }
};

export const getMovieReviews = async (id) => {
  try {
    const { data } = await moviesInstance.get(`/movie/${id}/reviews`);
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch reviews for movie with ID ${id}`, error);
    return [];
  }
};
export { IMAGE_BASE_URL };
