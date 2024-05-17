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
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/state/store"
import { User } from "@/lib/types"
import { logout } from "@/services/state/auth/authSlice"

interface UserDropdown {
	collapse?: boolean
}

export default function UserDropdown({ collapse }: UserDropdown) {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)
	const dispatch = useDispatch<AppDispatch>()

	const handleLogout = () => {
		dispatch(logout())
	}

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
						{!collapse && <h5 className="font-medium">{user.username}</h5>}
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
					<h5 className="">{user.username}</h5>
					<h6 className="text-sm text-accent-foreground">{user.email}</h6>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link to="/app/settings">Settings</Link>
				</DropdownMenuItem>
				<Button
					size="sm"
					className="w-full mt-2 bg-red-600 hover:bg-red-700"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
