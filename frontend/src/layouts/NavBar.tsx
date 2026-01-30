import { Link } from 'react-router-dom';
import UserLogo from '@/assets/user.svg?react';
import HomeLogo from '@/assets/home.svg?react';
import PathLogo from '@/assets/path.svg?react';

const NavBar = () => {
  return (
    <nav className="flex justify-center items-end gap-4">
      <Link to={'/'} className="text-gray-500">
        <HomeLogo className="w-10 h-10" />
      </Link>
      <Link to={'/login'} className="text-gray-500">
        <UserLogo className="w-10 h-10" />
      </Link>
      <Link to={'/'} className="text-gray-500">
        <PathLogo className="w-10 h-10" />
      </Link>
    </nav>
  );
};

export default NavBar;
