import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import getStartedSvg from "@/assets/images/many-people-collaborating.svg"
import { signupFormSchema } from "@/lib/formSchemas"
import Header from "../components/header"
import AuthForm from "../components/form"
import Stepper from "@/components/ui/stepper"
import GoogleAuthButton from "../components/google-auth-button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/state/store"
import { signupUser } from "@/services/state/auth/authActions"

function SignupFormSection({ setCurrentStep }: any) {
	const dispatch = useDispatch<AppDispatch>()
	const { loading, error, userInfo } = useSelector(
		(state: RootState) => state.auth
	)

	const form = useForm<z.infer<typeof signupFormSchema>>({
		resolver: zodResolver(signupFormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: z.infer<typeof signupFormSchema>) {
		try {
			dispatch(signupUser(values))
			if (userInfo && !error) {
				setCurrentStep(1)
			}
		} catch (error) {
			console.error("Error:", error)
		}
	}
	return (
		<>
			<Header
				title="Signup"
				description="Enter your email and password to continue"
			/>
			<AuthForm
				form={form}
				onSubmit={onSubmit}
				state="signup"
				loading={loading}
			/>
			{error && <div>{error}</div>}
			<div className="flex items-center gap-2 my-8">
				<hr className="w-full border-[1.4px]" />
				<h6 className="uppercase text-sm text-accent-foreground">Or</h6>
				<hr className="w-full border-[1.4px]" />
			</div>
			<div className="text-center">
				<h5 className="text-sm text-accent-foreground mb-4">Signup with</h5>
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-14">
					<GoogleAuthButton />
					<Button
						className="w-full cursor-pointer"
						size="lg"
						variant="secondary"
						asChild
					>
						<div className="flex gap-2 items-center">
							<svg height="26px" width="26px" viewBox="0 0 512 512">
								<g id="_x37_8-microsoft">
									<g>
										<g>
											<path
												d="M270.912,241.049h223.691V31.708c0-8.26-6.68-14.958-14.914-14.958H270.912V241.049z      M270.912,241.049"
												style={{ fill: "#5ACF5F" }}
											/>
											<path
												d="M241.09,241.049V16.75H32.313c-8.236,0-14.916,6.698-14.916,14.958v209.341H241.09z      M241.09,241.049"
												style={{ fill: "#F84437" }}
											/>
											<path
												d="M241.09,270.953H17.397v209.343c0,8.251,6.68,14.954,14.916,14.954H241.09V270.953z      M241.09,270.953"
												style={{ fill: "#2299F8" }}
											/>
											<path
												d="M270.912,270.953V495.25h208.777c8.234,0,14.914-6.703,14.914-14.954V270.953H270.912z      M270.912,270.953"
												style={{ fill: "#FFC107" }}
											/>
										</g>
									</g>
								</g>
								<g id="Layer_1" />
							</svg>
							<h4 className="font-medium">Microsoft</h4>
						</div>
					</Button>
				</div>
				<h6 className="text-accent-foreground text-sm">
					Already have an account?{" "}
					<Link to="/login" className="inline font-medium hover:underline">
						Login
					</Link>
				</h6>
			</div>
		</>
	)
}

function ConnectCalendarSection({ setCurrentStep }: any) {
	return (
		<>
			<Header
				title="Connect a calendar"
				description="Connect a calendar to sync your dates on this platform"
			/>
			<ol className="my-12 space-y-6">
				<li className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28px"
							height="28px"
							viewBox="0 0 256 256"
						>
							<path
								fill="#fff"
								d="M195.368 60.632H60.632v134.736h134.736z"
							></path>
							<path
								fill="#ea4335"
								d="M195.368 256L256 195.368l-30.316-5.172l-30.316 5.172l-5.533 27.73z"
							></path>
							<path
								fill="#188038"
								d="M0 195.368v40.421C0 246.956 9.044 256 20.21 256h40.422l6.225-30.316l-6.225-30.316l-33.033-5.172z"
							></path>
							<path
								fill="#1967d2"
								d="M256 60.632V20.21C256 9.044 246.956 0 235.79 0h-40.422c-3.688 15.036-5.533 26.101-5.533 33.196c0 7.094 1.845 16.24 5.533 27.436c13.41 3.84 23.515 5.76 30.316 5.76c6.801 0 16.906-1.92 30.316-5.76"
							></path>
							<path fill="#fbbc04" d="M256 60.632h-60.632v134.736H256z"></path>
							<path
								fill="#34a853"
								d="M195.368 195.368H60.632V256h134.736z"
							></path>
							<path
								fill="#4285f4"
								d="M195.368 0H20.211C9.044 0 0 9.044 0 20.21v175.158h60.632V60.632h134.736z"
							></path>
							<path
								fill="#4285f4"
								d="M88.27 165.154c-5.036-3.402-8.523-8.37-10.426-14.94l11.689-4.816c1.06 4.042 2.913 7.175 5.558 9.398c2.627 2.223 5.827 3.318 9.566 3.318c3.823 0 7.107-1.162 9.852-3.487c2.746-2.324 4.127-5.288 4.127-8.875c0-3.672-1.449-6.67-4.345-8.994c-2.897-2.324-6.535-3.486-10.88-3.486h-6.754v-11.57h6.063c3.739 0 6.888-1.011 9.448-3.033c2.56-2.02 3.84-4.783 3.84-8.303c0-3.132-1.145-5.625-3.435-7.494c-2.29-1.87-5.188-2.813-8.708-2.813c-3.436 0-6.164.91-8.185 2.745a16.115 16.115 0 0 0-4.413 6.754l-11.57-4.817c1.532-4.345 4.345-8.185 8.471-11.503c4.127-3.318 9.398-4.985 15.798-4.985c4.733 0 8.994.91 12.767 2.745c3.772 1.836 6.736 4.379 8.875 7.613c2.14 3.25 3.2 6.888 3.2 10.93c0 4.126-.993 7.613-2.98 10.476c-1.988 2.863-4.43 5.052-7.327 6.585v.69a22.248 22.248 0 0 1 9.398 7.327c2.442 3.284 3.672 7.208 3.672 11.79c0 4.58-1.163 8.673-3.487 12.26c-2.324 3.588-5.54 6.417-9.617 8.472c-4.092 2.055-8.69 3.1-13.793 3.1c-5.912.016-11.369-1.685-16.405-5.087m71.797-58.005l-12.833 9.28l-6.417-9.734l23.023-16.607h8.825v78.333h-12.598z"
							></path>
						</svg>
						<h4>Google Calendar</h4>
					</div>
					<Button variant="secondary" className="rounded-full">
						Connect
					</Button>
				</li>
				<li className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<svg height="28px" width="28px" viewBox="0 0 512 512">
							<g id="_x37_8-microsoft">
								<g>
									<g>
										<path
											d="M270.912,241.049h223.691V31.708c0-8.26-6.68-14.958-14.914-14.958H270.912V241.049z      M270.912,241.049"
											style={{ fill: "#5ACF5F" }}
										/>
										<path
											d="M241.09,241.049V16.75H32.313c-8.236,0-14.916,6.698-14.916,14.958v209.341H241.09z      M241.09,241.049"
											style={{ fill: "#F84437" }}
										/>
										<path
											d="M241.09,270.953H17.397v209.343c0,8.251,6.68,14.954,14.916,14.954H241.09V270.953z      M241.09,270.953"
											style={{ fill: "#2299F8" }}
										/>
										<path
											d="M270.912,270.953V495.25h208.777c8.234,0,14.914-6.703,14.914-14.954V270.953H270.912z      M270.912,270.953"
											style={{ fill: "#FFC107" }}
										/>
									</g>
								</g>
							</g>
							<g id="Layer_1" />
						</svg>
						<h4>Microsoft Calendar</h4>
					</div>
					<Button variant="secondary" className="rounded-full">
						Connect
					</Button>
				</li>
			</ol>
			<div className="space-y-1">
				<Button size="lg" className="w-full" onClick={() => setCurrentStep(2)}>
					Continue
				</Button>
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => setCurrentStep(2)}
				>
					Skip for now
				</Button>
			</div>
		</>
	)
}

function GetStartedSection() {
	const redirect = useNavigate()
	return (
		<>
			<Header
				title="Get Started Now"
				description="Start streamlining your interview process."
			/>
			<img src={getStartedSvg} alt="people working" />
			<div className="space-y-1 mt-6">
				<Button size="lg" className="w-full" onClick={() => redirect("/app")}>
					Create Your First Interview
				</Button>
				<Button
					variant="ghost"
					className="w-full"
					onClick={() => redirect("/app")}
				>
					Skip to dashboard
				</Button>
			</div>
		</>
	)
}

export default function SignupView() {
	const steps = [
		{ label: "Signup", completed: true },
		{ label: "Connect Calendar", completed: false },
		{ label: "Get Started!", completed: false },
	]

	const [currentStep, setCurrentStep] = useState(0)

	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return <SignupFormSection setCurrentStep={setCurrentStep} />
			case 1:
				return <ConnectCalendarSection setCurrentStep={setCurrentStep} />
			case 2:
				return <GetStartedSection />
		}
	}

	return (
		<div>
			<h1 className="text-2xl lg:text-4xl font-medium text-center mb-8">
				Jinjigo
			</h1>
			<div className="bg-white dark:bg-inherit dark:border dark:m-2 dark:md:m-8 rounded-lg p-4 pb-20">
				<Stepper
					steps={steps}
					currentStep={currentStep}
					className="mx-auto max-w-[20rem] sm:max-w-[30rem] mt-20 mb-10 px-4"
				/>
				<div className="max-w-[400px] mx-auto">{renderStep()}</div>
			</div>{" "}
			``
		</div>
	)
}
