import Search from '@/components/Search';
import Footer from '@/layouts/Footer';
import LeftBar from '@/layouts/LeftBar';
import RightBar from '@/layouts/RightBar';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};
const ListarCursos = ({}: Props) => {
  let navigate = useNavigate();

  return (
    <>
      <div className="mx-auto w-fit min-h-screen max-w-5xl grid gap-5 px-5 mb-5 md:px-0 md:grid-cols-[28rem_16rem] xl:grid-cols-[16rem_28rem_16rem]">
        <div className="hidden xl:block">
          <LeftBar />
        </div>

        <div className="cursos">
          <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
            <button
              onClick={() => navigate('/crearCurso')}
              className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700"
            >
              Crear Curso
            </button>

            <Search />
          </div>

          <article className="flex flex-col gap-y-4">
            <section>
              <Link to={'curso1'} className="bg-white block min-h-50 rounded-2xl p-3 shadow-md">
                <h3>Curso 1</h3>
              </Link>
            </section>

            <section>
              <Link to={'curso2'} className="bg-white block min-h-50 rounded-2xl p-3 shadow-md">
                <h3>Curso 2</h3>
              </Link>
            </section>
          </article>
        </div>

        <RightBar />
      </div>

      <Footer />
    </>
  );
};

export default ListarCursos;
