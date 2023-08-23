import { Mail, MapPin } from "lucide-react";

function TopFooter() {
  return (
    <div className="bg-slate-900/75 rounded-full w-full top-footer flex-box justify-around flex-col md:flex-row p-12 mb-12">
      <div className="text-white text-3xl font-medium leading-10 px-12">
        Please feel free to
        <br />
        get in touch with us
      </div>
      <div className="py-5 flex-box flex-col gap-6 px-12">
        <MapPin size={28} strokeWidth={2.5} color="white" />
        <div className="py-1 text-white text-lg font-semibold leading-normal">
          Our Location
        </div>
        <div className="py-1 w-64 text-gray-500 text-base font-normal leading-normal">
          Villa Num 75 Lotissement la gare Mohammedia Maroc
        </div>
      </div>
      <div className="py-5 flex-box flex-col">
        <Mail size={28} strokeWidth={2.5} color="white" />
        <div className="py-1 text-white text-lg font-semibold leading-norma">
          How Can We Help?
        </div>
        <div className="py-1 w-52 text-gray-500 text-base font-normal underline leading-normal">
          +212 5 23 30 04 46
        </div>

        <div className="py-1 w-52 text-gray-500 text-base font-normal underline leading-normal">
          3dsmartfactory@gmail.com
        </div>
      </div>
    </div>
  );
}

export default TopFooter;
