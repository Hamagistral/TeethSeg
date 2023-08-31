import { BallCanvas } from "./Ball";
import { SectionWrapper } from "./SectionWrapper";
import { techs } from "../../data";

const TechPage = () => {
	return (
		<>
			<div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
				<div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
					<h2 className="mb-24 text-4xl tracking-tight font-bold text-primary">
						Technologies Used
					</h2>
				</div>
				<div className="flex flex-row flex-wrap justify-center gap-10">
					{techs.map((technology) => (
						<div className="w-28 h-28" key={technology.name}>
							<BallCanvas icon={technology.icon} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};
export const Tech = () => SectionWrapper(TechPage, "");

export default Tech;
