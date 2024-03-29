import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Header from "../../components/header"
import { createEmailTemplateSchema } from "@/lib/formSchemas"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Editor from "../components/editor"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Preview from "../components/preview"
import { useNavigate } from "react-router-dom"

const INITIAL_DATA = {
	time: new Date().getTime(),
	blocks: [
		{
			type: "header",
			data: {
				text: "This is my awesome editor!",
				level: 1,
			},
		},
	],
}

export default function CreateEmailTemplatePage() {
	const [data, setData] = useState(INITIAL_DATA)
	const [openPreview, setOpenPreview] = useState(false)

	const navigate = useNavigate()

	const form = useForm<z.infer<typeof createEmailTemplateSchema>>({
		resolver: zodResolver(createEmailTemplateSchema),
		defaultValues: {
			templateName: "",
			title: "",
			content: "",
		},
	})

	return (
		<>
			<Header title="Create Email Template" subTitle="Tuesday, Jan 5, 2023" />
			<div className="grid-dashboard">
				<div className="card-primary">
					<Form {...form}>
						<form className="space-y-4">
							<FormField
								control={form.control}
								name="templateName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Template Name</FormLabel>
										<FormControl>
											<Input required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								<Label>Content</Label>
								<div className="min-[650px]:ps-[70px] border px-6 rounded-lg mt-2">
									<Editor
										data={data}
										setData={setData}
										editorblock="editorjs-container"
									/>
								</div>
							</div>
						</form>
					</Form>
					<div className="text-end mt-4">
						<Button variant="outline" onClick={() => setOpenPreview(true)}>
							Preview
						</Button>
					</div>
				</div>
				<div className="flex flex-col justify-end gap-4">
					<div className="flex space-x-2 max-lg:mb-6">
						<Button
							variant="secondary"
							className="w-full"
							onClick={() => navigate("/dashboard/email-templates")}
						>
							Cancel
						</Button>
						<Button className="w-full">Confirm</Button>
					</div>
				</div>
			</div>
			<Dialog open={openPreview} onOpenChange={setOpenPreview}>
				<DialogContent className="max-w-4xl">
					<ScrollArea className="h-[90vh] lg:h-[80vh]">
						<Preview data={data} holder="preview-container" />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	)
}
