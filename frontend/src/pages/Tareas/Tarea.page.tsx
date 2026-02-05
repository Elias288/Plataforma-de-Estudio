import CardStyle from '@/components/styles/card.style';
import Footer from '@/layouts/Footer';
import { useParams } from 'react-router-dom';

type Props = {};
const TareaPage = ({}: Props) => {
  let params = useParams();
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <CardStyle className={'mx-auto max-w-125 w-full mb-5'}>{params.tareaId}</CardStyle>

        <CardStyle className={'mx-auto max-w-125 w-full mb-5'}>
          <form className="flex flex-col gap-10">
            <h3 className="text-xl text-gray-600">Entrega</h3>
            <label className="flex flex-col">
              <span className="text-gray-800">Descripción</span>
              <input
                type="text"
                name="Descripción"
                id="description"
                className="border-0 border-b-2 border-b-gray-200 focus:outline-none"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-800">URL</span>
              <input
                type="url"
                name="Url"
                id="url"
                className="border-0 border-b-2 border-b-gray-200 focus:outline-none"
              />
            </label>

            <div className="flex justify-end text-sky-600 ">
              <button className="bg-sky-600 rounded-sm text-white px-3 py-1 cursor-pointer">
                Entregar
              </button>
            </div>
          </form>
        </CardStyle>

        <CardStyle className={'mx-auto max-w-125 w-full mb-5'}>
          <h3>Mis Entregas</h3>
        </CardStyle>
      </div>

      <Footer />
    </div>
  );
};
export default TareaPage;
