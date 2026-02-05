import { Link, useParams } from 'react-router-dom';
import RightBar from '../../layouts/RightBar';
import Footer from '@/layouts/Footer';
import LeftBar from '@/layouts/LeftBar';
import CardStyle from '@/components/styles/card.style';

type Props = {};
const InfoCurso = ({}: Props) => {
  let params = useParams();
  return (
    <>
      <div className="mx-auto w-fit min-h-screen max-w-5xl grid gap-5 px-5 mb-5 md:px-0 md:grid-cols-[28rem_16rem] xl:grid-cols-[16rem_28rem_16rem]">
        <div className="hidden xl:block">
          <LeftBar />
        </div>

        <div className="cursos">
          <article className="flex flex-col gap-y-4">
            <CardStyle>
              <span>
                id: <strong>{params.cursoId}</strong>
              </span>
              <h2 className="text-2xl text-gray-600">Titulo del curso</h2>
              <p>*info del curso</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo mi vitae
                felis finibus, tempus tincidunt massa sodales. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas. Duis libero sem, fringilla
                vel elementum non, imperdiet luctus nulla. Duis mattis lorem porta eros maximus, nec
                rhoncus mauris blandit. Fusce sed arcu eu velit faucibus porta. Praesent pharetra
                tincidunt luctus. Cras egestas lorem urna, at congue dui malesuada at.
              </p>
            </CardStyle>

            <CardStyle>
              <h3 className="text-xl text-gray-600">Tareas por Hacer</h3>

              <ul className="list-disc list-inside">
                <li>
                  <Link to={'ejercicio1'} className="text-sky-600">
                    Ejercicio 1 - 10/02/2026
                  </Link>
                </li>
                <li>
                  <Link to={'ejercicio2'} className="text-sky-600">
                    Ejercicio 2 - 02/03/2026
                  </Link>
                </li>
              </ul>
            </CardStyle>

            <CardStyle>
              <h3 className="text-xl text-gray-600">Tareas Hechas</h3>

              <span>Sin tareas</span>
            </CardStyle>
          </article>
        </div>

        <RightBar />
      </div>

      <Footer />
    </>
  );
};

export default InfoCurso;
