import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';

export const SharedLayout = () => {
  return (
    <div>
      <header>
        <nav end="true">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
