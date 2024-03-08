import AuthForm from "@/components/screens/auth/form"
import Header from "@/components/screens/auth/header"
import { Button } from "@/components/ui/button"
import { authFormSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

export default function LoginView() {
	const form = useForm<z.infer<typeof authFormSchema>>({
		resolver: zodResolver(authFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	function onSubmit(values: z.infer<typeof authFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}
	return (
		<div>
			<h1 className="text-2xl lg:text-4xl font-medium text-center mb-8">
				IntaBook
			</h1>
			<div className="bg-white rounded-lg p-4 pb-20">
				<div className="max-w-[400px] mx-auto">
					<Header
						title="Login"
						description="Enter your email and password to continue"
						className="mt-8"
					/>
					<AuthForm form={form} onSubmit={onSubmit} />
					<div className="flex items-center gap-2 my-8">
						<hr className="w-full border-[1.4px]" />
						<h6 className="uppercase text-sm text-accent-foreground">Or</h6>
						<hr className="w-full border-[1.4px]" />
					</div>
					<div className="text-center">
						<h5 className="text-sm text-accent-foreground mb-4">
							Continue with
						</h5>
						<div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-14">
							<Button
								className="w-full cursor-pointer"
								size="lg"
								variant="secondary"
								asChild
							>
								<div className="flex gap-1 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										x="0px"
										y="0px"
										width="28"
										height="28"
										viewBox="0 0 48 48"
									>
										<path
											fill="#fbc02d"
											d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
										></path>
										<path
											fill="#e53935"
											d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
										></path>
										<path
											fill="#4caf50"
											d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
										></path>
										<path
											fill="#1565c0"
											d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
										></path>
									</svg>
									<h4 className="font-medium">Google</h4>
								</div>
							</Button>
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
							Don't have an account?{" "}
							<Link to="/signup" className="inline font-medium hover:underline">
								Signup
							</Link>
						</h6>
					</div>
				</div>
			</div>
		</div>
	)
}
