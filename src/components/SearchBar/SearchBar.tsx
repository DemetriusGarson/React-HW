import { useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (formData: FormData) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasSubmitted = useRef(false);
  const [inputValue, setInputValue] = useState<string>(() => {
    const savedInputValue = window.localStorage.getItem('inputValue');
    if (savedInputValue === null) return '';
    return savedInputValue;
  });
  const [isRepeatSearch, setIsRepeatSearch] = useState<boolean>(() => {
    if (window.localStorage.getItem('repeatSearch') === 'true') {
      return true;
    } else {
      return false;
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target !== event.currentTarget) return;
    window.localStorage.setItem('inputValue', event.target.value);
    window.localStorage.setItem('shouldRestoreSearch', 'false');
    setInputValue(event.target.value);
  };

  const handleRepeatSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target !== event.currentTarget) return;
    if (event.target.checked) {
      window.localStorage.setItem('repeatSearch', 'true');
      setIsRepeatSearch(true);
    } else {
      window.localStorage.setItem('repeatSearch', 'false');
      setIsRepeatSearch(false);
    }
  };

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
    //  setInputValue('');
  };

  useEffect(() => {
    if (window.localStorage.getItem('repeatSearch') === 'false') return;

    if (window.localStorage.getItem('shouldRestoreSearch') !== 'true') return;

    if (hasSubmitted.current) return;

    hasSubmitted.current = true;

    formRef.current?.requestSubmit();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form ref={formRef} onSubmit={handleFormSubmit} className={styles.form}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={handleChange}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
          <fieldset className={styles.repeatField}>
            <label htmlFor="repeatSearch">Repeat Search</label>
            <input
              type="checkbox"
              name="repeatSearch"
              value="true"
              id="repeatSearch"
              checked={isRepeatSearch}
              onChange={handleRepeatSearchChange}
            />
          </fieldset>
        </form>
      </div>
    </header>
  );
}
