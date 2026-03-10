import CardStyled from '@/components/styles/Card.style';
import type { Course } from '@/types/Course.type';
import { Link } from 'react-router-dom';

type Props = {
  courses: Course[];
};
const ListarCursos = ({ courses }: Props) => {
  return (
    <article className="flex flex-col gap-y-4">
      {courses.map((c, key) => (
        <CardStyled key={key}>
          <Link to={encodeURIComponent(c.name)} className="block min-h-30">
            <h3 className="text-2xl">{c.name}</h3>
            <p>{c.description}</p>
          </Link>
        </CardStyled>
      ))}
    </article>
  );
};

export default ListarCursos;
