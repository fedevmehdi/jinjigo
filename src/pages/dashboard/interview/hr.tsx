import { Button } from "@/components/ui/button"
import Header from "../components/header"
import { Interview, columns } from "./components/columns"
import { InterviewDataTable } from "./components/interview-table"
import { useNavigate } from "react-router-dom"
import { PlusSquare } from "lucide-react"
import { User } from "@/lib/types"
import { useSelector } from "react-redux"
import { RootState } from "@/services/state/store"
import { useEffect, useState } from "react"
import { fetchInterviews } from "@/services/api"

export default function HRInterviewPage() {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)
	const navigate = useNavigate()
	const [data, setData] = useState<Interview[]>([])
	const [loading, setLoading] = useState(true)
	console.log(data)
	useEffect(() => {
		const fetchInterviewsData = async () => {
			try {
				const response = await fetchInterviews()
				setData(response.data)
			} catch (error) {
				console.error("Error fetching interviews", error)
			} finally {
				setLoading(false)
			}
		}

		fetchInterviewsData()
	}, [user._id])

	return (
		<>
			<Header title="Interview List" />
			<div>
				<Button
					variant="ghost"
					className="mb-4"
					onClick={() => navigate("/new-interview")}
				>
					<div className="flex items-center gap-2">
						<PlusSquare />
						Create a new Interview
					</div>
				</Button>

				<div className="card-primary">
					{loading ? (
						<p>Loading...</p>
					) : (
						<InterviewDataTable columns={columns} data={data} />
					)}
				</div>
			</div>
		</>
	)
}
