// @ts-nocheck
import dayjs from "dayjs"
import Calendar from "@toast-ui/react-calendar"
import "@toast-ui/calendar/dist/toastui-calendar.min.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CalendarRange } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CalendarComponent() {
	const [dateRange, setDateRange] = useState({
		startDate: null,
		endDate: null,
	})

	const [availableDateRange, setAvailableDateRange] = useState({
		start: "2024-03-26T12:00:00",
		end: "2024-03-29T12:00:00",
	})
	const [reservedHours, setReservedHours] = useState([
		{ start: null, end: null },
	])

	const [currentView, setCurrentView] = useState("week")

	const calendarRef = useRef(null)
	const getCalInstance = useCallback(
		() => calendarRef.current?.getInstance?.(),
		[]
	)
	const calendars = [{ id: "cal1", name: "Personal" }]
	const initialEvents = [
		{
			id: "1",
			calendarId: "cal1",
			title: "Unavailable",
			category: "time",
			start: "2024-03-29T12:00:00",
			end: "2024-03-29T13:30:00",
			backgroundColor: "#B91C1C",
			color: "hsl(var(--primary-foreground))",
			borderColor: "#B91C1C",
			isReadOnly: true,
		},
		{
			id: "2",
			calendarId: "cal1",
			title: "UI/UX Interview",
			category: "time",
			start: "2024-03-28T12:00:00",
			end: "2024-03-28T15:30:00",
			backgroundColor: "hsl(var(--primary))",
			color: "hsl(var(--primary-foreground))",
		},
	]
	const onAfterRenderEvent = event => {}
	const changeView = () => {
		const calInstance = getCalInstance()
	}

	const getDateRange = () => {
		const calInstance = getCalInstance()
		const startDate = calInstance.getDateRangeStart()
		const endDate = calInstance.getDateRangeEnd()
		setDateRange({
			...dateRange,
			startDate: dayjs(startDate),
			endDate: dayjs(endDate),
		})
	}
	const prevMonth = () => {
		const calInstance = getCalInstance()
		calInstance.move(-1)
		getDateRange()
	}
	const nextMonth = () => {
		const calInstance = getCalInstance()
		calInstance.move(1)
		getDateRange()
	}
	const viewChange = view => {
		const calInstance = getCalInstance()
		try {
			calInstance.changeView(view || "week")
			setCurrentView(view || "week")
		} catch (err) {
			console.error(err)
		}
	}
	const getCurrentView = () => {
		const calInstance = getCalInstance()
		return calInstance?.getViewName()
	}
	useEffect(() => {
		getDateRange()
	}, [])

	useEffect(() => {
		if (calendarRef.current) {
			const calendarInstance = calendarRef.current.getInstance()
			console.log(calendarInstance)

			calendarInstance.on("afterRender", function (data) {
				const view = calendarInstance.getOptions()
				console.log(view)
			})
			calendarInstance.fire("afterRender")
		}
	}, [calendarRef, availableDateRange])

	function highlightRange(start, end) {
		var dates = document.querySelectorAll(
			".tui-full-calendar-weekday-grid-date"
		)
		dates.forEach(function (dateElement) {
			var date = new Date(dateElement.innerText)
			if (date >= start && date <= end) {
				dateElement.classList.add("highlight")
			}
		})
	}

	const monthGridFooterTemplate = model => {
		console.log("Test")
		const { isOtherMonth, ymd } = model
		const isInRange =
			dayjs(ymd).isSameOrAfter(dateRange.startDate, "day") &&
			dayjs(ymd).isSameOrBefore(dateRange.endDate, "day")

		const cellStyle = isInRange ? "background-color: rgba(0, 0, 0, 0.1);" : ""

		return `
		  <span style="${cellStyle}">
			${isOtherMonth ? "" : model.date}
		  </span>
		`
	}

	return (
		<div>
			<div className="mb-6 flex flex-col max-md:gap-4 md:flex-row justify-between items-center">
				<div className="flex justify-between items-center">
					<h4 className="font-medium text-xl">
						{dayjs().format("MMMM D, YYYY")}
					</h4>
				</div>
				<div className="flex flex-col sm:flex-row justify-center items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="capitalize">
								{currentView}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => viewChange("week")}>
								Week
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => viewChange("month")}>
								Month
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => viewChange("day")}>
								Day
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<div className="flex gap-2 rounded-md h-10 border py-2 px-4 text-sm bg-secondary/40">
						<CalendarRange />
						<div className="flex items-center gap-1">
							<p className="font-medium">
								{dayjs(dateRange.startDate).format("MMMM DD")}
							</p>
							<p className="text-accent-foreground">to</p>
							<p className="font-medium">
								{dayjs(dateRange.endDate).format("MMMM DD")}
							</p>
						</div>
					</div>
					<div className="flex justify-between items-center gap-2">
						<Button variant="outline" size="icon" onClick={prevMonth}>
							<ArrowLeft className="w-4 h-4" />
						</Button>

						<Button variant="outline" size="icon" onClick={nextMonth}>
							<ArrowRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
			<div className="overflow-auto">
				<div className="min-w-[800px] ">
					<Calendar
						height="600px"
						month={{
							dayNames: ["S", "M", "T", "W", "T", "F", "S"],
							visibleWeeksCount: 3,
						}}
						calendars={calendars}
						events={initialEvents}
						onAfterRenderEvent={onAfterRenderEvent}
						usageStatistics={false}
						isReadOnly={true}
						week={{
							taskView: false,
							hourStart: 9,
							hourEnd: 19,
							eventView: ["time"],
						}}
						ref={calendarRef}
					/>
				</div>
				{/* <div className="border rounded-lg p-4 ">
					<h4 className="font-medium">Prospective Dates</h4>
					{initialEvents?.map(event => (
						<div>{event.title}</div>
					))}
				</div> */}
			</div>
		</div>
	)
}
