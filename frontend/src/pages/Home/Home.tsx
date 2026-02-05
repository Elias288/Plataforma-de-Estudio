import Wall from '@/pages/Home/components/Wall';
import RightBar from '@/layouts/RightBar';
import Footer from '@/layouts/Footer';
import LeftBar from '@/layouts/LeftBar';

type Props = {};
const Home = ({}: Props) => {
  return (
    <div className="home ">
      <div className="home__content mx-auto w-fit min-h-screen max-w-5xl grid gap-5 px-5 mb-5 md:px-0 md:grid-cols-[28rem_16rem] xl:grid-cols-[16rem_28rem_16rem]">
        <div className="hidden xl:block">
          <LeftBar />
        </div>

        <Wall />

        <RightBar />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
