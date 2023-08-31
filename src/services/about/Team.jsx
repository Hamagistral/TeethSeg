import { Github, Linkedin } from "lucide-react";
import { team } from "../../data";

function Team() {
	return (
		<>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
				<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
					<h2 className="mb-24 text-4xl tracking-tight font-bold text-primary">
						Our Team
					</h2>
				</div>
				<div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{team.map((person) => (
						<div
							key={person.name}
							className="text-center text-md text-primary"
						>
							<img
								className="mx-auto mb-4 w-36 h-36 rounded-full border border-slate-900"
								src={person.image}
								alt="img"
							/>
							<h3 className="mb-1 text-2xl font-bold tracking-tight text-car">
								{person.name}
							</h3>
							<p className="py-2">{person.job}</p>
							<ul className="flex justify-center mt-4 space-x-4">
								<li>
									<a
										href={person.github}
										className="text-foreground hover:text-blue-500"
									>
										<Github />
									</a>
								</li>
								<li>
									<a
										href={person.linkedIn}
										className="text-[#3e66d3] hover:text-foreground"
									>
										<Linkedin />
									</a>
								</li>
							</ul>
						</div>
					))}
				</div>
			</div>

			<hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-primary" />
		</>
	);
}

export default Team;
