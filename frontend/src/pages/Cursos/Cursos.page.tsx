import { useEffect, useState } from 'react';
import ListarCursos from './components/ListarCursos';
import api from '@/api/client';
import RequireRole from '@/components/RequireRole';
import Search from '@/components/Search';
import LinkButtonStyled from '@/components/styles/LinkButton.style';
import CardStyled from '@/components/styles/Card.style';
import type { Course } from '@/types/Course.type';

type Props = {};
const CursosPage = ({}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState<Course[]>([]);

  useEffect(() => {
    const getCursos = async () => {
      const res = await api.get<Course[]>('/courses');
      setCursos(res.data);
    };

    try {
      getCursos();
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="cursos">
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        <RequireRole allowedRoles={['ADMIN', 'PROFESOR']}>
          <LinkButtonStyled title="Crear Curso" to="/crearCurso" />
        </RequireRole>

        <Search />
      </div>

      {loading && (
        <CardStyled className="loading">
          <p>Loading</p>
        </CardStyled>
      )}
      {error && (
        <CardStyled className="error">
          <p>Error</p>
        </CardStyled>
      )}

      {!loading && !error && <ListarCursos courses={cursos} />}
    </div>
  );
};

export default CursosPage;
