import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import InterviewDetails from "@/components/modals/interview-details"

interface InterviewDataTable<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function InterviewDataTable<TData, TValue>({
	columns,
	data,
}: InterviewDataTable<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [open, setOpen] = useState<boolean>(false)
	const [selectedInterview, setSelectedInterview] = useState<any>(null)

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	})

	const handleRowClick = (interview: any) => {
		setSelectedInterview(interview)
		setOpen(true)
	}

	return (
		<>
			{selectedInterview && (
				<InterviewDetails
					open={open}
					setOpen={setOpen}
					interview={selectedInterview}
				/>
			)}
			<Table className="border-separate border-spacing-y-2">
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								className="group cursor-pointer"
								onClick={() => handleRowClick(row.original)}
							>
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className="group-hover:bg-secondary transition-all first:rounded-l-lg last:rounded-r-lg last:!px-2"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
