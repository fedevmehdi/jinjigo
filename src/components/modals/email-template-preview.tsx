import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EmailTemplatePreviewModal({ children }: any) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Preview</Button>
			</DialogTrigger>
			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>Preview</DialogTitle>
					<ScrollArea className="h-[30rem]">{children}</ScrollArea>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
