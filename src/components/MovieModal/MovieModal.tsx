import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';
import { useEffect } from 'react';

interface ModalProps {
  movie: Movie;
  onClose: () => void;
}
export default function Modal({ movie, onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  });

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close button"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt="movie_title"
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {`${movie.vote_average}/10`}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
