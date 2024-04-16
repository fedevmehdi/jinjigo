import Header from "../../components/header"
import Calendar from "../components/calendar"

export default function ScheduleInterviewPage() {
	return (
		<>
			<Header
				title="Schedule Interview"
				subTitle="Please set your prospective date between between 09:00am - 5:00pm"
			/>
			<div className="card-primary">
				<Calendar />
			</div>
		</>
	)
}
