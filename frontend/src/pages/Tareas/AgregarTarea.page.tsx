import FormStyled from '@/components/styles/Form.style';
import { FormLabel, FormTextArea } from '@/components/styles/FormLabel.style';
import { useParams } from 'react-router-dom';

const AgregarTarea = () => {
  let params = useParams();

  return (
    <div className="flex flex-col gap-5">
      <FormStyled>
        <div>
          <h2>Agregar Tarea</h2>
          <p>
            <strong>Curso: </strong> {params.cursoId}
          </p>
        </div>

        <FormLabel inputId="title" inputName="titulo" labelText="Titulo" />

        <FormTextArea inputId="description" inputName="descripcion" labelText="Descripción" />

        <div className="flex justify-end text-sky-600 ">
          <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
            Agregar
          </button>
        </div>
      </FormStyled>
    </div>
  );
};

export default AgregarTarea;
