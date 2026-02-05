import CardStyled from '@/components/styles/Card.style';

const NotFound = () => {
  return (
    <div className="h-[calc(100dvh-80px-80px-20px)] flex flex-col justify-center">
      <CardStyled className={'mx-auto max-w-125 w-full flex flex-col justify-center'}>
        <h2 className="text-2xl text-center p-10">404 - Página no encontrada</h2>
      </CardStyled>
    </div>
  );
};

export default NotFound;
