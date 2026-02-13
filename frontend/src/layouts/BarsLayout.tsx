import { Outlet } from 'react-router-dom';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

const BarsLayout = () => {
  return (
    <>
      <div
        className="home__content mx-auto w-fit grid gap-5 px-5 mb-5 md:px-0 md:grid-cols-[28rem_16rem] xl:grid-cols-[16rem_42rem_16rem]"
        style={{ minHeight: 'var(--scroll-min-h)' }}
      >
        <div className="hidden xl:block">
          <LeftBar />
        </div>
        <Outlet />

        <RightBar />
      </div>
    </>
  );
};

export default BarsLayout;
