// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <div className="w-full h-96 flex-box flex-col bg-gray-950 scroll-smooth text-center">
      <div className="top-footer w-full flex-box pb-12">
        <div className="w-96 text-white text-3xl font-medium leading-10">
          Please feel free to
          <br />
          get in touch with us
        </div>
        <div className="h-24">
          
          {/* <FontAwesomeIcon icon="fa-solid fa-location-dot" /> */}
          <i className="fa-solid fa-location-dot"></i>
          <div className="text-white text-lg font-semibold leading-normal">
            Our Location
          </div>
          <div className="w-64 text-gray-500 text-base font-normal leading-normal">
            Villa Num 75 Lotissement la gare Mohammedia Maroc
          </div>
        </div>
        <div className="w-52 h-24">
          <div className="text-white text-lg font-semibold leading-norma">
            How Can We Help?
          </div>
          <div className="w-52 text-gray-500 text-base font-normal underline leading-normal">
            +212 5 23 30 04 46
          </div>

          <div className="w-52 text-gray-500 text-base font-normal underline leading-normal">
            3dsmartfactory@gmail.com
          </div>
        </div>
      </div>
      <div className="w-full h-px border border-neutral-200"></div>

      <div className="bottom-footer w-full pt-12 flex-box justify-evenly">
        <div className="pr-1.5 justify-start items-start gap-6 inline-flex">
          <img className="w-10 h-10 border" src="logo.png" />
          <div className="w-36">
            <span className="text-white text-3xl font-bold">Teeth</span>
            <span className="text-white text-3xl font-light">Seg</span>
          </div>
        </div>
        <div className=" text-slate-400 text-base font-normal">
          © 2023 TeethSeg - All Rights Reserved
        </div>
        <div className="w-36 h-4">
          <div className="w-4 h-4">Social media</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
