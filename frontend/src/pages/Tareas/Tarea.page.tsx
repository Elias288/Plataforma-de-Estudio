import api from '@/api/client';
import RequireRole from '@/components/RequireRole';
import CardStyled from '@/components/styles/Card.style';
import FormStyled from '@/components/styles/Form.style';
import { FormLabel, FormTextArea } from '@/components/styles/FormLabel.style';
import type { Course } from '@/types/Course.type';
import type { Submission } from '@/types/Submission.type';
import type { Task } from '@/types/Task.type';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {};
const TareaPage = ({}: Props) => {
  let params = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tarea, setTarea] = useState<Task | undefined>(undefined);
  const [entregas, setEntregas] = useState<Submission[]>([]);

  useEffect(() => {
    const getInfo = async (name: string) => {
      const res = await api.get<Course[]>('/courses');
      const cursos = res.data;
      const cursoId = cursos.find((c) => c.name === name)?.id;

      const infoCurso = await api.get<Course>(`/courses/${cursoId}`);
      const submissions = await api.get<Submission[]>(`/courses/${cursoId}/submissions`);
      const tareaActual = infoCurso.data.tasks.find((t) => t.title === params.tareaId);
      setTarea(tareaActual);
      setEntregas(submissions.data.filter((s) => s !== null && s.taskId === tareaActual?.id));
    };

    try {
      if (params.cursoId) getInfo(params.cursoId);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col justify-between mb-5"
        style={{ minHeight: 'var(--scroll-min-h)' }}
      >
        <CardStyled className="mx-auto max-w-125 w-full mb-5">
          <h2 className="text-3xl">Cargando...</h2>
        </CardStyled>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col justify-between mb-5"
        style={{ minHeight: 'var(--scroll-min-h)' }}
      >
        <CardStyled className="mx-auto max-w-125 w-full mb-5">
          <h2 className="text-3xl">Error</h2>
        </CardStyled>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-between mb-5"
      style={{ minHeight: 'var(--scroll-min-h)' }}
    >
      <div>
        <CardStyled className={'mx-auto max-w-125 w-full mb-5'}>
          <h2 className="text-2xl">{tarea?.title}</h2>
          <small>{tarea?.id}</small>
          <p>{tarea?.description}</p>
          <p>
            <span>Fecha de entrega: </span>
            <span className="text-gray-500">
              {tarea?.dueDate ? new Date(tarea.dueDate).toLocaleDateString() : 'Sin limite'}
            </span>
          </p>
        </CardStyled>

        {/* Vista de alumno */}
        <RequireRole allowedRoles={['ALUMNO']}>
          <div className="pt-5 border-t-2 border-gray-200 max-w-125 w-full mx-auto">
            <FormStyled containerClassName="rounded-2xl mb-5">
              <h3 className="text-xl text-gray-600">Entrega</h3>

              <FormTextArea inputId="description" inputName="description" labelText="Descripción" />

              <FormLabel inputId="url" inputName="url" inputType="url" labelText="URL" />

              <div className="flex justify-end text-sky-600 ">
                <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
                  Entregar
                </button>
              </div>
            </FormStyled>
          </div>

          <CardStyled className="mx-auto max-w-125 w-full mb-5">
            <h3 className="text-2xl">Entrega</h3>

            {entregas.length > 0 && (
              <ul>
                {entregas.map((e, key) => (
                  <li key={key} className="flex justify-between gap-5 px-3 py-2">
                    <span>{new Date(e.createdAt).toLocaleDateString()}</span>

                    <span className="flex-1">{e.description}</span>
                    <span>
                      <a href={e.repoUrl} target="_blank" rel="noopener noreferrer">
                        {e.repoUrl}
                      </a>
                    </span>
                    {e.grade || e.feedback ? (
                      <span title="Corregido" className="cursor-wait">
                        ✅
                      </span>
                    ) : (
                      <span title="Pendiente de corrección" className="cursor-progress">
                        🟧
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {entregas.length === 0 && <p className="text-gray-500">Pendiente</p>}
          </CardStyled>
        </RequireRole>

        {/* Vista de administrador y profesor */}
        <RequireRole allowedRoles={['ADMIN', 'PROFESOR']}>
          <CardStyled className={'mx-auto max-w-125 w-full mb-5'}>
            <h3 className="text-2xl">Entregas</h3>
          </CardStyled>
          <pre>{JSON.stringify(entregas, null, 2)}</pre>
        </RequireRole>
      </div>
    </div>
  );
};
export default TareaPage;
