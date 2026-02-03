import SelectComponent from '@/components/Select.component';
import Footer from '@/layouts/Footer';

type Option = {
  value: string;
  label: string;
};
const PROFESORES: Option[] = [
  { value: 'id_1', label: 'Diego' },
  { value: 'id_2', label: 'Andrés' },
  { value: 'id_3', label: 'Ramiro' },
];

const ALUMNOS: Option[] = [
  { value: 'id_1', label: 'Agustín' },
  { value: 'id_2', label: 'Pablo' },
  { value: 'id_3', label: 'Carlos' },
];

type Props = {};
const CrearCurso = ({}: Props) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="bg-white max-w-125 w-full mx-auto rounded-sm px-10 py-5">
        <form className="flex flex-col gap-10">
          <h2 className="text-2xl text-gray-500">Crear Curso</h2>

          <label className="flex flex-col">
            <span className="text-gray-800">Titulo del curso</span>
            <input
              type="text"
              name="title"
              className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-gray-800">Descripción</span>
            <textarea
              name="description"
              rows={1}
              className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
            />
          </label>

          {/* En caso de ser administrador, seleccionar profesor */}
          <SelectComponent title="Seleccionar profesor" options={PROFESORES} single />

          <hr className="border-gray-200" />

          <SelectComponent title="Seleccionar alumnos" options={ALUMNOS} />

          <div className="flex justify-end text-sky-600 ">
            <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
              Crear
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CrearCurso;
