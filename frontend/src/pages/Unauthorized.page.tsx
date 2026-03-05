import CardStyled from '@/components/styles/Card.style';
import LinkStyled from '@/components/styles/Link.Style';

type Props = {};
const UnauthorizedPage = ({}: Props) => {
  return (
    <div>
      <CardStyled>
        <h2 className="text-2xl">Ruta no autorizada</h2>

        <LinkStyled to={'/'}>Volver</LinkStyled>
      </CardStyled>
    </div>
  );
};

export default UnauthorizedPage;
