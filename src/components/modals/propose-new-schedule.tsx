import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { addDays } from "date-fns"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Button } from "../ui/button"

type ProposeNewSchedule = {
	open: boolean
	setOpen: (state: boolean) => void
}
export default function ProposeNewSchedule({
	open,
	setOpen,
}: ProposeNewSchedule) {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	})
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Propose a New Interview Date</DialogTitle>
					<DialogDescription>
						You will be notified once your requested date is accepted or
						rejected.
					</DialogDescription>
				</DialogHeader>
				<Calendar
					initialFocus
					mode="range"
					defaultMonth={date?.from}
					selected={date}
					onSelect={setDate}
				/>
				<div className="flex gap-2">
					<Button
						className="w-full"
						variant="outline"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button className="w-full">Propose</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
