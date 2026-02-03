import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import NavBar from './NavBar';

const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="bg-gray-100 overflow-auto pb-15 pt-5 h-[calc(100vh-80px)] md:pb-0">
        <Outlet />
      </main>

      <div className="bg-white md:hidden fixed bottom-0 w-full p-3 h-16.25">
        <NavBar />
      </div>
    </>
  );
};

export default MainLayout;
