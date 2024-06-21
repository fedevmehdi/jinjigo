import { Button } from "@/components/ui/button"
import DragDropFiles from "@/components/ui/drag-drop-files"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { frequency, interviewTypes } from "@/database"
import { createInterviewSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import Header from "../../components/header"
import ScheduleOrderDnd from "../components/schedule-dnd"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useEffect, useState } from "react"
import { TimePicker } from "@/components/ui/time-picker"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Loader from "@/components/modals/loader"
import { createInterview } from "@/services/api"
import { CreateInterview } from "@/lib/types"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export default function CreateInterviewPage() {
	const [interviewSchedulingMethod, setInterviewSchedulingMethod] =
		useState<string>("flexible")
	const [loading, setLoading] = useState(false)
	const redirect = useNavigate()

	const scheduleInterview = useForm<z.infer<typeof createInterviewSchema>>({
		resolver: zodResolver(createInterviewSchema),
		defaultValues: {
			interviewType: "",
			candidatePosition: "",
			interviewDuration: 0,
			interviewers: [{ email: "" }],
			interviewSchedulingMethod: "flexible",
			feedbackNotificationFrequency: "daily",
			orderOfSchedule: ["candidate"],
			resume: [],
			candidateEmailTemplateId: "666f405be5ce464888262485",
			interviewerEmailTemplateId: "666f405be5ce464888262485",
		},
	})
	const { fields, append, remove } = useFieldArray({
		control: scheduleInterview.control,
		name: "interviewers",
	})

	useEffect(() => {
		const newItems = [
			"candidate",
			...fields.map((_name, index) => `Interviewer ${index + 1}`),
		]
		scheduleInterview.setValue("orderOfSchedule", newItems)
	}, [fields, scheduleInterview])

	const onSubmit = async (data: z.infer<typeof createInterviewSchema>) => {
		setLoading(true)
		try {
			// Correct format of OrderOfSchedule
			let updatedOrderOfSchedule
			const { candidateEmail, interviewers, orderOfSchedule } = data
			if (orderOfSchedule) {
				updatedOrderOfSchedule = orderOfSchedule.map(name => {
					if (name === "candidate") {
						return candidateEmail
					} else {
						const interviewerIndex = parseInt(name.split(" ")[1]) - 1
						return interviewers[interviewerIndex]?.email || name
					}
				})
			}
			// Correct format of interviewers
			let updatedInterviewers = [""]
			if (interviewers) {
				updatedInterviewers = interviewers.map(interviewer => interviewer.email)
			}
			const updatedData: CreateInterview = {
				...data,
				orderOfSchedule: updatedOrderOfSchedule,
				interviewers: updatedInterviewers,
			}
			const response = await createInterview(updatedData)
			if (response.status === 201) {
				toast.success("Interview Successfully Created")
				redirect("/interviews")
			} else {
				toast.error("Failed to Create Interview")
			}
			console.log(response)
		} catch (error) {
			console.error("Error fetching interviews", error)
			toast.error("Error Fetching Interviews")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Header title="Create Interview" subTitle="Tuesday, Jan 5, 2023" />
			<div className="grid-dashboard">
				<div className="card-primary">
					<h3 className="font-medium text-xl">Interview Details</h3>
					<hr className="my-6" />
					<div>
						<h4 className="mb-4 text-xl">Candidate Information</h4>
						<Form {...scheduleInterview}>
							<form
								className="space-y-4"
								onSubmit={scheduleInterview.handleSubmit(onSubmit)}
							>
								<FormField
									control={scheduleInterview.control}
									name="candidateName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="candidateEmail"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input required type="email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={scheduleInterview.control}
									name="candidateCurrentEmployer"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Current Employer</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="candidatePosition"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Position</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="candidateInformationUrl"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Candidate Information URL</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="resume"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Upload Resume</FormLabel>
											<DragDropFiles {...field} value={field.value || []} />
											<FormMessage />
										</FormItem>
									)}
								/>

								<hr className="my-14" />
								<h4 className="mb-4 text-xl">Interview Information</h4>
								<FormField
									control={scheduleInterview.control}
									name="interviewType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interview Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select the type of interview" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{interviewTypes?.map(type => (
														<SelectItem value={type.value} key={type.value}>
															{type.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="interviewPosition"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Position</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="interviewDuration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Interview Duration &#40; Minutes &#41;
											</FormLabel>
											<FormControl>
												<Input type="number" required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{fields.map((field, index) => (
									<FormField
										key={field.id}
										control={scheduleInterview.control}
										name={`interviewers.${index}.email`}
										render={({ field }) => (
											<FormItem className="relative">
												<FormLabel>{index + 1} Interviewer's Email</FormLabel>
												<FormControl>
													<Input required {...field} />
												</FormControl>
												<FormMessage />
												<div className="absolute right-3 inset-y-0 grid place-content-center pt-6">
													<Button
														variant="ghost"
														size="icon"
														className="w-6 h-6"
														onClick={() => remove(index)}
													>
														<Trash2 className="w-4 h-4" />
													</Button>
												</div>
											</FormItem>
										)}
									/>
								))}
								<Button
									variant="ghost"
									size="sm"
									onClick={() => append({ email: "" })}
								>
									<Plus className="h-4 w-4 me-2" />
									Add Interviewer
								</Button>
								<hr className="my-14" />
								<h4 className="mb-4 text-xl">Additional Details</h4>
								<FormField
									control={scheduleInterview.control}
									name="interviewSchedulingMethod"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Candidate Email Template</FormLabel>
											<Select
												onValueChange={value => {
													field.onChange(value)
													setInterviewSchedulingMethod(value)
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select template" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="flexible">Flexible</SelectItem>
													<SelectItem value="fixed">Fixed</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								{interviewSchedulingMethod === "flexible" ? (
									<FormField
										control={scheduleInterview.control}
										name="initialDateRange"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Interview Date Range</FormLabel>
												<DateRangePicker
													onChange={field.onChange}
													value={field.value}
												/>
												<FormDescription className="text-xs">
													The initial date range during which the interview can
													be conducted.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								) : (
									<FormField
										control={scheduleInterview.control}
										name="interviewStartTime"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="text-left">
													Interview Start Time
												</FormLabel>
												<Popover>
													<FormControl>
														<PopoverTrigger asChild>
															<Button
																variant="outline"
																className={cn(
																	"w-full justify-start text-left font-normal bg-white hover:bg-white",
																	!field.value && "text-muted-foreground"
																)}
															>
																<CalendarIcon className="mr-2 h-4 w-4" />
																{field.value ? (
																	// Ensure field.value is a valid date before formatting
																	isNaN(new Date(field.value).getTime()) ? (
																		<span>Pick a date</span>
																	) : (
																		format(
																			new Date(field.value),
																			"PPP HH:mm:ss"
																		)
																	)
																) : (
																	<span>Pick a date</span>
																)}
															</Button>
														</PopoverTrigger>
													</FormControl>
													<PopoverContent className="w-auto p-0">
														<Calendar
															mode="single"
															selected={
																field.value ? new Date(field.value) : undefined
															}
															onSelect={date => {
																field.onChange(date) // Change here
															}}
															initialFocus
														/>
														<div className="p-3 border-t border-border">
															<TimePicker
																setDate={date => {
																	field.onChange(date)
																}}
																date={
																	field.value
																		? new Date(field.value)
																		: undefined
																}
															/>
														</div>
													</PopoverContent>
												</Popover>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								{interviewSchedulingMethod === "flexible" && (
									<FormField
										control={scheduleInterview.control}
										name="orderOfSchedule"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Order of Schedule</FormLabel>
												<ScheduleOrderDnd
													items={field.value ?? []}
													setItems={newItems => {
														field.onChange(newItems)
													}}
												/>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
								<FormField
									control={scheduleInterview.control}
									name="candidateEmailTemplateId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Candidate Email Template</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select template" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{interviewTypes?.map(type => (
														<SelectItem value={type.value} key={type.value}>
															{type.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="interviewerEmailTemplateId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interviewer Email Template</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select template" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{interviewTypes?.map(type => (
														<SelectItem value={type.value} key={type.value}>
															{type.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid lg:grid-cols-2 gap-2">
									<FormField
										control={scheduleInterview.control}
										name="feedbackDeadline"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Feedback Deadline &#40;Hours&#41;</FormLabel>
												<FormControl>
													<Input type="number" required {...field} />
												</FormControl>
												<FormDescription className="text-xs">
													The number of hours after the interview is conducted
													when the feedback deadline will be triggered.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={scheduleInterview.control}
										name="feedbackNotificationFrequency"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Feedback Frequency</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select frequency of notifications" />
														</SelectTrigger>
													</FormControl>
													<SelectContent defaultValue="daily">
														{frequency?.map((frequency, index) => (
															<SelectItem value={frequency} key={index}>
																{frequency}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={scheduleInterview.control}
									name="escalationEmail"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Escalation Email</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormDescription className="text-xs">
												Leave empty if you don&apos;t want to enable escalation
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={scheduleInterview.control}
									name="escalationDeadline"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Escalation Deadline &#40;Hours&#41;</FormLabel>
											<FormControl>
												<Input type="number" required {...field} />
											</FormControl>
											<FormDescription className="text-xs">
												The number of hours after the interview is conducted
												when the escalation will be triggered.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={scheduleInterview.control}
									name="notes"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Notes</FormLabel>
											<FormControl>
												<Textarea {...field} rows={5} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex space-x-2 max-lg:mb-6">
									<Button variant="secondary" className="w-full">
										Cancel
									</Button>
									<Button className="w-full" type="submit">
										Create Interview
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
			<Loader loading={loading} />
		</>
	)
}
