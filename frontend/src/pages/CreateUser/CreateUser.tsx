import { useState } from 'react';
import SelectComponent from '@/components/Select.component';
import FormStyled from '@/components/styles/Form.style';

type Option = {
  value: string;
  label: string;
};
const ROLES: Option[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'profesor', label: 'Profesor' },
  { value: 'alumno', label: 'Alumno' },
];
const COURSES_OPTIONS: Option[] = [
  { value: 'programacion_web', label: 'Programación Web' },
  { value: 'programacion_visualBasic', label: 'Programación Visual Basic' },
  { value: 'programacion_java', label: 'Programación Java' },
  { value: 'diseño_grafico', label: 'Diseño Gráfico' },
  { value: 'mantenimiento_I', label: 'Mantenimiento I' },
  { value: 'mantenimiento_II', label: 'Mantenimiento II' },
  { value: 'office_2000', label: 'Office 2000' },
];

type Props = {};
const CreateUser = ({}: Props) => {
  const [rol, setRol] = useState<Option>();

  const handleSelect = (value: string) => {
    const selectedRol = ROLES.find((r) => r.value === value);
    if (!selectedRol) return;
    setRol(selectedRol);
  };

  return (
    <div
      className="flex flex-col justify-between mb-5"
      style={{ minHeight: 'var(--scroll-min-h)' }}
    >
      <FormStyled>
        <h2 className="text-2xl text-gray-500">Crear Usuario</h2>

        <label className="flex flex-col">
          <span className="text-gray-800">Nombre completo</span>
          <input
            type="text"
            name="name"
            className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-gray-800">Correo electrónico</span>
          <input
            type="email"
            name="email"
            className="border-0 border-b-2 border-b-gray-200 focus-visible:outline-0"
          />
        </label>

        <SelectComponent
          title="Seleccionar Rol"
          options={ROLES}
          single
          changeValue={handleSelect}
        />

        {(rol?.value === 'alumno' || rol?.value === 'profesor') && (
          <SelectComponent
            title="Seleccionar curso"
            options={COURSES_OPTIONS}
            key={String(rol.value)}
          />
        )}

        <div className="flex justify-end text-sky-600 ">
          <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
            Crear
          </button>
        </div>
      </FormStyled>
    </div>
  );
};

export default CreateUser;
