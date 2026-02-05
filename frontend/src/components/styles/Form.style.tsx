import CardStyled from './Card.style';

type Props = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};
const FormStyled = ({ children, className, containerClassName }: Props) => {
  return (
    <CardStyled className={`max-w-125 w-full mx-auto rounded-sm px-10 py-5 ${containerClassName}`}>
      <form className={`flex flex-col gap-10 ${className}`}>{children}</form>
    </CardStyled>
  );
};

export default FormStyled;
