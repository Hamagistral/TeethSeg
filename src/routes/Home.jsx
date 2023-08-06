import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex-box flex-col">
      <Header />
      <div className="text-center h-screen overflow-hidden bg-cover bg-no-repeat w-full py-10 flex-box flex-col scroll-smooth home">
        <div
          className="h-full w-full overflow-hidden bg-fixed"
        >
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 text-5xl font-bold">TeethSeg</h1>
              <h3 className="mb-8 text-3xl font-bold">The best of automated end-to-end 3D file segmentation approch. Your 3D models, well used, will allow us to do great things, let us take care of it.</h3>
              <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => navigate("/start")} 
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
