import UserLogo from '@/assets/user.svg?react';
import NavBar from './NavBar';

type Props = {};
export const Header = ({}: Props) => {
  return (
    <div className="container__header h-[8hv] md:h-[10vh] border-b-3 py-3 px-5 grid grid-cols-[1fr_auto] md:grid-cols-3 items-center">
      <div className="container__left">
        <h1 className="text-xl font-bold">Plataforma de cursos</h1>
      </div>

      <div className="container__center hidden md:block">
        <NavBar />
      </div>

      <div className="container__right profile">
        <span className="float-end">
          <UserLogo />
        </span>
      </div>
    </div>
  );
};
