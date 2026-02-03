import { useState } from 'react';
import Footer from '../../layouts/Footer';
import SelectComponent from '@/components/Select.component';

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
    <div className="flex flex-col justify-between h-screen">
      <div className="bg-white max-w-125 w-full mx-auto rounded-sm px-10 py-5">
        <form className="flex flex-col gap-10">
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
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUser;
