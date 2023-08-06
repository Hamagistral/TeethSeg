<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

=======
>>>>>>> bf3c2ee7c321a937b5894f5690e92cb7596d1a2f
function Logo() {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div onClick={() => navigate("/")} className="w-48 h-10 flex-box cursor-pointer">
      <img className="w-10 h-10 mx-1" src="logo.png" alt='logo' />
      <div className="">
        <span className="text-white text-3xl font-bold">Teeth</span>
        <span className="text-white text-3xl font-light">Seg</span>
      </div>
    </div>
=======
    <a href="/" className="flex items-center">
      <img className="h-8 mr-3" src="logo.png" alt="TeethSeg Logo" />
      <span className="self-center text-2xl font-bold whitespace-nowrap text-white ml-2">Teeth</span>
      <span className="self-center text-2xl font-medium whitespace-nowrap text-white">Seg</span>
    </a>
>>>>>>> bf3c2ee7c321a937b5894f5690e92cb7596d1a2f
  )
}

export default Logo;
