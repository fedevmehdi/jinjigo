import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ReactNode } from "react"

interface InterviewDetails {
	open: boolean
	setOpen: (state: boolean) => void
	companyName: string
	companyType: string
	status: "Scheduled" | "Scheduling" | "In Evaluation"
	children: ReactNode
}
export default function InterviewDetails({
	open,
	setOpen,
	companyName,
	companyType,
	status,
	children,
}: InterviewDetails) {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetContent>
				<div>
					<h2 className="text-2xl font-medium">{companyName}</h2>
					<p className="mt-1 mb-2 text-muted-foreground">{companyType}</p>
					<div className="bg-red-500 text-white text-sm inline-block rounded-full p-1 px-3">
						{status}
					</div>
				</div>
				<Tabs defaultValue="information">
					<TabsList>
						<TabsTrigger value="information">Information</TabsTrigger>
						<TabsTrigger value="interview">Interview</TabsTrigger>
						<TabsTrigger value="files">Files</TabsTrigger>
						<TabsTrigger value="notes">Notes</TabsTrigger>
					</TabsList>
					<TabsContent value="information" className="py-4 md:p-4 space-y-4">
						{children}
					</TabsContent>
				</Tabs>
			</SheetContent>
		</Sheet>
	)
}
