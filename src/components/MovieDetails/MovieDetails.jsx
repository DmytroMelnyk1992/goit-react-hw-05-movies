import { useState, useEffect, Suspense } from 'react';
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../services/API';
import Loader from '../Loader/Loader';

const MovieDetails = () => {
  const [data, setData] = useState();
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, [movieId]);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {data && (
        <>
          <button onClick={() => navigate(location.state ?? '/')}>
            Go back
          </button>
          <h1>
            {data.original_title} {data.release_date.split('-')[0]}
          </h1>
          <p>User score: {Math.round(data.vote_average * 10)}%</p>
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
            alt={data.original_title}
          />
          <p>Overview</p>
          <p>{data.overview}</p>
          <p>Genres</p>
          <p>{data.genres.map(item => item.name).join(', ')}</p>
          <p>Additional inormation</p>
          <ul>
            <li>
              <Link state={location.state} to={`/movies/${movieId}/cast`}>
                {' '}
                Cast
              </Link>
            </li>
            <li>
              <Link state={location.state} to={`/movies/${movieId}/reviews`}>
                Reviews
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
