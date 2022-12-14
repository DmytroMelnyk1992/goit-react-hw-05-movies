import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/API';
import MovieList from '../../components/MovieList/MovieList';

const Home = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetchTrendingMovies()
      .then(results => setData(results))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <p>Trending today</p>
      {data && <MovieList array={data} />}
    </>
  );
};

export default Home;
