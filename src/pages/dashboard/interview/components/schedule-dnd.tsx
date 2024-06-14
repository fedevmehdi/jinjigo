import { Reorder } from "framer-motion"

interface ScheduleOrderDndProps {
	items: string[]
	setItems: (state: string[]) => void
}

export default function ScheduleOrderDnd({
	items,
	setItems,
}: ScheduleOrderDndProps) {
	return (
		<Reorder.Group values={items} onReorder={setItems} className="space-y-2">
			{items.map((item, index) => (
				<Reorder.Item
					key={item}
					value={item}
					className="border rounded-lg py-3 px-4 cursor-grab flex gap-2 items-center bg-secondary"
				>
					<h4 className="w-4">{index + 1}</h4>
					<h4 className="capitalize">{item}</h4>
				</Reorder.Item>
			))}
		</Reorder.Group>
	)
}
