import { useParams } from 'react-router-dom';
import CardStyled from '@/components/styles/Card.style';
import LinkStyled from '@/components/styles/Link.Style';
import { useEffect, useState } from 'react';
import api from '@/api/client';
import { type Course, type Submission, type Task } from '@/context/AuthContext';
import RequireRole from '@/components/RequireRole';

type Props = {};
const InfoCurso = ({}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [tareas, setTareas] = useState<Task[]>([]);
  const [entregas, setEntregas] = useState<Submission[]>([]);
  let params = useParams();

  useEffect(() => {
    const getInfo = async (name: string) => {
      const res = await api.get<Course[]>('/courses');
      const cursos = res.data;
      const cursoId = cursos.find((c) => c.name === name)?.id;

      const infoCurso = await api.get<Course>(`/courses/${cursoId}`);
      const submissions = await api.get<Submission[]>(`/courses/${cursoId}/submissions`);
      setCourse(infoCurso.data);
      setTareas(infoCurso.data.tasks);
      setEntregas(submissions.data.filter((s) => s !== null));
    };

    try {
      if (params.cursoId) getInfo(params.cursoId);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="cursos">
        <article className="flex flex-col gap-y-4">
          <CardStyled>
            <p>Cargando...</p>
          </CardStyled>
        </article>
      </div>
    );

  if (error)
    return (
      <div className="cursos">
        <article className="flex flex-col gap-y-4">
          <CardStyled>
            <p>{error}</p>
          </CardStyled>
        </article>
      </div>
    );

  return (
    <div className="cursos">
      <article className="flex flex-col gap-y-4">
        <CardStyled>
          <h2 className="text-2xl text-gray-600">{course?.name}</h2>
          <p>{course?.description}</p>

          <p>
            <strong>Profesor:</strong> {course?.professor.email}
          </p>
        </CardStyled>

        {/* Vista de tareas para profesor y admin */}
        <RequireRole allowedRoles={['ADMIN', 'PROFESOR']}>
          <CardStyled>
            <h3 className="text-xl text-gray-600">Tareas</h3>

            <ul className="list-disc list-inside">
              {tareas.length === 0 && <p className="text-gray-400">Sin Tareas</p>}
              {tareas.map((t, key) => (
                <li key={key}>
                  <LinkStyled to={encodeURIComponent(t.title)}>
                    {t.title}{' '}
                    {t.dueDate !== null ? `- ${new Date(t.dueDate).toLocaleDateString()}` : ''}
                  </LinkStyled>
                </li>
              ))}
            </ul>
          </CardStyled>
        </RequireRole>

        {/* Vista de tareas para alumnos */}
        <RequireRole allowedRoles={['ALUMNO']}>
          <CardStyled>
            <h3 className="text-xl text-gray-600">Tareas por Hacer</h3>

            <ul className="list-disc list-inside">
              {tareas.length === 0 && <p className="text-gray-400">Sin Tareas</p>}

              {tareas
                .filter((tarea) => entregas.find((e) => e.taskId !== tarea.id))
                .map((t, key) => (
                  <li key={key}>
                    <LinkStyled to={encodeURIComponent(t.title)}>
                      {t.title}{' '}
                      {t.dueDate !== null ? `- ${new Date(t.dueDate).toLocaleDateString()}` : ''}
                    </LinkStyled>
                  </li>
                ))}
            </ul>
          </CardStyled>

          <CardStyled>
            <h3 className="text-xl text-gray-600">Tareas Hechas</h3>

            {tareas.length === 0 && <p className="text-gray-400">Sin Tareas</p>}
            <ul className="list-disc list-inside">
              {tareas
                .filter(
                  (tarea) => entregas.length > 0 && entregas.find((e) => e.taskId === tarea.id),
                )
                .map((t, key) => (
                  <li key={key}>
                    <LinkStyled to={encodeURIComponent(t.title)}>
                      {t.title}{' '}
                      {t.dueDate !== null ? `- ${new Date(t.dueDate).toLocaleDateString()}` : ''}
                    </LinkStyled>
                  </li>
                ))}
            </ul>
          </CardStyled>
        </RequireRole>
      </article>
    </div>
  );
};

export default InfoCurso;
