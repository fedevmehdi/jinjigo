import { Reorder } from "framer-motion"
import { GripHorizontal } from "lucide-react"

interface ScheduleOrderDndProps {
	items: string[]
	setItems: (state: string[]) => void
}

export default function ScheduleOrderDnd({
	items,
	setItems,
}: ScheduleOrderDndProps) {
	return (
		<Reorder.Group values={items} onReorder={setItems} className="space-y-1">
			{items.map((item, index) => (
				<Reorder.Item
					key={item}
					value={item}
					className="border rounded py-2 px-4 cursor-grab flex justify-between items-center bg-secondary"
				>
					<div className="flex items-center">
						<h5 className="w-4">{index + 1}</h5>
						<h5 className="capitalize font-normal">{item}</h5>
					</div>
					<GripHorizontal className="w-4 h-4" />
				</Reorder.Item>
			))}
		</Reorder.Group>
	)
}
