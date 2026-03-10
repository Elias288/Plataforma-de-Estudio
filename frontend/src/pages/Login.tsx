import api from '@/api/client';
import { FormLabel } from '@/components/styles/FormLabel.style';
import { useAuth } from '@/context/AuthContext';
import type { UserLoginInfo } from '@/types/User.type';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const res = await api.post<{ token: string; user: UserLoginInfo }>('/auth/login', {
        email,
        password,
      });
      const { user, token } = res.data;

      login(user, token);

      navigate(from, { replace: true });
    } catch (err: any) {
      if (err.response?.status === 401) setError('Credenciales incorrectas');
      else setError('Error del servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen">
      <section>
        <article className="lg:w-[50%] lg:absolute lg:top-[50%] lg:left-[50%] lg: right-auto lg:translate-y-[-50%]">
          <form
            onSubmit={handleSubmit}
            className="bg-white max-w-125 mx-auto rounded-sm shadow-sm pb-5 flex flex-col gap-10 mb-5"
          >
            <legend className="border-b-4 p-10">
              <h1 className="text-xl font-bold text-center">Plataforma de cursos</h1>
            </legend>

            <h2 className="text-2xl text-gray-500 px-10">Inicia sesión</h2>

            <div className="flex flex-col gap-10 px-10">
              <FormLabel
                inputId="email"
                inputName="email"
                labelText="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel
                inputId="password"
                inputName="pass"
                labelText="Contraseña"
                inputType="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>

            <label className="flex justify-end text-sky-600 px-10">
              <button
                className="bg-white px-4 py-2 border rounded-sm shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-auto"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Ingresando' : 'Iniciar sesión'}
              </button>
            </label>
          </form>

          <div className="registerCard bg-white max-w-125 mx-auto rounded-sm shadow-sm py-5">
            <h2 className="text-2xl text-gray-500 px-10 text-center mb-5">¿Primer Ingreso?</h2>

            <button
              className="mx-auto block bg-sky-600 rounded-sm text-white px-25 py-2 cursor-pointer shadow-md"
              onClick={() => navigate('/registration')}
            >
              OBTÉN TU ACCESO AQUÍ
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Login;
