import { User } from "@/lib/types"
import { useSelector } from "react-redux"
import { RootState } from "@/services/state/store"
import CandidateInterviewPage from "./candidate"
import HRInterviewPage from "./hr"
import InterviewerInterviewPage from "./interviewer"

export default function InterviewPage() {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)

	const renderPage = () => {
		switch (user.role) {
			case "CANDIDATE":
				return <CandidateInterviewPage />
			case "HR":
				return <HRInterviewPage />
			case "INTERVIEWER":
				return <InterviewerInterviewPage />
			default:
				return <>Error Occured</>
		}
	}

	return renderPage()
}
