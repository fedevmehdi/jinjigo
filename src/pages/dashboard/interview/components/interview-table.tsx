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

	return (
		<>
			<InterviewDetails
				open={open}
				setOpen={setOpen}
				companyName="Apple .inc"
				companyType="Software Company"
				status="Scheduling"
				children={
					<>
						<div>
							<h4 className="font-medium text-lg">Position</h4>
							<h4 className="text-muted-foreground">UI/UX Designer</h4>
						</div>
						<div>
							<h4 className="font-medium text-lg">HR</h4>
							<h4 className="text-muted-foreground">Banno Atsuro</h4>
						</div>
						<div>
							<h4 className="font-medium text-lg">Interview Date</h4>
							<h4 className="text-muted-foreground">5:30pm | Jun 5th 2024</h4>
						</div>
						<div>
							<h4 className="font-medium text-lg">Interview URL</h4>
							<a className="text-blue-400">
								https://meet.google.com/qjz-mnzu-kgq
							</a>
						</div>
					</>
				}
			/>
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
								onClick={() => setOpen(true)}
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
