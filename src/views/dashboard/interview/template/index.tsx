import Header from "@/components/screens/dashboard/header"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export default function InterviewTemplateView() {
	return (
		<>
			<Header title="Interview Template" />
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
