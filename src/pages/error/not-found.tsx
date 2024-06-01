import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import Astronaut from "@/assets/images/astronaut.png"

export default function Error404() {
	const navigate = useNavigate()
	return (
		<div className="container">
			<div className="mt-8">
				<a className="font-medium text-lg" href="/">
					JNJIGO
				</a>
			</div>
			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 items-start">
				<div className="content order-2 md:order-1 mt-10">
					<h6 className="text-sm uppercase opacity-75 mb-2">404 Error</h6>

					<h2 className="text-2xl md:text-4xl font-bold dark:text-gray-200 text-gray-800 mb-2">
						<span className="text-primary">Whoops!</span> Looks like you've
						reached a dead end.
					</h2>
					<p className="opacity-75 mb-1">
						Don't worry, it happens to the best of us! This page doesn't exist
						just yet. You can do the following for now:
					</p>
					<ul className="list-disc ps-4 mb-4 opacity-75">
						<li>Double check the url for any typo</li>
						<li>Go back to the homepage and explore again</li>
					</ul>
					<Button onClick={() => navigate("/")}>Return Home</Button>
				</div>
				<div className="relative order-1 md:order-2">
					<img
						src={Astronaut}
						width={430}
						height={430}
						alt="astronaut lost in space"
						className="mx-auto md:mx-[inherit] md:ms-auto"
					/>
				</div>
			</div>
		</div>
	)
}
