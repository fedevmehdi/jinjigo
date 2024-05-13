import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface UserDropdown {
	collapse?: boolean
}

export default function UserDropdown({ collapse }: UserDropdown) {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}
		window.addEventListener("resize", handleResize)
		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex items-center justify-between px-3 mb-10">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						{!collapse && <h5 className="font-medium">Muhammad</h5>}
					</div>
					{!collapse && <ChevronRight className="cursor-pointer" />}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side={isMobile ? "top" : "right"}
				sideOffset={10}
				align="end"
				alignOffset={isMobile ? 10 : collapse ? 0 : -10}
				className="min-w-[200px]"
			>
				<div className="p-2">
					<h5 className="">Muhammad Mehdi</h5>
					<h6 className="text-sm text-accent-foreground">
						edoitachime@gmail.com
					</h6>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link to="/app/settings">Settings</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
