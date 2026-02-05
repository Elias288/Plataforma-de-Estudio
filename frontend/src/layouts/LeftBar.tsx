import CardStyled from '@/components/styles/Card.style';
import LinkStyled from '@/components/styles/Link.Style';

const LeftBar = () => {
  return (
    <nav className="left__bar h-full">
      <CardStyled className="h-full md:pl-5">
        <div className="cursos">
          <h2 className="text-2xl text-gray-500">Cursos</h2>

          <ul className="list-disc list-inside">
            <li>
              <LinkStyled to={'/crearCurso'}>Crear curso</LinkStyled>
            </li>
          </ul>

          <h3 className="text-xl text-gray-500">Lista de cursos</h3>
          <ul className="list-disc list-inside">
            <li>
              <LinkStyled to={'/'}>Programación Web</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Programación Visual Basic</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Programación Java</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Diseño Gráfico</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Mantenimiento I</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Mantenimiento II</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Office 2000</LinkStyled>
            </li>
          </ul>
        </div>

        <hr className="border-gray-300 my-5" />

        <div className="usuarios">
          <h2 className="text-2xl text-gray-500">Usuarios</h2>

          <ul className="list-disc list-inside">
            <li>
              <LinkStyled to={'/'}>Crear Usuarios</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'/'}>Listar Usuarios</LinkStyled>
            </li>
          </ul>
        </div>
      </CardStyled>
    </nav>
  );
};

export default LeftBar;
