function MenuItems() {
  return (
    <>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 ">
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-white font-bold" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">Why TeethSeg</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">Start TeethSeg</a>
            </li>
            <li>
              <a href="#" className="block py-2 pl-3 pr-4 text-slate-400 hover:text-white">About Us</a>
            </li>
          </ul>
      </div>
    </>
  );
}

export default MenuItems;
