import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieList = ({ array }) => {
  const location = useLocation();

  return (
    <>
      <ol>
        {array.map(({ id, title }) => (
          <li key={id}>
            <Link state={location} to={`/movies/${id}`}>
              {title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
};

MovieList.propTypes = {
  array: PropTypes.array.isRequired,
  end: 'true',
};

export default MovieList;
