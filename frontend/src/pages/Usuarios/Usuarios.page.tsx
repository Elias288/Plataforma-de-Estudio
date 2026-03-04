import Search from '@/components/Search';
import CardStyled from '@/components/styles/Card.style';
import LinkButtonStyled from '@/components/styles/LinkButton.style';
import { useAuth } from '@/context/AuthContext';

type Props = {};
const UsuariosPage = ({}: Props) => {
  const { user } = useAuth();

  return (
    <div>
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        {user?.role && user.role.search(/[^(ADMIN|PROFESOR)$]/g) && (
          <LinkButtonStyled title="Crear Usuario" to="/createUser" />
        )}
        <Search />
      </div>
      <article className="wall__content flex flex-col gap-y-4">
        <CardStyled>
          <h2>Usuario1</h2>
        </CardStyled>
        <CardStyled>
          <h2>Usuario2</h2>
        </CardStyled>
      </article>
    </div>
  );
};
export default UsuariosPage;
