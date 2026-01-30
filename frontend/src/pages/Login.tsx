import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();

  return (
    <main className="bg-gray-100 min-h-screen">
      <section>
        <article className="lg:w-[50%] lg:absolute lg:top-[50%] lg:left-[50%] lg: right-auto lg:translate-y-[-50%]">
          <form className="bg-white max-w-125 mx-auto rounded-sm shadow-sm pb-5 flex flex-col gap-10 mb-5">
            <legend className="border-b-4 p-10">
              <h1 className="text-xl font-bold text-center">Plataforma de cursos</h1>
            </legend>

            <h2 className="text-2xl text-gray-500 px-10">Inicia sesión</h2>

            <label className="flex flex-col px-10 ">
              <span className="text-gray-800">Correo electrónico</span>
              <input
                type="email"
                name="email"
                className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
              />
            </label>

            <label className="flex flex-col  px-10">
              <span className="text-gray-800">Contraseña</span>
              <input
                type="password"
                name="pass"
                className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
              />
            </label>

            <label className="flex justify-end text-sky-600 px-10">
              <button
                className="bg-white px-4 py-2 border rounded-sm shadow-md cursor-pointer"
                onClick={() => navigate('/')}
              >
                Iniciar sesión
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
