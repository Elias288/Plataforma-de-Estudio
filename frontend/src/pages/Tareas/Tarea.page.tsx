import CardStyled from '@/components/styles/Card.style';
import FormStyled from '@/components/styles/Form.style';
import { FormLabel, FormTextArea } from '@/components/styles/FormLabel.style';
import { useParams } from 'react-router-dom';

type Props = {};
const TareaPage = ({}: Props) => {
  let params = useParams();
  return (
    <div
      className="flex flex-col justify-between mb-5"
      style={{ minHeight: 'var(--scroll-min-h)' }}
    >
      <div>
        <CardStyled className={'mx-auto max-w-125 w-full mb-5'}>{params.tareaId}</CardStyled>

        <FormStyled containerClassName="rounded-2xl mb-5">
          <h3 className="text-xl text-gray-600">Entrega</h3>

          <FormTextArea inputId="description" inputName="description" labelText="Descripción" />

          <FormLabel inputId="url" inputName="url" inputType="url" labelText="URL" />

          <div className="flex justify-end text-sky-600 ">
            <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
              Entregar
            </button>
          </div>
        </FormStyled>

        <CardStyled className={'mx-auto max-w-125 w-full mb-5'}>
          <h3>Mis Entregas</h3>
        </CardStyled>
      </div>
    </div>
  );
};
export default TareaPage;
