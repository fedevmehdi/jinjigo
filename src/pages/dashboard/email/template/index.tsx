import { Button } from "@/components/ui/button"
import { emailTemplateItems } from "@/database"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createEmailTemplateSchema } from "@/lib/formSchemas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Editor from "../components/editor"
import { z } from "zod"
import EmailTemplatePreviewModal from "@/components/modals/email-template-preview"

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

export default function EmailTemplatePage() {
	const [data, setData] = useState(INITIAL_DATA)

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
		<div>
			<h2 className="mb-1 text-secondary-foreground">Feedback Notification</h2>
			<p className="text-accent-foreground">
				This email will be sent to the user to inform them about submiting the
				feedback after the interview.
			</p>
			<div className="lg:grid grid-cols-[15rem_1fr] gap-4 mt-8">
				<div className="sm:max-w-sm space-y-2 mb-4">
					{emailTemplateItems.map((item, index) => (
						<div
							className={`w-full p-3 px-4 rounded ${
								index === 0 && " bg-primary text-white"
							}`}
							role="button"
							onClick={() => navigate("/email-template/id")}
							key={index}
						>
							<h4 className="font-medium">{item}</h4>
						</div>
					))}
				</div>
				<div className="card-primary">
					<Form {...form}>
						<form className="space-y-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Subject</FormLabel>
										<FormControl>
											<Input required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div>
								<Label>Content</Label>
								<div className="min-[650px]:ps-[70px] border px-6 rounded mt-2 editorjs-wrapper">
									<Editor
										data={data}
										setData={setData}
										editorblock="editorjs-container"
									/>
								</div>
							</div>
						</form>
					</Form>
					<div className="text-end mt-4 space-x-2">
						<EmailTemplatePreviewModal>
							<Editor
								data={data}
								setData={setData}
								editorblock="editorjs-preview"
								readOnly={true}
							/>
						</EmailTemplatePreviewModal>
						<Button>Save</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
