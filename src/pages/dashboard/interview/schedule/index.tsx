import { Button } from "@/components/ui/button"
import Header from "../../components/header"
import Calendar from "../components/calendar"
import { availableTimeRanges } from "@/pages/dashboard/interview/components/resources"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { TimeRanges } from "@/lib/types"

export default function ScheduleInterviewPage() {
	const [isFinalDateSelection, setIsFinalDateSelection] = useState(false)
	const [isProposingNewDate, setIsProposingNewDate] = useState(false)
	const [selectedTimeRanges, setSelectedTimeRanges] = useState<TimeRanges>(null)

	console.log(selectedTimeRanges)
	return (
		<>
			<Header
				title={
					isFinalDateSelection
						? "Select the Final Interview Time"
						: isProposingNewDate
						? "Propose New Date"
						: "Enter Your Availiblity"
				}
				subTitle={
					isFinalDateSelection
						? "Drag and drop the interview to any available time slot to finalize the interview schedule"
						: isProposingNewDate
						? "Click on any date time to set your availiblity. You can add multiple slots"
						: "Click on the green background to add your availablity"
				}
			/>
			<div className="flex gap-12 my-4">
				<div className="flex items-center space-x-2">
					<Checkbox
						checked={isFinalDateSelection}
						onCheckedChange={checked =>
							setIsFinalDateSelection(Boolean(checked))
						}
					/>
					<Label>Final Date Selection</Label>
				</div>
			</div>
			<div className="card-primary">
				<Calendar
					key={`${isProposingNewDate}-${isFinalDateSelection}`}
					availableTimeRanges={availableTimeRanges}
					isFinalDateSelection={isFinalDateSelection}
					isProposingNewDate={isProposingNewDate}
					setIsProposingNewDate={setIsProposingNewDate}
					setSelectedTimeRanges={setSelectedTimeRanges}
				/>
				<div className="mt-4 text-end">
					{isProposingNewDate ? (
						<Button>Propose</Button>
					) : isFinalDateSelection ? (
						<Button>Finalize Schedule</Button>
					) : (
						<Button>Submit</Button>
					)}
				</div>
			</div>
		</>
	)
}
