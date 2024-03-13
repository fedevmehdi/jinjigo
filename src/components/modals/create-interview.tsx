import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent } from "@radix-ui/react-tabs"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { createInterviewTemplateSchema } from "@/lib/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Textarea } from "../ui/textarea"

interface CreateInterviewModal {
	open: boolean
	setOpen?: (state: boolean) => void
}

interface InterviewSection {
	setSection: (state: string) => void
}

function CreateNewInterview({ setSection }: InterviewSection) {
	const form = useForm<z.infer<typeof createInterviewTemplateSchema>>({
		resolver: zodResolver(createInterviewTemplateSchema),
		defaultValues: {
			templateName: "",
			message: "",
		},
	})
	return (
		<>
			<div>
				<DialogHeader className="mb-8">
					<DialogTitle>Create Template</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form className="space-y-4">
						<FormField
							control={form.control}
							name="templateName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Template Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message for Interviewee</FormLabel>
									<FormControl>
										<Textarea rows={6} className="resize-none" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
			</div>
			<DialogFooter>
				<Button
					variant="secondary"
					onClick={() => setSection("create-interview")}
				>
					Cancel
				</Button>
				<Button>Register</Button>
			</DialogFooter>
		</>
	)
}

function CreateInterview({ setSection }: InterviewSection) {
	return (
		<>
			<div>
				<DialogHeader className="mb-8">
					<DialogTitle>Select Template</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="all">
					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						<TabsTrigger value="archieve">Archieve</TabsTrigger>
					</TabsList>
					<TabsContent value="all">
						<div className="space-y-2">
							<div className="@container flex justify-between items-center border rounded-lg border-l-4 border-l-sky-400 p-2 text-sm">
								<div className="flex items-center gap-3 @[400px]:ms-1">
									<Checkbox />
									<h4 className="text-base @[500px]:text-sm font-medium">
										UI Designer - Inoma Digital
									</h4>
								</div>
								<Button variant="secondary">Continue</Button>
							</div>
							<div className="@container flex justify-between items-center border rounded-lg border-l-4 border-l-sky-400 p-2 text-sm">
								<div className="flex items-center gap-3 @[400px]:ms-1">
									<Checkbox />
									<h4 className="text-base @[500px]:text-sm font-medium">
										UI Designer - Inoma Digital
									</h4>
								</div>
								<Button variant="secondary">Continue</Button>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="archieve"></TabsContent>
				</Tabs>
			</div>
			<DialogFooter>
				<Button variant="secondary">Cancel</Button>
				<Button
					className="flex items-center gap-1"
					onClick={() => setSection("create-new-interview")}
				>
					Create New <PlusIcon className="w-4 h-4 mb-[1px]" />
				</Button>
			</DialogFooter>
		</>
	)
}

export default function CreateInterviewModal({
	open,
	setOpen,
}: CreateInterviewModal) {
	const [section, setSection] = useState("create-interview")

	const renderSection = () => {
		switch (section) {
			case "create-interview":
				return <CreateInterview setSection={setSection} />
			case "create-new-interview":
				return <CreateNewInterview setSection={setSection} />
		}
	}
	return (
		<Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-2xl min-h-screen lg:min-h-[30rem] flex flex-col justify-between">
				{renderSection()}
			</DialogContent>
		</Dialog>
	)
}
