import { Button } from "@/components/ui/button"
import { emailTemplateItems } from "@/database"
import { useState } from "react"
import { JSONContent } from "novel"
import TailwindEditor from "../components/novel/advance-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TemplateType {
	type: string
	value: JSONContent
	subject: string
}

export default function EmailTemplatePage() {
	// const [activeTab, setActiveTab] = useState<number>(0)

	const [values, setValues] = useState<TemplateType[]>(
		emailTemplateItems.map(item => ({
			type: item,
			subject: "",
			value: { type: "doc", content: [] },
		}))
	)

	// const handleSubjectChange = (
	// 	e: ChangeEvent<HTMLInputElement>,
	// 	index: number
	// ): void => {
	// 	const newValues = [...values]
	// 	newValues[index].subject = e.target.value
	// 	setValues(newValues)
	// }

	const handleEditorChange = (newValue: JSONContent, index: number): void => {
		const newValues = [...values]
		newValues[index].value = newValue
		setValues(newValues)
	}

	return (
		<div>
			<h2 className="mb-1 text-secondary-foreground">Feedback Notification</h2>
			<p className="text-accent-foreground">
				This email will be sent to the user to inform them about submiting the
				feedback after the interview.
			</p>

			<div className="mt-8 card-primary">
				<div className="flex flex-col gap-2 mb-4">
					<h3 className="text-xl">Template Name</h3>
					<p className="text-accent-foreground">Description</p>
				</div>

				<Tabs className="mt-8" defaultValue="Feedback">
					<TabsList className="mb-6">
						{emailTemplateItems.map((item, index) => (
							<TabsTrigger
								key={index}
								value={item}
								// onClick={() => setActiveTab(index)}
							>
								{item}
							</TabsTrigger>
						))}
					</TabsList>

					{values.map((template, index) => (
						<TabsContent key={index} value={template.type}>
							<h4 className="mb-2">Subject: Working with UI</h4>
							<TailwindEditor
								initialValue={template.value}
								onChange={newValue => handleEditorChange(newValue, index)}
								editable={false}
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
			<div className="text-end mt-4 space-x-2">
				<Button>Edit</Button>
			</div>
		</div>
	)
}
