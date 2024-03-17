import { useState } from "react"
import { Reorder } from "framer-motion"

const listItems = [
	{ name: "Candidate", id: 1 },
	{ name: "Interviewer 1", id: 2 },
	{ name: "Interviewer 2", id: 3 },
]
export default function ScheduleOrderDnd() {
	const [items, setItems] = useState(listItems)
	console.log(items)
	return (
		<Reorder.Group values={items} onReorder={setItems} className="space-y-2">
			{items.map((item, index) => (
				<Reorder.Item
					key={item.id}
					value={item}
					className="border rounded-lg py-3 px-4 cursor-grab flex gap-2 items-center bg-secondary"
				>
					<h4 className="w-4">{index + 1}</h4>
					<h4>{item.name}</h4>
				</Reorder.Item>
			))}
		</Reorder.Group>
	)
}
