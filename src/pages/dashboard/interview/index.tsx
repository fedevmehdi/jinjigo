import { Button } from "@/components/ui/button"
import Header from "../components/header"
import { Interview, columns } from "./components/columns"
import { InterviewDataTable } from "./components/interview-table"
import { useNavigate } from "react-router-dom"
import { PlusSquare } from "lucide-react"

export default function InterviewPage() {
	const navigate = useNavigate()
	const data: Interview[] = [
		{
			id: "728ed52f",
			position: "UI/UX Designer",
			status: "scheduled",
			date: "5:30pm | Jun 5",
			company: "Apple .inc",
		},
		{
			id: "728ed62f",
			position: "Product Manager",
			status: "Scheduling",
			date: "5:30pm | Jun 6",
			company: "Sales Force .inc",
		},
		{
			id: "728ed72f",
			position: "Project Manager",
			status: "in-evaluation",
			date: "5:30pm | Jun 7",
			company: "Zendesk .inc",
		},
	]
	return (
		<>
			<Header title="Interview List" />
			<div className="dashboard-grid">
				<div>
					<Button
						variant="ghost"
						className="mb-4"
						onClick={() => navigate("/dashboard/new-interview-template")}
					>
						<div className="flex items-center gap-2">
							<PlusSquare />
							Create a new Interview
						</div>
					</Button>
					<div className="card-primary">
						{/* <h3 className="mb-4 text-xl font-medium">Qualified For Interview</h3> */}
						<InterviewDataTable columns={columns} data={data} />
					</div>
				</div>
			</div>
		</>
	)
}
