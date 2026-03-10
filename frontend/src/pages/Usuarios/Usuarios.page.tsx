import api from '@/api/client';
import RequireRole from '@/components/RequireRole';
import Search from '@/components/Search';
import CardStyled from '@/components/styles/Card.style';
import LinkButtonStyled from '@/components/styles/LinkButton.style';
import type { User } from '@/types/User.type';
import { useEffect, useState } from 'react';

type Props = {};
const UsuariosPage = ({}: Props) => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await api.get<User[]>('/user');
        setUsuarios(res.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getUsuarios();
  }, []);

  if (loading)
    return (
      <div>
        <CardStyled>
          <h2>Cargando...</h2>
        </CardStyled>
      </div>
    );
  if (error)
    return (
      <div>
        <CardStyled>
          <h2>Error al cargar usuarios</h2>
          <p>{error}</p>
        </CardStyled>
      </div>
    );

  return (
    <div>
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        <RequireRole allowedRoles={['ADMIN', 'PROFESOR']}>
          <LinkButtonStyled title="Crear Usuario" to="/createUser" />
        </RequireRole>
        <Search />
      </div>

      <article className="wall__content flex flex-col gap-y-4">
        {usuarios?.length > 0 &&
          usuarios.map((u, key) => (
            <CardStyled key={key}>
              <h2 className="text-xl font-bold">
                {u && u.name && u.name?.at(0)?.toUpperCase() + u.name?.slice(1)}
              </h2>
              <p>{u.email}</p>
              <small>{u.role}</small>
            </CardStyled>
          ))}
      </article>
    </div>
  );
};
export default UsuariosPage;
