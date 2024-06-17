import { useRef, MouseEvent, DragEvent, useState, useEffect } from "react"
import { Link, Plus, Trash2, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadFile } from "@/lib/utils"
import { toast } from "sonner"

interface FileData {
	name: string
	url: string
}

interface DragDropFilesProps {
	onChange: (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| { target: { name: string; value: string[] } }
	) => void
	onBlur: () => void
	value: string[] | undefined
	name: string
}

export default function DragDropFiles({
	onChange,
	onBlur,
	value,
	name,
}: DragDropFilesProps) {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [files, setFiles] = useState<FileData[]>(
		value
			? value.map(url => ({
					name: decodeURIComponent(url.split("%2F")[1].split("?")[0]),
					url,
			  }))
			: []
	)

	useEffect(() => {
		setFiles(
			value
				? value.map(url => ({
						name: decodeURIComponent(url.split("%2F")[1].split("?")[0]),
						url,
				  }))
				: []
		)
	}, [value])

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const droppedFiles = event.dataTransfer.files
		if (droppedFiles.length > 0) {
			const newFiles = Array.from(droppedFiles)
			const updatedFiles = [...files]

			for (const file of newFiles) {
				const url = await uploadFile(file)
				if (url) {
					updatedFiles.push({ name: file.name, url })
				}
			}

			setFiles(updatedFiles)
			onChange({ target: { name, value: updatedFiles.map(file => file.url) } })
		}
	}

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files)
			const updatedFiles = [...files]

			for (const file of newFiles) {
				const url = await uploadFile(file)
				if (url) {
					updatedFiles.push({ name: file.name, url })
				}
			}

			setFiles(updatedFiles)
			onChange({ target: { name, value: updatedFiles.map(file => file.url) } })
		}
	}

	const removeFile = (index: number) => {
		const updatedFiles = files.filter((_, i) => i !== index)
		setFiles(updatedFiles)
		onChange({ target: { name, value: updatedFiles.map(file => file.url) } })
	}

	const copyUrl = (index: number) => {
		const url = files[index].url
		navigator.clipboard
			.writeText(url)
			.then(() => {
				toast.success("URL copied to clipboard!")
			})
			.catch(err => {
				console.error("Failed to copy URL: ", err)
			})
	}

	return (
		<>
			<input
				type="file"
				hidden
				aria-hidden
				ref={inputRef}
				multiple={true}
				accept=".jpg, .jpeg, .png, .pdf, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
				onChange={handleChange}
				onBlur={onBlur}
			/>
			{files.length === 0 ? (
				<div
					className="border-[3.2px] border-dashed p-4 rounded-lg h-60 mb-2 grid place-content-center hover:bg-muted/40 transition-all cursor-pointer"
					onClick={handleClick}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				>
					<div className="max-w-44 text-center">
						<UploadCloud className="w-10 h-10 mx-auto mb-2" />
						<h4 className="text-sm text-muted-foreground">
							<span className="text-blue-600 font-medium">Click to Upload</span>{" "}
							or drag and drop png, jpg, pdf, or docx files.
						</h4>
					</div>
				</div>
			) : (
				<>
					<ul className="space-y-2">
						{files.map((file, index) => (
							<li
								key={index}
								className="flex items-center justify-between border rounded py-2 px-4 bg-secondary"
							>
								<h4 className="font-normal text-sm">{file.name}</h4>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="icon"
										className="w-6 h-6"
										onClick={() => copyUrl(index)}
									>
										<Link className="w-4 h-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										className="w-6 h-6"
										onClick={() => removeFile(index)}
									>
										<Trash2 className="text-red-600 cursor-pointer w-4 h-4" />
									</Button>
								</div>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-end gap-2">
						<Button
							size="icon"
							variant="ghost"
							onClick={handleClick}
							className="h-7 w-7"
						>
							<Plus className="w-5 h-5" />
						</Button>
					</div>
				</>
			)}
		</>
	)
}
