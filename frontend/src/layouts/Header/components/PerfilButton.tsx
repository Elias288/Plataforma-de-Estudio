import UserLogo from '@/assets/user.svg?react';
import SignOutLogo from '@/assets/signOut.svg?react';
import Perfil from '@/assets/user.svg?react';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';

type Props = {};
const PerfilButton = ({}: Props) => {
  const { perfil } = useUserProfile();
  const [open, setOpen] = useState<boolean>(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { logout } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight);
  }, []);

  const handleLogout = async () => {
    logout();

    navigate('/', { replace: true });
  };

  return (
    <>
      <button onClick={() => setOpen((v) => !v)} className="cursor-pointer block float-end">
        <span className="">
          <UserLogo />
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ height: open ? height : 0 }}
        className={`absolute right-3 top-(--header-h) overflow-y-hidden transition-[height] duration-300 ease-in-out bg-white ${open ? 'border- border-gray-300' : ''} rounded-b-2xl shadow-md `}
      >
        <div className="p-3">
          <ul className="list-none">
            <li className="cursor-default">
              {perfil && perfil.name
                ? perfil.name?.at(0)?.toUpperCase() + perfil.name?.slice(1)
                : 'cargando...'}
            </li>
            <hr className="border-gray-300 my-4" />

            <li>
              <Link
                onClick={() => setOpen(false)}
                to="/perfil"
                className="cursor-pointer hover:text-sky-600 flex flex-row flex-nowrap gap-2"
              >
                <Perfil /> Perfil
              </Link>
            </li>

            <hr className="border-gray-300 my-4" />
            <li
              className="cursor-pointer hover:text-orange-800 flex flex-row flex-nowrap gap-2"
              onClick={handleLogout}
            >
              <SignOutLogo /> Cerrar Sesión
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PerfilButton;
