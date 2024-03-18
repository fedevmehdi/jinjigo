import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusSquare } from "lucide-react"
import Header from "../../components/header"
import { useNavigate } from "react-router-dom"

export default function InterviewTemplatePage() {
	const navigate = useNavigate()
	return (
		<>
			<Header title="Interview Template" />
			<Button
				variant="ghost"
				className="mb-4"
				onClick={() => navigate("/dashboard/new-interview-template")}
			>
				<div className="flex items-center gap-2">
					<PlusSquare />
					Create a new template
				</div>
			</Button>
			<div className="container-primary columns-2 space-y-4">
				<div className="w-full flex justify-between items-center bg-secondary p-4 rounded-lg">
					<h4 className="font-medium">Template Name</h4>
					<Button size="icon" variant="ghost">
						<MoreHorizontal />
					</Button>
				</div>
				<div className="w-full flex justify-between items-center bg-secondary p-4 rounded-lg">
					<h4 className="font-medium">Template Name</h4>
					<Button size="icon" variant="ghost">
						<MoreHorizontal />
					</Button>
				</div>
				<div className="w-full flex justify-between items-center bg-secondary p-4 rounded-lg">
					<h4 className="font-medium">Template Name</h4>
					<Button size="icon" variant="ghost">
						<MoreHorizontal />
					</Button>
				</div>
				<div className="w-full flex justify-between items-center bg-secondary p-4 rounded-lg">
					<h4 className="font-medium">Template Name</h4>
					<Button size="icon" variant="ghost">
						<MoreHorizontal />
					</Button>
				</div>
			</div>
		</>
	)
}
