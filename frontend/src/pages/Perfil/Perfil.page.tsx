import api from '@/api/client';
import CardStyled from '@/components/styles/Card.style';
import { useAuth, type User } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

type Props = {};
const PerfilPage = ({}: Props) => {
  const { isAuthenticated, logout } = useAuth();

  const [perfil, setPerfil] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const response = await api.get<User>('/auth/userInfo');
        setPerfil(response.data);
      } catch (error: any) {
        if (error.response?.status === 401) logout();
        else setError('Error al obtener el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  if (loading)
    return (
      <div className="flex flex-col justify-between mb-5 min-h-(--scroll-min-h)">
        <CardStyled className="mx-auto max-w-125 w-full">Cargando</CardStyled>
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!perfil) return null;

  return (
    <div className="flex flex-col justify-between mb-5 min-h-(--scroll-min-h)">
      <div>
        <CardStyled className="mx-auto max-w-200 w-full mb-5">
          <h2 className="text-3xl font-bold">Mi Perfil</h2>

          <ul>
            <li>{perfil.name}</li>
            <li>{perfil.email}</li>
            {perfil.age && <li>{perfil.age}</li>}
            {perfil.gender && <li>{perfil.gender}</li>}
            <li>{perfil.role}</li>
            <li>{perfil.createdAt?.toString()}</li>
          </ul>
        </CardStyled>

        {perfil.courses!.length > 0 && (
          <CardStyled className="mx-auto max-w-200 w-full mb-5">
            <h3 className="text-2xl">Cursos</h3>
            <ul className="list-disc pl-5">
              {perfil.courses?.map((c, key) => (
                <li key={key}>
                  {c.name}: {c.description}
                </li>
              ))}
            </ul>
          </CardStyled>
        )}
      </div>
    </div>
  );
};

export default PerfilPage;
