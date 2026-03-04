import { Link } from 'react-router-dom';
import UserLogo from '@/assets/user.svg?react';
import HomeLogo from '@/assets/home.svg?react';
import PathLogo from '@/assets/path.svg?react';
import { useAuth } from '@/context/AuthContext';

const NavBar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-center items-end gap-4">
      <Link to={'/'} className="text-gray-500" title="Inicio">
        <HomeLogo className="w-10 h-10" />
      </Link>

      {user?.role && user.role.search(/[^(ADMIN|PROFESOR)$]/g) != 1 ? (
        <Link to={'/users'} className="text-gray-500" title="Crear Usuario">
          <UserLogo className="w-10 h-10" />
        </Link>
      ) : (
        <UserLogo className="w-10 h-10 text-gray-400" />
      )}

      <Link to={'/cursos'} className="text-gray-500" title="Cursos">
        <PathLogo className="w-10 h-10" />
      </Link>
    </nav>
  );
};

export default NavBar;
