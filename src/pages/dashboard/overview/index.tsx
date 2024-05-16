import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Notification from "@/components/ui/notification"
import CreateInterviewModal from "@/components/modals/create-interview"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "../components/header"

export default function OverviewPage() {
	const [cimOpen, setCimOpen] = useState(false)

	return (
		<div>
			<Header title="Overview" />
			<div className="grid-dashboard">
				<div>
					<div className="flex items-start justify-between">
						<h4 className="text-lg font-medium">Interviews</h4>
						<Button variant="secondary" onClick={() => setCimOpen(true)}>
							Create New
						</Button>
					</div>
					<Tabs defaultValue="tab1">
						<TabsList aria-label="">
							<TabsTrigger value="tab1">Home</TabsTrigger>
							<TabsTrigger value="tab2">Important</TabsTrigger>
						</TabsList>
						<TabsContent value="tab1">
							<div className="@container">
								<div className="flex flex-col gap-2  @[500px]:gap-0 @[500px]:flex-row border rounded border-l-4 border-l-sky-400 p-2 text-sm">
									<div className="flex items-center justify-between @[500px]:border-r @[500px]:px-4 w-full">
										<div className="flex items-start gap-2">
											<Checkbox className="mt-[4px] @[500px]:mt-0 @[500px]:mb-[1px]" />
											<h4 className="text-base @[500px]:text-sm font-medium">
												UI Designer - Inoma Digital
											</h4>
										</div>
										<h4 className="text-accent-foreground me-2 @[500px]:me-0 font-normal">
											5:30 PM
										</h4>
									</div>
									<div className="flex flex-row-reverse  @[500px]:flex-row items-center justify-between w-full ps-4">
										<h4 className="hidden @[500px]:block font-normal">Jun 5</h4>
										<Button
											size="sm"
											variant="secondary"
											className="ms-2 @[500px]:ms-0"
										>
											Due in 5 days
										</Button>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="tab2">tab 2</TabsContent>
					</Tabs>
				</div>
				<div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h4 className="text-lg font-medium">Latest Notifications</h4>
							<Badge variant="circle" className="!bg-secondary">
								4
							</Badge>
						</div>
						<div className="flex items-center gap-1">
							<Button size="icon" variant="ghost">
								<Mail className="w-5 h-5" />
							</Button>
							<Button size="icon" variant="ghost">
								<Trash className="w-5 h-5" />
							</Button>
						</div>
					</div>
					<Tabs defaultValue="tab1">
						<TabsList aria-label="">
							<TabsTrigger value="tab1">All</TabsTrigger>
							<TabsTrigger value="tab2">Archives</TabsTrigger>
						</TabsList>
						<TabsContent value="tab1" className="space-y-4">
							<Notification
								title="Schedule Change Request"
								description="Interviewer wants to change the interview schedule."
								date="17 May, 2023 (Friday) at 2:30pm"
							/>
							<Notification
								title="Interview Feedback"
								description="Interviewer has submitted the feedback of interview-xyz"
								date="19 May, 2023 (Thursday) at 8:22pm"
							/>
						</TabsContent>
						<TabsContent value="tab2">
							<Notification
								title="Resume Submitted"
								description="Candidate has submitted his resume for interview xyz"
								date="19 May, 2023 (Thursday) at 8:22pm"
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>

			{/* Modals */}
			<CreateInterviewModal open={cimOpen} setOpen={setCimOpen} />
		</div>
	)
}
