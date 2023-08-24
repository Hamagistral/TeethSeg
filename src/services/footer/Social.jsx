import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function Social() {
  return (
    <div className="py-3">
      <div className="flex-box text-white">
        <a href="#" className="bg-slate-100 text-slate-900 hover:bg-slate-300 cursor-pointer p-2 m-1 rounded-full ">
          <Facebook size={24} strokeWidth={2} />
        </a>
        <a href="#" className="bg-slate-100 text-slate-900 hover:bg-slate-300 cursor-pointer p-2 m-1 rounded-full">
          <Instagram size={24} strokeWidth={2} />
        </a>
        <a href="#" className="bg-slate-100 text-slate-900 hover:bg-slate-300 cursor-pointer p-2 m-1 rounded-full">
          <Linkedin size={24} strokeWidth={2} />
        </a>
        <a href="#" className="bg-slate-100 text-slate-900 hover:bg-slate-300  cursor-pointer p-2 m-1 rounded-full">
          <Twitter size={24} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default Social;
