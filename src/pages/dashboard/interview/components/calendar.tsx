import { useEffect, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import dayjs from "dayjs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { format, isBefore, isAfter, addHours, parseISO, getDay } from "date-fns"
import { toast } from "sonner"
import { Toggle } from "@/components/ui/toggle"

interface Schedluing {
	availableTimeRanges: any[]
	isFinalDateSelection?: boolean
	isProposingNewDate?: boolean
	setIsProposingNewDate?: (state: boolean) => void
}
export default function Schedluing({
	isFinalDateSelection = false,
	availableTimeRanges,
	isProposingNewDate = false,
	setIsProposingNewDate,
}: Schedluing) {
	const calendarRef = useRef<FullCalendar>(null)
	const [dateRange, setDateRange] = useState<string>(dayjs().format("MMMM"))
	const [eventsList, setEventsList] = useState(
		isFinalDateSelection
			? [
					...availableTimeRanges,
					{
						id: "final",
						title: "Final Interview Time",
						start: availableTimeRanges[0].start,
						end: "2024-06-10T11:00:00",
						constraint: "availableForMeeting",
						editable: false,
						startEditable: true,
					},
			  ]
			: isProposingNewDate
			? []
			: [...availableTimeRanges]
	)
	const [contextMenu, setContextMenu] = useState<{
		visible: boolean
		x: number
		y: number
		eventId: string | null
	}>({ visible: false, x: 0, y: 0, eventId: null })

	useEffect(() => {
		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi()
			setDateRange(calendarApi.view.title)
		}
	}, [calendarRef])

	const move = (index: 1 | -1 | 0) => {
		if (calendarRef.current) {
			const calendarApi = calendarRef.current.getApi()
			if (index === 1) {
				calendarApi.next()
			} else if (index === -1) {
				calendarApi.prev()
			} else if (index === 0) {
				calendarApi.today()
			}
			setDateRange(calendarApi.view.title)
		}
	}

	const handleDateClick = (arg: any) => {
		// No need to add more events in case of final selection
		if (isFinalDateSelection) return

		const clickedDate = parseISO(arg.dateStr)
		if (isBefore(clickedDate, new Date())) {
			toast.error("You can only create events in the future.")
			return
		}

		if (isProposingNewDate) {
			const newEvent = {
				id: Date.now().toString(),
				title: "Available",
				start: arg.dateStr,
				end: format(
					addHours(parseISO(arg.dateStr), 1),
					"yyyy-MM-dd'T'HH:mm:ss"
				),
				editable: true,
			}
			setEventsList([...eventsList, newEvent])
		} else {
			const isInAvailableRange = eventsList.some((range: any) => {
				const start = parseISO(range.start)
				const end = parseISO(range.end)
				return !isBefore(clickedDate, start) && !isAfter(clickedDate, end)
			})

			// Check if the clicked date is within available time ranges
			if (isInAvailableRange) {
				const newEvent = {
					id: Date.now().toString(),
					title: "Available",
					start: arg.dateStr,
					end: format(
						addHours(parseISO(arg.dateStr), 1),
						"yyyy-MM-dd'T'HH:mm:ss"
					),
					constraint: "availableForMeeting",
					editable: true,
				}
				setEventsList([...eventsList, newEvent])
			} else {
				toast.error("You can only create events in the available time ranges.")
			}
		}
	}

	const handleEventDrop = (arg: any) => {
		const updatedEvents = eventsList.map((event: any) => {
			if (event.id === arg.event.id) {
				return {
					...event,
					start: arg.event.start,
					end: arg.event.end,
				}
			}
			return event
		})
		setEventsList(updatedEvents)
	}

	const handleEventResize = (arg: any) => {
		// Calculate the duration in milliseconds directly
		const duration = arg.event.end.getTime() - arg.event.start.getTime()
		const minDuration = 60 * 60 * 1000 // 1 hour in milliseconds

		if (duration < minDuration) {
			arg.revert() // Reverts the event to its original size if less than 1 hour
			toast.error("Minimum duration is 1 hour.")
			return
		}

		const updatedEvents = eventsList.map((event: any) => {
			if (event.id === arg.event.id) {
				return {
					...event,
					start: arg.event.start,
					end: arg.event.end,
				}
			}
			return event
		})
		setEventsList(updatedEvents)
	}

	const bodyScrollControls: {
		scrollBarWidth: number
		disable: () => void
		enable: () => void
	} = {
		scrollBarWidth: 0,

		disable() {
			const mainElement = document.querySelector("main")
			if (mainElement) {
				this.scrollBarWidth = mainElement.offsetWidth - mainElement.clientWidth
				mainElement.style.marginRight = `${this.scrollBarWidth}px`
				mainElement.style.overflow = "hidden"
			}
		},

		enable() {
			const mainElement = document.querySelector("main")
			if (mainElement) {
				mainElement.style.marginRight = ""
				mainElement.style.overflow = ""
			}
		},
	}
	const handleEventDidMount = (arg: any) => {
		if (arg.event._def.ui.display === "background") return // Skip background events
		arg.el.addEventListener("contextmenu", (jsEvent: MouseEvent) => {
			jsEvent.preventDefault()
			bodyScrollControls.disable()
			setContextMenu({
				visible: true,
				x: jsEvent.clientX,
				y: jsEvent.clientY,
				eventId: arg.event.id,
			})
		})
	}

	const handleDeleteEvent = () => {
		if (contextMenu.eventId) {
			setEventsList(
				eventsList.filter((event: any) => event.id !== contextMenu.eventId)
			)
			setContextMenu({ visible: false, x: 0, y: 0, eventId: null })
			bodyScrollControls.enable()
		}
	}

	const handleContextMenuClose = () => {
		setContextMenu({ visible: false, x: 0, y: 0, eventId: null })
		bodyScrollControls.enable()
	}

	return (
		<>
			<div>
				<div className="flex flex-col items-center gap-2 sm:flex-row justify-between mb-4">
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
						{setIsProposingNewDate && (
							<Toggle
								variant="outline"
								pressed={isProposingNewDate}
								onPressedChange={setIsProposingNewDate}
							>
								Propose a new date
							</Toggle>
						)}
					</div>
				</div>
				<div className="overflow-auto">
					<div className="min-w-[600px]">
						<FullCalendar
							ref={calendarRef}
							plugins={[timeGridPlugin, interactionPlugin]}
							events={eventsList}
							initialView="timeGridWeek"
							allDaySlot={false}
							eventStartEditable={true}
							nowIndicator={true}
							slotMinTime="09:00:00"
							slotMaxTime="18:00:00"
							height={550}
							hiddenDays={[0]}
							validRange={{
								start: new Date(),
							}}
							dayHeaderContent={(eventInfo: any) => (
								<div className="my-2 flex flex-col justify-center items-center shrink-0">
									<h4 className="font-medium">
										{dayjs(eventInfo.date).format("ddd")}
									</h4>
									<h5
										className={`font-normal text-sm h-6 w-6 grid place-content-center text-accent-foreground ${
											eventInfo.isToday &&
											"bg-primary text-primary-foreground rounded-full"
										}`}
									>
										{dayjs(eventInfo.date).format("D")}
									</h5>
								</div>
							)}
							slotLabelContent={(eventInfo: any) => (
								<h5 className="uppercase text-xs text-accent-foreground font-medium h-4 w-12 text-center">
									{eventInfo.text}
								</h5>
							)}
							headerToolbar={false}
							nowIndicatorClassNames={(arg: any) => {
								if (arg.isAxis) {
									return "!border-x-primary"
								} else {
									return "!border-primary"
								}
							}}
							firstDay={getDay(new Date())}
							dateClick={handleDateClick}
							eventDidMount={handleEventDidMount}
							eventDrop={handleEventDrop}
							eventResize={handleEventResize}
						/>
					</div>
				</div>
			</div>
			{contextMenu.visible && (
				<div
					className="fixed z-50 bg-white shadow-lg rounded p-1 flex flex-col"
					style={{ top: contextMenu.y, left: contextMenu.x }}
				>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleDeleteEvent}
						className="justify-start"
					>
						Delete Event
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleContextMenuClose}
						className="justify-start"
					>
						Cancel
					</Button>
				</div>
			)}
		</>
	)
}
