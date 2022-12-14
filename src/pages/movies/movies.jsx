import { useState, useEffect } from 'react';
import { fetchSearchMovie } from '../../services/API';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MovieList from 'components/MovieList/MovieList';

const SearchMovies = () => {
  const [data, setData] = useState();
  const [query, setQuery] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onInputChange = event => setQuery(event.target.value);
  const reset = () => setQuery('');

  const onFormSubmit = event => {
    event.preventDefault();
    if (!query) {
      Notify.warning('Sorry, your query is empty, please, make your choice');
      return;
    }
    setKeyword(query);

    navigate(`?query=${query}`);
    reset();
  };

  useEffect(() => {
    const key = searchParams.get('query');
    if (!key) return;

    fetchSearchMovie(key)
      .then(results => {
        if (results.length === 0) {
          Notify.warning('Sorry, check the name is correct');
          return;
        }
        setData(results);
      })
      .catch(error => console.log(error));
  }, [keyword, searchParams]);
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          name="query"
          value={query}
          onChange={onInputChange}
          type="text"
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Search!</button>
      </form>
      {data && <MovieList array={data} />}
    </div>
  );
};

export default SearchMovies;
