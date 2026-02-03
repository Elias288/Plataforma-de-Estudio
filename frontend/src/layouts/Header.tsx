import UserLogo from '@/assets/user.svg?react';
import NavBar from './NavBar';
import MenuIcon from '@/assets/menu.svg?react';
import { useState } from 'react';
import LeftBar from '@/pages/Home/components/LeftBar';
import { Link } from 'react-router-dom';

type Props = {};
export const Header = ({}: Props) => {
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => setShowSideBar(!showSideBar);

  return (
    <div className="container__header h-20 border-b-3 py-3 px-5 grid grid-cols-[auto_1fr_auto] justify-items-center gap-5 md:grid-cols-[auto_auto_1fr_auto] md:justify-items-normal xl:grid-cols-3 items-center">
      <button onClick={toggleSideBar} className="xl:hidden cursor-pointer">
        <MenuIcon className=" w-10 h-10" />
      </button>

      <div className="container__left">
        <h1 className="text-xl font-bold">Plataforma de cursos</h1>
      </div>

      <div className="container__center hidden md:block">
        <NavBar />
      </div>

      <div className="container__right profile">
        <span className="float-end">
          <Link to={'/login'}>
            <UserLogo />
          </Link>
        </span>
      </div>

      <div
        className={`side__bar ${showSideBar ? '' : '-translate-x-full'} bg-white xl:-translate-x-full absolute top-20 left-0 h-[calc(100vh-80px)] w-full max-w-68 z-10 duration-700 border-r border-gray-200 pl-3`}
      >
        <LeftBar />
      </div>
    </div>
  );
};
