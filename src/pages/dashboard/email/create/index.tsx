import { useState, ChangeEvent, FormEvent } from "react"
import TailwindEditor from "../components/novel/advance-editor"
import { emailTemplateItems } from "@/database"
import { JSONContent } from "novel"
import Header from "../../components/header"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card"
import { toast } from "sonner"
import { InfoIcon } from "lucide-react"

interface TemplateType {
	type: string
	value: JSONContent
	subject: string
}

interface CompiledData {
	name: string
	description: string
	values: TemplateType[]
}

export default function CreateEmailTemplatePage() {
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [values, setValues] = useState<TemplateType[]>(
		emailTemplateItems.map(item => ({
			type: item,
			subject: "",
			value: { type: "doc", content: [] },
		}))
	)

	const [openPreview, setOpenPreview] = useState<boolean>(false)
	const [activeTab, setActiveTab] = useState<number>(0)

	const handleEditorChange = (newValue: JSONContent, index: number): void => {
		const newValues = [...values]
		newValues[index].value = newValue
		setValues(newValues)
	}

	const handleSubjectChange = (
		e: ChangeEvent<HTMLInputElement>,
		index: number
	): void => {
		const newValues = [...values]
		newValues[index].subject = e.target.value
		setValues(newValues)
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Check if every template has both a subject and content filled
		const isDataComplete = values.every(value => {
			return (
				value.subject.trim() !== "" && (value.value.content?.length ?? 0) > 1
			)
		})

		if (isDataComplete) {
			toast.success("Data complete")

			// Compile data
			const compiledData: CompiledData = {
				name,
				description,
				values,
			}

			console.log(compiledData)
		} else {
			toast.error("Fill all the data first", {
				description:
					"Please recheck every type's content and make sure it has atleast two blocks.",
			})
		}
	}

	return (
		<>
			<Header title="Create Email Template" subTitle="Tuesday, Jan 5, 2023" />
			<div className="mt-8">
				<div className="card-primary">
					<form onSubmit={onSubmit}>
						<div className="space-y-2 mb-4">
							<Label>Template Name</Label>
							<Input
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label>Description</Label>
							<Textarea
								value={description}
								onChange={e => setDescription(e.target.value)}
								className="resize-none"
								required
							/>
						</div>
						<h5 className="mb-2 mt-6">Template Type</h5>
						<Tabs defaultValue={emailTemplateItems[0]}>
							<TabsList>
								{emailTemplateItems.map((item, index) => (
									<TabsTrigger
										key={index}
										value={item}
										onClick={() => setActiveTab(index)}
									>
										{item}
									</TabsTrigger>
								))}
							</TabsList>
							{values.map((template, index) => (
								<TabsContent key={index} value={template.type}>
									<div className="mb-4">
										<Label>Email Subject</Label>
										<Input
											value={template.subject}
											onChange={e => handleSubjectChange(e, index)}
											required
										/>
									</div>
									<div>
										<Label>Content</Label>
										<p className="text-sm text-accent-foreground mb-2">
											Type "/" to start adding blocks.{" "}
											<span className="font-semibold inline-flex items-center">
												For
												<HoverCard>
													<HoverCardTrigger asChild>
														<span className="inline-flex items-center mx-1 cursor-pointer text-primary/80">
															<InfoIcon className="h-4 w-4 me-1" />
															variables
														</span>
													</HoverCardTrigger>
													<HoverCardContent>
														<h5 className="font-normal mb-1">
															Available Variables
														</h5>
														<ul className="ps-4 list-disc leading-normal">
															<li>&#123;recipent&#125;</li>
															<li>&#123;emailSubject&#125;</li>
															<li>&#123;interviewName&#125;</li>
														</ul>
													</HoverCardContent>
												</HoverCard>
												use &#123;variableName&#125;
											</span>
										</p>
										<TailwindEditor
											initialValue={template.value}
											onChange={newValue => handleEditorChange(newValue, index)}
										/>
									</div>
									<Button
										size="sm"
										variant="secondary"
										onClick={e => {
											e.preventDefault()
											setOpenPreview(true)
										}}
										className="mt-2"
									>
										Preview
									</Button>
								</TabsContent>
							))}
						</Tabs>

						<hr className="!my-6" />
						<div className="flex justify-end gap-2">
							<Button variant="secondary">Save as draft</Button>
							<Button type="submit">Create Template</Button>
						</div>
					</form>
				</div>
			</div>
			<Dialog open={openPreview} onOpenChange={setOpenPreview}>
				<DialogContent className="max-w-4xl">
					<ScrollArea className="h-[90vh] lg:h-[80vh]">
						<TailwindEditor
							initialValue={values[activeTab].value}
							onChange={() => {}}
							className="border-0"
							editable={false}
						/>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</>
	)
}
