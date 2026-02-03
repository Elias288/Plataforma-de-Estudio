import CrearCurso from './components/CrearCurso';
import ListarCursos from './components/ListarCursos';

type Props = {
  option: 'crear' | 'listar';
};
const CursosPage = ({ option }: Props) => {
  return <>{option === 'listar' ? <ListarCursos /> : <CrearCurso />}</>;
};

export default CursosPage;
