import { Calendar } from '@/components/Calendar';
import CardStyled from '@/components/styles/Card.style';
import LinkStyled from '@/components/styles/Link.Style';

const RightBar = () => {
  return (
    <aside className="right__bar flex flex-col gap-2">
      <CardStyled>
        <h2 className="text-2xl text-gray-500">Calendario</h2>
        <Calendar
          markedDates={[{ date: '2026-02-10', color: '#869ffa', label: 'Entrega ejercicio 1' }]}
          year={new Date().getFullYear()}
          month={new Date().getMonth()}
        />
      </CardStyled>

      <CardStyled>
        <h2 className="text-2xl text-gray-500">Últimas tareas</h2>
        <ul className="list-disc list-inside">
          <li>
            <LinkStyled to={'/cursos/curso_1/ejercicio_1'}>Ejercicio 1</LinkStyled>
          </li>
        </ul>
      </CardStyled>
    </aside>
  );
};

export default RightBar;
