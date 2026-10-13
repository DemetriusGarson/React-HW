import toast, { Toaster } from 'react-hot-toast';
import { fetchMovie } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const handleSubmit = async (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query === '') {
      toast.error('Please enter your search query.');
      return;
    }

    window.localStorage.setItem('shouldRestoreSearch', 'true');
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);
      const moviesData = await fetchMovie(query);

      if (moviesData.results.length === 0) {
        window.localStorage.setItem('shouldRestoreSearch', 'false');
        toast.error('No movies found for your request.');
      } else {
        setMovies(moviesData.results);
      }
    } catch {
      window.localStorage.setItem('shouldRestoreSearch', 'false');
      setIsError(true);
      toast.error('Error on loading movie data');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedMovie(null);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModal(true);
  };

  return (
    <div className={css.app}>
      {isModal && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
    </div>
  );
}
