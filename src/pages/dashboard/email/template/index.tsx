import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, PlusSquare, Trash } from "lucide-react"
import Header from "../../components/header"
import { useNavigate } from "react-router-dom"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function EmailTemplatePage() {
	const navigate = useNavigate()
	return (
		<>
			<Header title="Email Template" />
			<div className="grid-dashboard">
				<div>
					<Button
						variant="ghost"
						className="mb-4"
						onClick={() => navigate("/dashboard/new-email-template")}
					>
						<div className="flex items-center gap-2">
							<PlusSquare />
							Create a new Email Template
						</div>
					</Button>
					<div className="container-primary grid grid-cols-2 gap-2">
						<div className="w-full flex justify-between items-center bg-secondary p-2 px-4 rounded-lg ">
							<h4 className="font-medium">Template Name</h4>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreHorizontal />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									alignOffset={5}
									sideOffset={-5}
								>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Copy className="h-4 w-4" />
											Duplicate
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Trash className="h-4 w-4" />
											Delete
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="w-full flex justify-between items-center bg-secondary p-2 px-4 rounded-lg">
							<h4 className="font-medium">Template Name</h4>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreHorizontal />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									alignOffset={5}
									sideOffset={-5}
								>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Copy className="h-4 w-4" />
											Duplicate
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Trash className="h-4 w-4" />
											Delete
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="w-full flex justify-between items-center bg-secondary p-2 px-4 rounded-lg">
							<h4 className="font-medium">Template Name</h4>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreHorizontal />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									alignOffset={5}
									sideOffset={-5}
								>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Copy className="h-4 w-4" />
											Duplicate
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Trash className="h-4 w-4" />
											Delete
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="w-full flex justify-between items-center bg-secondary p-2 px-4 rounded-lg">
							<h4 className="font-medium">Template Name</h4>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost">
										<MoreHorizontal />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									alignOffset={5}
									sideOffset={-5}
								>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Copy className="h-4 w-4" />
											Duplicate
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<div className="flex items-center gap-2 cursor-pointer">
											<Trash className="h-4 w-4" />
											Delete
										</div>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
