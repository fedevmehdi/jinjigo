import { Button } from "@/components/ui/button"
import DragDropFiles from "@/components/ui/drag-drop-files"
import {
	Form,
	FormControl,
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
import { interviewTypes } from "@/database"
import {
	createInterviewCandidateSchema,
	createInterviewInterviewSchema,
} from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Header from "../../components/header"
import ScheduleOrderDnd from "../components/schedule-dnd"

export default function CreateInterviewPage() {
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
			<div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-4 lg:gap-6">
				<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
					<h3 className="font-medium text-xl">Interview Details</h3>
					<hr className="my-6" />
					<div>
						<h4 className="mb-4 text-xl">Candidate Information</h4>
						<Form {...candidateForm}>
							<form className="space-y-4">
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
												<Input required {...field} />
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
											<FormLabel>Interviewers</FormLabel>
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
				</div>
				<div className="flex flex-col justify-between gap-4">
					<div className="space-y-4">
						<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
							<h3 className="mb-6 text-lg">Upload Resume</h3>
							<DragDropFiles />
						</div>
						<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
							<h3 className="mb-6 text-lg">Notes</h3>
							<Textarea className="" rows={5} />
						</div>
						<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
							<h3 className="mb-6 text-lg">Order of Schedule</h3>
							<ScheduleOrderDnd />
						</div>
					</div>
					<div className="flex space-x-2 max-lg:mb-6">
						<Button variant="secondary" className="w-full">
							Cancel
						</Button>
						<Button className="w-full">Confirm</Button>
					</div>
				</div>
			</div>
		</>
	)
}
