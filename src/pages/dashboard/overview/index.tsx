import { User } from "@/lib/types"
import { RootState } from "@/services/state/store"
import { useSelector } from "react-redux"
import CandidateOverviewPage from "./candidate"
import InterviewerOverviewPage from "./interviewer"
import HROverviewPage from "./hr"

export default function OverviewPage() {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)
	const renderPage = () => {
		switch (user.role) {
			case "CANDIDATE":
				return <CandidateOverviewPage />
			case "INTERVIWER":
				return <InterviewerOverviewPage />
			case "HR":
				return <HROverviewPage />
			default:
				return "Error Occured"
		}
	}
	return renderPage()
}
