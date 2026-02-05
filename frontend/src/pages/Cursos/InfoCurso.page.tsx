import { useParams } from 'react-router-dom';
import CardStyled from '@/components/styles/Card.style';
import LinkStyled from '@/components/styles/Link.Style';

type Props = {};
const InfoCurso = ({}: Props) => {
  let params = useParams();
  return (
    <div className="cursos">
      <article className="flex flex-col gap-y-4">
        <CardStyled>
          <span>
            id: <strong>{params.cursoId}</strong>
          </span>
          <h2 className="text-2xl text-gray-600">Titulo del curso</h2>
          <p>*info del curso</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo mi vitae felis
            finibus, tempus tincidunt massa sodales. Pellentesque habitant morbi tristique senectus
            et netus et malesuada fames ac turpis egestas. Duis libero sem, fringilla vel elementum
            non, imperdiet luctus nulla. Duis mattis lorem porta eros maximus, nec rhoncus mauris
            blandit. Fusce sed arcu eu velit faucibus porta. Praesent pharetra tincidunt luctus.
            Cras egestas lorem urna, at congue dui malesuada at.
          </p>
        </CardStyled>

        <CardStyled>
          <h3 className="text-xl text-gray-600">Tareas por Hacer</h3>

          <ul className="list-disc list-inside">
            <li>
              <LinkStyled to={'ejercicio1'}>Ejercicio 1 - 10/02/2026</LinkStyled>
            </li>
            <li>
              <LinkStyled to={'ejercicio2'}>Ejercicio 2 - 02/03/2026</LinkStyled>
            </li>
          </ul>
        </CardStyled>

        <CardStyled>
          <h3 className="text-xl text-gray-600">Tareas Hechas</h3>

          <span>Sin tareas</span>
        </CardStyled>
      </article>
    </div>
  );
};

export default InfoCurso;
