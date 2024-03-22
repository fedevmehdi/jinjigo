import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { interviewTypes } from "@/database"
import { createInterviewTemplateSchema } from "@/lib/formSchemas"
import Header from "@/pages/dashboard/components/header"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

export default function CreateInterviewTemplatePage() {
	const navigate = useNavigate()

	const form = useForm<z.infer<typeof createInterviewTemplateSchema>>({
		resolver: zodResolver(createInterviewTemplateSchema),
		defaultValues: {
			interviewType: "",
			interviewDuration: 0,
			candidateEmailTemplate: "",
			interviewerEmailTemplate: "",
			feedbackDeadline: 0,
			escalationDeadline: 0,
			escalationEmail: "",
		},
	})

	return (
		<>
			<Header title="Create Interview Template" />
			<div className="grid-dashboard">
				<div className="card-primary">
					<h3 className="font-medium text-xl">Interview Details</h3>
					<hr className="my-6" />
					<div>
						<Form {...form}>
							<form className="space-y-4">
								<FormField
									control={form.control}
									name="interviewType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interview Type</FormLabel>
											<FormControl>
												<Input required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="interviewDuration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Interview Duration &#40; Minutes &#41;
											</FormLabel>
											<FormControl>
												<Input required type="number" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="candidateEmailTemplate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Candidat&apos;s Email Template</FormLabel>
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
									control={form.control}
									name="interviewerEmailTemplate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Interviewer&apos;s Email Template</FormLabel>
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
								<div className="space-y-1">
									<Label htmlFor="feedback">Feedback</Label>
									<Input id="feedback" type="file" />
								</div>
								<FormField
									control={form.control}
									name="feedbackDeadline"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Feedback Submission Deadline &#40; Hours &#41;
											</FormLabel>
											<FormControl>
												<Input type="number" required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="escalationEmail"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email For Escalation</FormLabel>
											<FormControl>
												<Input type="email" required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="escalationDeadline"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Escalation Alert Deadline &#40; Hours &#41;
											</FormLabel>
											<FormControl>
												<Input type="number" required {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</div>
				</div>
				<div className="flex flex-col justify-end gap-4">
					<div className="flex space-x-2 max-lg:mb-6">
						<Button
							variant="secondary"
							className="w-full"
							onClick={() => navigate("/dashboard/interview-templates")}
						>
							Cancel
						</Button>
						<Button className="w-full">Confirm</Button>
					</div>
				</div>
			</div>
		</>
	)
}
