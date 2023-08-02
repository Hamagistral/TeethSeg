import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

function Social() {
  return (
    <div className="py-3">
      <div className="flex-box text-white">
        <div className="border cursor-pointer p-2 m-1 rounded-full ">
          <Facebook size={24} strokeWidth={2} />
        </div>
        <div className="border cursor-pointer p-2 m-1 rounded-full">
          <Instagram size={24} strokeWidth={2} />
        </div>
        <div className="border cursor-pointer p-2 m-1 rounded-full">
          <Linkedin size={24} strokeWidth={2} />
        </div>
        <div className="border cursor-pointer p-2 m-1 rounded-full">
          <Twitter size={24} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default Social;
