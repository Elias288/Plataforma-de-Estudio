type Props = {
  title: string;
  action?: () => void;
};
const ButtonStyled = ({ title, action }: Props) => {
  return (
    <button
      onClick={action}
      className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700"
    >
      {title}
    </button>
  );
};

export default ButtonStyled;
