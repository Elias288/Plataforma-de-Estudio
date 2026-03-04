import { Link } from 'react-router-dom';

type Props = {
  title: string;
  to: string;
};
const LinkButtonStyled = ({ title, to }: Props) => {
  return (
    <Link
      to={to}
      className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700"
    >
      {title}
    </Link>
  );
};

export default LinkButtonStyled;
