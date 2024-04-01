import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { events } from "./resources"
import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function renderDateContent(eventInfo: any) {
	return (
		<div className="my-2 flex flex-col justify-center items-center shrink-0">
			<h4 className="font-medium">{dayjs(eventInfo.date).format("ddd")}</h4>
			<h5
				className={`font-normal text-sm h-6 w-6 grid place-content-center text-accent-foreground ${
					eventInfo.isToday && "bg-primary text-primary-foreground rounded-full"
				}`}
			>
				{dayjs(eventInfo.date).format("D")}
			</h5>
		</div>
	)
}

function renderTimeContent(eventInfo: any) {
	return (
		<h5 className="uppercase text-xs text-accent-foreground font-medium h-4 w-12 text-center">
			{eventInfo.text}
		</h5>
	)
}

export default function Calendar() {
	const calendarRef = useRef(null)
	const [dateRange, setDateRange] = useState("" || dayjs().format("MMMM"))
	const [currentView, setCurrentView] = useState("week")

	useEffect(() => {
		if (calendarRef.current) {
			const calendarApi = (calendarRef.current as any).getApi()
			setDateRange(calendarApi.currentData.viewTitle)
		}
	}, [calendarRef])

	const move = (index: 1 | -1 | 0) => {
		if (calendarRef.current) {
			const calendarApi = (calendarRef.current as any).getApi()
			if (index === 1) {
				calendarApi.next()
			}
			if (index === -1) {
				calendarApi.prev()
			}
			if (index === 0) {
				calendarApi.today()
			}
			setDateRange(calendarApi.currentData.viewTitle)
		}
	}

	const changeView = (view: "timeGridDay" | "timeGridWeek") => {
		if (calendarRef.current) {
			const calendarApi = (calendarRef.current as any).getApi()
			calendarApi.changeView(view)
			const buttonText = view === "timeGridDay" ? "Day" : "Week"
			setCurrentView(buttonText)
		}
	}
	return (
		<div>
			<div className="flex justify-between mb-4">
				<div className="flex items-center gap-2 justify-center">
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full"
						onClick={() => move(-1)}
					>
						<ArrowLeft />
					</Button>
					<h4 className="text-lg font-medium">{dateRange}</h4>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full"
						onClick={() => move(1)}
					>
						<ArrowRight />
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => move(0)}>
						Today
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm" className="capitalize">
								{currentView}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => changeView("timeGridWeek")}>
								Week
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => changeView("timeGridDay")}>
								Day
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<FullCalendar
				ref={calendarRef}
				plugins={[timeGridPlugin, interactionPlugin]}
				events={events}
				initialView="timeGridWeek"
				allDaySlot={false}
				eventStartEditable={true}
				nowIndicator={true}
				slotMinTime="09:00:00"
				slotMaxTime="21:00:00"
				height={750}
				hiddenDays={[0]}
				dayHeaderContent={renderDateContent}
				slotLabelContent={renderTimeContent}
				headerToolbar={false}
			/>
		</div>
	)
}
