import { supervisors } from "../../data";

function Supervisors() {
  return (
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
            <h2 className="mb-24 text-4xl tracking-tight font-bold text-white">Our Supervisors</h2>
          </div> 
          <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {supervisors.map((person) => (
                <div key={person.name} className="text-center text-md text-slate-300">
                    <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={person.image} alt="img" />
                    <h3 className="mb-1 text-2xl font-bold tracking-tight text-white">
                        {person.name}
                    </h3>
                    <p className="py-2">{person.job}</p>
                </div>
              ))}
          </div>
      </div> 
    );
}

export default Supervisors;
