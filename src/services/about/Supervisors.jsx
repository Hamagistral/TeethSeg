import { supervisors } from "../../data";

function Supervisors() {
	return (
		<>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
				<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
					<h2 className="mb-24 text-4xl tracking-tight font-bold text-primary">
						Our Supervisors
					</h2>
				</div>
				<div className="grid gap-8 lg:gap-48 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
					{supervisors.map((person) => (
						<div
							key={person.name}
							className="text-center text-md text-primary"
						>
							<img
								className="mx-auto mb-4 w-36 h-36 rounded-full border border-slate-500"
								src={person.image}
								alt="img"
							/>
							<h3 className="mb-1 text-2xl font-bold tracking-tight text-card-title">
								{person.name}
							</h3>
							<p className="py-2">{person.job}</p>
						</div>
					))}
				</div>
			</div>
			<hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-primary" />
		</>
	);
}

export default Supervisors;
