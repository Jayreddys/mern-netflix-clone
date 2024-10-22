import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 w-full ">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix" className="h-12" />
        </Link>
      </header>
      <main className="text-center error-page--content z-10 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-light mb-4 font-serif">Lost your way?</h1>
        <p className="mb-8 text-xl md:max-w-[80%]">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </p>
        <Link
          to={"/"}
          className="bg-red-700 text-white py-2 px-4 font-bold rounded hover:scale-105 transition ease-in-out"
        >
          Netflix Home
        </Link>
      </main>
    </div>
  );
};
export default NotFoundPage;
