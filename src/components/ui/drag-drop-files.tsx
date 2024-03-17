import { Loader2, Plus, Trash2, UploadCloud } from "lucide-react"
import { useRef, MouseEvent, DragEvent, useState } from "react"
import { Button } from "./button"

export default function DragDropFiles() {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const [files, setFiles] = useState<File[]>([])
	const [loading, setLoading] = useState(false)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation()

		if (!inputRef.current) {
			console.log(inputRef.current)
			return
		}
		inputRef.current.click()
	}
	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}
	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		const files = event.dataTransfer.files
		if (files.length > 0) {
			setFiles(prevFiles => [...prevFiles, ...Array.from(files)])
		}
	}
	const removeFile = (index: number) => {
		setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
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
				onChange={event => {
					if (event.target.files) {
						setLoading(true)
						setFiles(prevFiles => [
							...prevFiles,
							...Array.from(event.target.files as FileList),
						])
					}
					setTimeout(() => {
						setLoading(false)
					}, 2000)
				}}
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
								className="flex items-center justify-between border rounded-lg py-3 px-4 bg-secondary"
							>
								<h4>{file.name}</h4>
								<Trash2
									className="text-red-600 cursor-pointer"
									onClick={() => removeFile(index)}
								/>
							</li>
						))}
					</ul>
					<div className="flex items-center justify-end gap-2 mt-4">
						{loading && <Loader2 className="animate-spin" />}
						<Button
							size="icon"
							variant="ghost"
							onClick={handleClick}
							disabled={loading}
						>
							<Plus />
						</Button>
					</div>
				</>
			)}
		</>
	)
}
