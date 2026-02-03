import Search from '@/components/Search';
import Footer from '@/layouts/Footer';
import RightBar from '@/pages/Home/components/RightBar';
import { useNavigate } from 'react-router-dom';

type Props = {};
const ListarCursos = ({}: Props) => {
  let navigate = useNavigate();

  return (
    <>
      <div className="mx-auto w-fit min-h-screen max-w-5xl grid gap-5 px-5 mb-5 md:px-0 md:grid-cols-[28rem_16rem] ">
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
            <section className="bg-white min-h-50 rounded-2xl p-3 shadow-md">
              <h3>Curso 1</h3>
            </section>
            <section className="bg-white min-h-50 rounded-2xl p-3 shadow-md">
              <h3>Curso 2</h3>
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
