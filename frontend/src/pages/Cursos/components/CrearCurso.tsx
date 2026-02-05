import SelectComponent from '@/components/Select.component';
import FormStyled from '@/components/styles/Form.style';
import { FormLabel, FormTextArea } from '@/components/styles/FormLabel.style';

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
    <div
      className="flex flex-col justify-between mb-5"
      style={{ minHeight: 'var(--scroll-min-h)' }}
    >
      <FormStyled>
        <h2 className="text-2xl text-gray-500">Crear Curso</h2>

        <FormLabel inputId="title" inputName="title" labelText="Titulo del Curso" />

        <FormTextArea inputId="description" inputName="description" labelText="Descripción" />

        {/* En caso de ser administrador, seleccionar profesor */}
        <SelectComponent title="Seleccionar profesor" options={PROFESORES} single />

        <hr className="border-gray-200" />

        <SelectComponent title="Seleccionar alumnos" options={ALUMNOS} />

        <div className="flex justify-end text-sky-600 ">
          <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
            Crear
          </button>
        </div>
      </FormStyled>
    </div>
  );
};

export default CrearCurso;
