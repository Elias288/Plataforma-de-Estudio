import Search from '@/components/Search';

const Wall = () => {
  return (
    <div className="wall">
      <div className="wall__top flex flex-wrap gap-x-5 gap-y-3 pb-5 mb-5 border-b-2 border-gray-200">
        <button className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700">
          Clases
        </button>
        <button className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700">
          Entregas
        </button>
        <button className="bg-white rounded-4xl text-gray-500 py-2 px-3 shadow-md cursor-pointer hover:bg-sky-100 hover:text-blue-500 transition duration-700">
          Reconocimientos
        </button>

        <Search />
      </div>

      <article className="wall__content flex flex-col gap-y-4">
        <section className="bg-white min-h-50 rounded-2xl p-3 shadow-md">
          <h3>Post 1</h3>
        </section>
        <section className="bg-white min-h-50 rounded-2xl p-3 shadow-md">
          <h3>Post 2</h3>
        </section>
        <section className="bg-white min-h-50 rounded-2xl p-3 shadow-md">
          <h3>Post 3</h3>
        </section>
      </article>
    </div>
  );
};

export default Wall;
