
function Logo() {
  return (
    <div className="w-48 h-10 justify-start items-start gap-6 inline-flex">
      <img className="w-10 h-10 border" src="logo.png" alt='logo' />
      <div className="">
        <span className="text-white text-3xl font-bold">Teeth</span>
        <span className="text-white text-3xl font-light">Seg</span>
      </div>
    </div>
  )
}

export default Logo