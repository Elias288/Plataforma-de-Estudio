import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <Header />

      <main
        className="bg-gray-100 overflow-auto pb-15 pt-5 md:pb-0"
        style={{ height: 'var(--main-h)' }}
      >
        <Outlet />

        <Footer />
      </main>

      <div className="bg-white md:hidden fixed bottom-0 w-full p-3 h-16.25">
        <NavBar />
      </div>
    </>
  );
};

export default MainLayout;
