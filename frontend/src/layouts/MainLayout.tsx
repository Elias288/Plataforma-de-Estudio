import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import NavBar from './NavBar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="bg-gray-100 overflow-auto pt-5 md:pb-0 h-(--main-h) md:h-(--main-h-responsive)">
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
