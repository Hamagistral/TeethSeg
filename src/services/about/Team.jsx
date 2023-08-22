import { Github, Linkedin } from "lucide-react";
import { team } from "../../data";

function Team() {
  return (
    <div className="scroll-tap font-bold">
      <h2 className="flex-box text-7xl font-extrabold pb-16 text">Our Team</h2>
      <ul className="flex-box flex-col divide-y divide-gray-200">
        {team.map((person, index) => (
          <li key={index} className="colab py-4 flex-box flex-col">
            <img className="team-img" src={person.image} alt="img" />
            <div className="ml-3 flex-box flex-col">
              <p className="text-2xl font-medium text-blue-300">
                {person.name}
              </p>
              <p className="p-3 text-blue-700 text-sm">{person.job}</p>
              <div className="flex-box">
                <div className="border-black bg-blue-900 cursor-pointer p-2 m-1 rounded-full hover:bg-blue-300">
                  <a className="text-blue-200 hover:text-blue-900" href={person.linkedIn}>
                    <Linkedin />
                  </a>
                </div>
                <div className="border-black bg-blue-900 cursor-pointer p-2 m-1 rounded-full hover:bg-blue-300">
                  <a className="text-blue-200 hover:text-blue-900" href={person.github}>
                    <Github />
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Team;
