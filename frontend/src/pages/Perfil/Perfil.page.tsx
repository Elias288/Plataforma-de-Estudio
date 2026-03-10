import CardStyled from '@/components/styles/Card.style';
import { useAuth } from '@/context/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';

type Props = {};
const PerfilPage = ({}: Props) => {
  const { logout } = useAuth();
  const { perfil, loading, error } = useUserProfile();

  if (loading)
    return (
      <div className="flex flex-col justify-between mb-5 min-h-(--scroll-min-h)">
        <CardStyled className="mx-auto max-w-125 w-full">Cargando</CardStyled>
      </div>
    );
  if (error) {
    logout();
  }
  if (!perfil) return null;

  return (
    <div className="flex flex-col justify-between mb-5 min-h-(--scroll-min-h)">
      <div>
        <CardStyled className="mx-auto max-w-200 w-full mb-5">
          <h2 className="text-3xl font-bold">Mi Perfil</h2>

          <ul>
            <li>
              {perfil && perfil.name && perfil.name?.at(0)?.toUpperCase() + perfil.name?.slice(1)}
            </li>
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
