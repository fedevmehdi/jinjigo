import Header from "@/components/screens/dashboard/header"
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
import { Textarea } from "@/components/ui/textarea"
import { createInterviewCandidateSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { UploadCloud } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export default function CreateInterviewView() {
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
	return (
		<>
			<Header title="Create Interview" subTitle="Tuesday, Jan 5, 2023" />
			<div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-4 lg:gap-6 h-[75vh]">
				<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6 overflow-auto">
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
				</div>
				<div className="flex flex-col justify-between gap-4">
					<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
						<h3 className="mb-6 font-medium text-xl">Upload Resume</h3>
						<div className="border-[3.2px] border-dashed p-4 rounded-lg h-60 mb-2 grid place-content-center hover:bg-muted/40 transition-all cursor-pointer">
							<div className="max-w-44 text-center">
								<UploadCloud className="w-10 h-10 mx-auto mb-2" />
								<h4 className="text-sm text-muted-foreground">
									<span className="text-blue-600 font-medium">
										Click to Upload
									</span>{" "}
									or drag and drop png, jpg, or pdf files.
								</h4>
							</div>
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
