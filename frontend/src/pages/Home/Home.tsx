import Search from '@/components/Search';
import ButtonStyled from '@/components/styles/Button.style';
import CardStyled from '@/components/styles/Card.style';

type Props = {};
const Home = ({}: Props) => {
  return (
    <div className="home ">
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        <ButtonStyled title="Clases" />
        <ButtonStyled title="Entregas" />
        <ButtonStyled title="Reconocimientos" />
        <Search />
      </div>

      <article className="wall__content flex flex-col gap-y-4">
        <CardStyled>
          <h3>Post 1</h3>
        </CardStyled>
        <CardStyled>
          <h3>Post 2</h3>
        </CardStyled>
        <CardStyled>
          <h3>Post 3</h3>
        </CardStyled>
      </article>
    </div>
  );
};

export default Home;
