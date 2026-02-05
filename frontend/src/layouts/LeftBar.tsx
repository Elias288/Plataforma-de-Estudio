import { Link } from 'react-router-dom';

const LeftBar = () => {
  return (
    <nav className="left__bar h-full bg-white rounded-2xl p-3 shadow-md ">
      <div className="cursos">
        <h2 className="text-2xl text-gray-500">Cursos</h2>

        <ul className="list-disc list-inside">
          <li>
            <Link to={'/crearCurso'} className="text-sky-600">
              Crear curso
            </Link>
          </li>
        </ul>

        <h3 className="text-xl text-gray-500">Lista de cursos</h3>
        <ul className="list-disc list-inside">
          <li>
            <Link to={'/'} className="text-sky-600">
              Programación Web
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Programación en Visual Basic
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Programación en Java
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Diseño Gráfico
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Mantenimiento I
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Mantenimiento II
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Office 2000
            </Link>
          </li>
        </ul>
      </div>

      <hr className="border-gray-300 my-5" />

      <div className="usuarios">
        <h2 className="text-2xl text-gray-500">Usuarios</h2>

        <ul className="list-disc list-inside">
          <li>
            <Link to={'/'} className="text-sky-600">
              Crear Usuarios
            </Link>
          </li>
          <li>
            <Link to={'/'} className="text-sky-600">
              Listar Usuarios
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LeftBar;
