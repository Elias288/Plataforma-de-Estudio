import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
  className?: string;
};
const LinkStyled = ({ children, to = '/', className }: Props) => {
  return (
    <Link
      to={to}
      className={`text-gray-400 border-b-2 border-gray-300 hover:text-sky-600 hover:border-sky-500 ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkStyled;
