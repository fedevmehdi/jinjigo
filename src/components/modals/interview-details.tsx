import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ReactNode } from "react"
import { ExternalLink } from "lucide-react"

interface InterviewDetails {
	open: boolean
	setOpen: (state: boolean) => void
	candidateName: string
	candidateEmail: string
	status: "Scheduled" | "Scheduling" | "In Evaluation"
	children: ReactNode
}

type ListItem = {
	title: string
	value: string
}
const ListItem = ({ title, value }: ListItem) => {
	return (
		<div>
			<h4 className="font-medium text-lg">{title}</h4>
			<h4 className="text-muted-foreground font-normal capitalize">{value}</h4>
		</div>
	)
}
export default function InterviewDetails({ open, setOpen, interview }: any) {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<div>
					<h2 className="text-2xl font-medium">{interview.candidateName}</h2>
					<p className="mt-1 mb-2 text-muted-foreground">
						{interview.candidateEmail}
					</p>
					<div className="bg-red-500 text-white text-sm inline-block rounded-full p-1 px-3 capitalize">
						{interview.status}
					</div>
				</div>
				<Tabs defaultValue="interview">
					<TabsList>
						<TabsTrigger value="interview">Interview</TabsTrigger>
						<TabsTrigger value="candidate">Candidate</TabsTrigger>
						<TabsTrigger value="resume">Resume</TabsTrigger>
						<TabsTrigger value="notes">Notes</TabsTrigger>
					</TabsList>

					<TabsContent value="interview" className="py-4 md:p-4 space-y-4">
						<ListItem title="Interview Type" value={interview.interviewType} />
						<ListItem
							title="Interview Duration"
							value={interview.interviewDuration + " Minutes"}
						/>
						<ListItem
							title="Interview Position"
							value={interview.interviewPosition}
						/>
						<ListItem
							title="Scheduling Method"
							value={interview.interviewSchedulingMethod}
						/>

						<div>
							<h4 className="font-medium text-lg">Interview Timing</h4>
							<h4 className="text-muted-foreground font-normal capitalize">
								{interview.interviewSchedulingMethod === "fixed" &&
								interview.startTime ? (
									interview.startTime
								) : interview.initialDateRange ? (
									<>
										{interview.intialDateRange.from} -{" "}
										{interview.intialDateRange.to}
									</>
								) : (
									"Not Finalized"
								)}
							</h4>
						</div>
						<ListItem title="HR" value={interview.hr.username} />
					</TabsContent>
					<TabsContent value="candidate" className="py-4 md:p-4 space-y-4">
						<ListItem title="Name" value={interview.candidateName} />
						<ListItem
							title="Current Position"
							value={interview.candidatePosition}
						/>
						<ListItem
							title="Current Employer"
							value={interview.candidateCurrentEmployer}
						/>
						{interview.candidateInformationUrl && (
							<ListItem
								title="Current Employer"
								value={interview.candidateInformationUrl}
							/>
						)}
					</TabsContent>
					<TabsContent value="resume" className="py-4 md:p-4 space-y-4">
						<div>
							<h4 className="font-medium text-lg">Resume</h4>
							{interview.resume.length !== 0 ? (
								interview.resume.map((link: string, index: number) => (
									<div
										key={index}
										className="flex items-center gap-2 cursor-pointer text-blue-600"
									>
										<a href={link} target="_blank">
											File {index + 1}
										</a>
										<ExternalLink className="w-4 h-4" />
									</div>
								))
							) : (
								<h4 className="text-muted-foreground">No Resume Submitted</h4>
							)}
						</div>
					</TabsContent>
					<TabsContent value="notes" className="py-4 md:p-4 space-y-4">
						<div>
							<h4 className="font-medium text-lg">Notes</h4>
							<h4 className="text-muted-foreground font-normal">
								{interview.notes}
							</h4>
						</div>
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	)
}
