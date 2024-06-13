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
import {
	createInterviewCandidateSchema,
	createInterviewInterviewSchema,
} from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Header from "../../components/header"
import ScheduleOrderDnd from "../components/schedule-dnd"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { useState } from "react"
import { TimePicker } from "@/components/ui/time-picker"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function CreateInterviewPage() {
	const [interviewSchedulingMethod, setInterviewSchedulingMethod] =
		useState<string>("flexible")

	const candidateForm = useForm<z.infer<typeof createInterviewCandidateSchema>>(
		{
			resolver: zodResolver(createInterviewCandidateSchema),
			defaultValues: {
				email: "",
				name: "",
				position: "",
				currentEmployer: "",
				candidateInformationUrl: "",
			},
		}
	)

	const interviewForm = useForm<z.infer<typeof createInterviewInterviewSchema>>(
		{
			resolver: zodResolver(createInterviewInterviewSchema),
			defaultValues: {
				interviewType: "",
				position: "",
				interviewDuration: 0,
				interviewer1: "",
				interviewer2: "",
			},
		}
	)

	return (
		<>
			<Header title="Create Interview" subTitle="Tuesday, Jan 5, 2023" />
			<div className="grid-dashboard">
				<div className="card-primary">
					<h3 className="font-medium text-xl">Interview Details</h3>
					<hr className="my-6" />
					<div>
						<h4 className="mb-4 text-xl">Candidate Information</h4>
						<Form {...candidateForm}>
							<form className="space-y-4">
								<FormField
									control={candidateForm.control}
									name="name"
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
									control={candidateForm.control}
									name="email"
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
									control={candidateForm.control}
									name="position"
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
									control={candidateForm.control}
									name="currentEmployer"
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
									control={candidateForm.control}
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
							</form>
						</Form>
					</div>
					<hr className="my-14" />
					<div>
						<h4 className="mb-4 text-xl">Interview Information</h4>
						<Form {...interviewForm}>
							<form className="space-y-4">
								<FormField
									control={interviewForm.control}
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
									control={interviewForm.control}
									name="position"
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
									control={interviewForm.control}
									name="interviewDuration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Interview Duration &#40; Minutes &#41;
											</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={interviewForm.control}
									name="interviewer1"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interviewers' Email</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={interviewForm.control}
									name="interviewer2"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</div>
					<hr className="my-14" />
					<div>
						<h4 className="mb-4 text-xl">Additional Details</h4>
						<Form {...interviewForm}>
							<form className="space-y-4">
								<FormField
									control={interviewForm.control}
									name="interviewSchedulingMethod"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interview Scheduling Method</FormLabel>
											<Select
												onValueChange={value => {
													field.onChange(value)
													setInterviewSchedulingMethod(value)
												}}
												defaultValue="flexible"
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select method" />
													</SelectTrigger>
												</FormControl>
												<SelectContent defaultValue="flexible">
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
										control={interviewForm.control}
										name="candidateEmailTemplate"
										render={() => (
											<FormItem>
												<FormLabel>Interview Date Range</FormLabel>
												<DateRangePicker />
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
										control={interviewForm.control}
										name="interviewTime"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="text-left">
													Interview Time
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
																	format(field.value, "PPP HH:mm:ss")
																) : (
																	<span>Pick a date</span>
																)}
															</Button>
														</PopoverTrigger>
													</FormControl>
													<PopoverContent className="w-auto p-0">
														<Calendar
															mode="single"
															selected={field.value}
															onSelect={field.onChange}
															initialFocus
														/>
														<div className="p-3 border-t border-border">
															<TimePicker
																setDate={field.onChange}
																date={field.value}
															/>
														</div>
													</PopoverContent>
												</Popover>
											</FormItem>
										)}
									/>
								)}
								<FormField
									control={interviewForm.control}
									name="candidateEmailTemplate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Candidate Email Template</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
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
									control={interviewForm.control}
									name="candidateEmailTemplate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interviewer Email Template</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
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
										control={interviewForm.control}
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
										control={interviewForm.control}
										name="feedbackFrequency"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Feedback Frequency</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue="daily"
												>
													<FormControl>
														<SelectTrigger>
															<SelectValue placeholder="Select frequency of notifications" />
														</SelectTrigger>
													</FormControl>
													<SelectContent defaultValue="daily">
														{frequency?.map(frequency => (
															<SelectItem value={frequency} key={frequency}>
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
									control={interviewForm.control}
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
									control={interviewForm.control}
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
							</form>
						</Form>
					</div>
				</div>
				<div className="flex flex-col justify-between gap-4">
					<div className="space-y-4">
						<div className="card-primary">
							<h3 className="mb-6 text-lg">Upload Resume</h3>
							<DragDropFiles />
						</div>
						<div className="card-primary">
							<h3 className="mb-6 text-lg">Notes</h3>
							<Textarea className="" rows={5} />
						</div>
						{interviewSchedulingMethod === "flexible" && (
							<div className="card-primary">
								<h3 className="mb-6 text-lg">Order of Schedule</h3>
								<ScheduleOrderDnd />
							</div>
						)}
					</div>
					<div className="flex space-x-2 max-lg:mb-6">
						<Button variant="secondary" className="w-full">
							Cancel
						</Button>
						<Button className="w-full">Create Interview</Button>
					</div>
				</div>
			</div>
		</>
	)
}
