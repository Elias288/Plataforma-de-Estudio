import Search from '@/components/Search';
import ButtonStyled from '@/components/styles/Button.style';
import CardStyled from '@/components/styles/Card.style';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};
const ListarCursos = ({}: Props) => {
  let navigate = useNavigate();

  return (
    <div className="cursos">
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        <ButtonStyled title="Crear Curso" action={() => navigate('/crearCurso')} />
        <Search />
      </div>

      <article className="flex flex-col gap-y-4">
        <CardStyled>
          <Link to={'curso1'} className="block min-h-30">
            <h3>Curso 1</h3>
          </Link>
        </CardStyled>

        <CardStyled>
          <Link to={'curso2'} className="block min-h-30">
            <h3>Curso 2</h3>
          </Link>
        </CardStyled>
      </article>
    </div>
  );
};

export default ListarCursos;
