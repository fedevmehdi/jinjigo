import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Interview = {
	id: string
	interviewerName: string
	date: string
	status: "scheduled" | "in-evaluation" | "complete" | "failed" | "Scheduling"
	position: string
}

export const columns: ColumnDef<Interview>[] = [
	{
		accessorKey: "candidateName",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Candidate Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			let content = String(row.getValue("candidateName"))
			return <div className="capitalize">{content}</div>
		},
	},
	{
		accessorKey: "interviewType",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Interviewer Type
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			let content = String(row.getValue("interviewType"))
			return <div className="capitalize">{content}</div>
		},
	},
	{
		accessorKey: "interviewPosition",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Position
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			let content = String(row.getValue("interviewPosition"))
			return <div className="capitalize">{content}</div>
		},
	},
	{
		accessorKey: "interviewSchedulingMethod",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Scheduling Method
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			let content = String(row.getValue("interviewSchedulingMethod"))
			return <div className="capitalize">{content}</div>
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => {
			let status = String(row.getValue("status"))
			const formatted = status.replace("-", " ")
			return (
				<div className="w-full text-center capitalize bg-primary text-primary-foreground rounded p-2 px-3 whitespace-nowrap">
					{formatted}
				</div>
			)
		},
	},
]
