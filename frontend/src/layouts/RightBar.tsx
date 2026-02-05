import { Calendar } from '@/components/Calendar';
import { Link } from 'react-router-dom';

const RightBar = () => {
  return (
    <aside className="right__bar ">
      <div className="bg-white mb-2 rounded-2xl p-3 shadow-md">
        <h2 className="text-2xl text-gray-500">Calendario</h2>
        <Calendar
          markedDates={[{ date: '2026-02-10', color: '#869ffa', label: 'Entrega ejercicio 1' }]}
          year={new Date().getFullYear()}
          month={new Date().getMonth()}
        />
      </div>

      <div className="bg-white mb-2 rounded-2xl p-3 shadow-md">
        <h2 className="text-2xl text-gray-500">Últimas tareas</h2>
        <ul className="list-disc list-inside">
          <li>
            <Link to={'/cursos/curso_1/ejercicio_1'} className="text-sky-600">
              Ejercicio 1
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightBar;
