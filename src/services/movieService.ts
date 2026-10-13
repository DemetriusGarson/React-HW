import axios from 'axios';
import type { Movie } from '../types/movie';

interface fetchMovieHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovie(
  query: string,
): Promise<fetchMovieHttpResponse> {
  const response = await axios.get<fetchMovieHttpResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer 
        ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  return response.data;
}
