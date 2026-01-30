import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <nav>
        <Link to={'/'}>Home</Link> | <Link to={'/login'}>Login</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
