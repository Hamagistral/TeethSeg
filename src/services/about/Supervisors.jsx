import { supervisors } from "../../data";

function Supervisors() {
  return (
    <div className="scroll-tap font-bold my-56 w-full">
      <h2 className="flex-box text-7xl font-extrabold pb-16 text">Our Supervisors</h2>
      <ul className="flex-box flex-col md:divide-y-0 justify-around md:flex-row divide-y">
        {supervisors.map((person) => (
          <li key={person.name} className="colab py-4 flex-box flex-col">
            <img className="team-img" src={person.image} alt="img" />
            <div className="ml-3 flex-box flex-col">
              <p className="text-2xl font-medium text-blue-300">
                {person.name}
              </p>
              <p className="p-3 text-blue-700 text-sm">{person.job}</p>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Supervisors;
