import { useState } from "react";
import { faqs } from "../data";


const Faq = () => {
	const AccordionItem = ({ header, text }) => {
		const [active, setActive] = useState(false);

		const handleToggle = () => {
			event.preventDefault();
			setActive(!active);
		};
		return (
			<div className="single-faq mb-8 w-full text-primary rounded-lg border bg-background/80 p-4 sm:p-8 lg:px-6 xl:px-8">
				<button
					className={`faq-btn flex w-full text-left`}
					onClick={() => handleToggle()}
				>
					<div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5 text-primary">
						<svg
							className={`duration-200 ease-in-out fill-primary stroke-primary ${
								active ? "rotate-180" : ""
							}`}
							width="17"
							height="10"
							viewBox="0 0 17 10"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
								fill="bg-background"
								stroke=""
							/>
						</svg>
					</div>

					<div className="w-full">
						<h4 className="text-lg font-semibold text-primary">
							{header}
						</h4>
					</div>
				</button>

				<div
					className={`pl-[62px] duration-200 ease-in-out ${
						active ? "block" : "hidden"
					}`}
				>
					<p className="py-3 text-base leading-relaxed text-body-color">
						{text}
					</p>
				</div>
			</div>
		);
	};

	return (
		<>
			
			<div className="relative z-10 overflow-hidden bg-primary-background lg:px-72">
				<div className="container mx-auto mb-24 w-full">
					<div className="-mx-4 flex flex-wrap">
						<div className="w-full px-4">
							<div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
								<span className="mb-2 block text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
									FAQs
								</span>
								<h2 className="text-primary text-3xl font-bold sm:text-5xl pb-14">
									Any Questions ?
								</h2>
							</div>
						</div>
					</div>

					<div className="px-3 -mx-4 flex-box flex-wrap w-full">
						<div className="w-full px-4 grid md:grid-cols-2 gap-8">
							{faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									header={faq.question}
									text={faq.answer}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
			
		</>
	);
};

export default Faq;
