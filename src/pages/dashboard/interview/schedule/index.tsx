import Header from "../../components/header"
import Calendar from "../components/calendar"
import {
	availableTimeRanges,
	events as initialEvents,
} from "@/pages/dashboard/interview/components/resources"

export default function ScheduleInterviewPage() {
	return (
		<>
			<Header
				title="Enter Your Availiblity"
				subTitle="Double click on the green background to add your availablity"
			/>
			<div className="card-primary">
				<Calendar
					availableTimeRanges={availableTimeRanges}
					initialEvents={initialEvents}
					isFinalDateSelection={true}
				/>
			</div>
		</>
	)
}
