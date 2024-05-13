import { Checkbox } from "./checkbox"

interface Notification {
	title: string
	description: string
	date: string
}
export default function Notification({
	title,
	description,
	date,
}: Notification) {
	return (
		<div className="flex border rounded border-l-4 border-l-yellow-400 p-4 text-sm">
			<Checkbox className="mb-[1px] me-2" />
			<div className="w-full">
				<h4 className="font-medium mb-1">{title}</h4>
				<h5 className="text-secondary-foreground">{description}</h5>
				<h6 className="text-muted-foreground text-xs mt-2">{date}</h6>
			</div>
		</div>
	)
}
