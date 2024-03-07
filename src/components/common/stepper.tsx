import React from "react"

interface Step {
	label: string
}

interface StepperProps {
	steps: Step[]
	currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
	return (
		<>
			<div className="flex justify-center -space-x-1 items-center w-[30rem] mx-auto mt-20 mb-10">
				{steps.map((step, index) => (
					<React.Fragment key={index}>
						<div
							className={`${
								index <= currentStep
									? "bg-primary border-[2px]"
									: "border-[4.5px]"
							} border-[#E5E5E5]  h-[16px] w-[16px] rounded-full shrink-0 relative`}
						>
							<div className="flex absolute -top-[3.4rem] flex-col items-center inset-x-0">
								<span
									className={`relative z-10 text-center p-2 text-xs ${
										index <= currentStep
											? "text-primary-foreground bg-primary"
											: "text-secondary-foreground bg-transparent border border-border"
									} w-[6rem] rounded-lg h-10 grid place-content-center`}
								>
									{step.label}
								</span>
								{index <= currentStep && (
									<div className="w-3 h-3 -mt-2 rotate-45 bg-primary"></div>
								)}
							</div>
						</div>
						{index < steps.length - 1 && (
							<hr
								className={`border-[3px] w-full ${
									currentStep > index && "border-primary"
								}`}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</>
	)
}
