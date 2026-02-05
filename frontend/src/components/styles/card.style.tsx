type Props = {
  className?: String;
  children: React.ReactNode;
};
const CardStyle = ({ children, className }: Props) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md min-h-20 p-3 ${className}`}>{children}</div>
  );
};

export default CardStyle;
