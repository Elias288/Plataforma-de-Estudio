import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  let navigate = useNavigate();

  return (
    <main className="bg-gray-100 min-h-screen">
      <section>
        <article className="lg:w-[50%] lg:absolute lg:top-[50%] lg:left-[50%] lg: right-auto lg:translate-y-[-50%]">
          <form className="bg-white max-w-125 mx-auto rounded-sm shadow-sm pb-5 flex flex-col gap-10 mb-5">
            <legend className="border-b-4 p-10">
              <h1 className="text-xl font-bold text-center">Plataforma de cursos</h1>
            </legend>

            <h2 className="text-2xl text-gray-500 px-10">Registrate</h2>

            <label className="flex flex-col px-10 ">
              <span className="text-gray-800">Correo electrónico</span>
              <input
                type="email"
                name="email"
                className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
              />
            </label>

            <label className="px-10">
              <input type="checkbox" name="terminosYCondiciones" id="terminos" />{' '}
              <span className="select-none">
                Acepto los{' '}
                <a
                  href="http://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600"
                >
                  Términos de Servicio
                </a>{' '}
                y reconozco haber leído el{' '}
                <a
                  href="http://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600"
                >
                  Aviso de Privacidad
                </a>
              </span>
            </label>

            <label className="flex justify-end text-sky-600 px-10">
              <button
                onClick={() => navigate('/')}
                className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer"
              >
                CONTINUAR
              </button>
            </label>
          </form>
          <span className="block max-w-125 mx-auto text-center">
            ¿Ya estás registrado?{' '}
            <Link className="text-sky-600" to={'/login'}>
              Inicia sesión
            </Link>
          </span>
        </article>
      </section>
    </main>
  );
};

export default Registration;
