import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import * as Tabs from "@radix-ui/react-tabs"
import { Mail, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Notification from "@/components/ui/notification"

export default function HomeView() {
	return (
		<>
			<div className="my-6 lg:mb-8 lg:mt-0">
				<h2 className="text-2xl font-semibold">Good Evening, Tom</h2>
				<h4 className="text-accent-foreground text-lg">Tuesday, Jan 5, 2023</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-[60%_1fr] gap-4 lg:gap-6 h-[75vh]">
				<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
					<div className="flex items-start justify-between">
						<h4 className="text-lg font-medium">Interviews</h4>
						<Button variant="secondary">Create New</Button>
					</div>
					<Tabs.Root defaultValue="tab1">
						<Tabs.List
							className="flex items-center gap-4 my-4 border-b"
							aria-label=""
						>
							<Tabs.Trigger
								className="text-sm text-muted-foreground data-[state=active]:text-secondary-foreground border-transparent border-b-[3px] px-4 py-2 data-[state=active]:border-primary font-medium"
								value="tab1"
							>
								Home
							</Tabs.Trigger>
							<Tabs.Trigger
								className="text-sm text-muted-foreground data-[state=active]:text-secondary-foreground border-transparent border-b-[3px] px-4 py-2 data-[state=active]:border-primary font-medium"
								value="tab2"
							>
								Important
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab1">
							<div className="@container">
								<div className="flex flex-col gap-2  @[500px]:gap-0 @[500px]:flex-row border rounded-lg border-l-4 border-l-sky-400 p-2 text-sm">
									<div className="flex items-center justify-between @[500px]:border-r @[500px]:px-4 w-full">
										<div className="flex items-start gap-2">
											<Checkbox className="mt-[4px] @[500px]:mt-0 @[500px]:mb-[1px]" />
											<h4 className="text-base @[500px]:text-sm font-medium">
												UI Designer - Inoma Digital
											</h4>
										</div>
										<h4 className="text-accent-foreground me-2 @[500px]:me-0">
											5:30 PM
										</h4>
									</div>
									<div className="flex flex-row-reverse  @[500px]:flex-row items-center justify-between w-full ps-4">
										<h4 className="hidden @[500px]:block">Jun 5</h4>
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
						</Tabs.Content>
						<Tabs.Content value="tab2">tab 2</Tabs.Content>
					</Tabs.Root>
				</div>
				<div className="bg-white dark:bg-inherit dark:border shadow-sm rounded-lg p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h4 className="text-lg font-medium">Latest Notifications</h4>
							<Badge variant="circle">4</Badge>
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
					<Tabs.Root defaultValue="tab1">
						<Tabs.List
							className="flex items-center gap-4 my-4 border-b"
							aria-label=""
						>
							<Tabs.Trigger
								className="text-sm text-muted-foreground data-[state=active]:text-secondary-foreground border-transparent border-b-[3px] px-4 py-2 data-[state=active]:border-primary font-medium"
								value="tab1"
							>
								All
							</Tabs.Trigger>
							<Tabs.Trigger
								className="text-sm text-muted-foreground data-[state=active]:text-secondary-foreground border-transparent border-b-[3px] px-4 py-2 data-[state=active]:border-primary font-medium"
								value="tab2"
							>
								Archives
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="tab1" className="space-y-4">
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
						</Tabs.Content>
						<Tabs.Content value="tab2">
							<Notification
								title="Resume Submitted"
								description="Candidate has submitted his resume for interview xyz"
								date="19 May, 2023 (Thursday) at 8:22pm"
							/>
						</Tabs.Content>
					</Tabs.Root>
				</div>
			</div>
		</>
	)
}
