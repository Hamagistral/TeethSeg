import { LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Sign() {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/sign-up")} className="flex-box w-40 h-12 cursor-pointer uppercase text-center">
      <div className="px-6 py-3.5 text-white bg-gray-400 bg-opacity-25 rounded justify-start items-start gap-2.5 inline-flex hover:bg-white hover:text-blue-900">
        <div className="flex-box text-base font-semibold leading-tight  ">
          Sign up &nbsp;
          <LogIn />
        </div>
      </div>
    </div>
  );
}

export default Sign;
