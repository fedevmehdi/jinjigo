import { Link, useLocation } from "react-router-dom"
import { NavItem, User } from "@/lib/types"
import { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { RootState } from "@/services/state/store"
import { useSelector } from "react-redux"

interface DashboardNavProps {
	items: NavItem[]
	setOpen?: Dispatch<SetStateAction<boolean>>
	collapse?: boolean
}

export function DashboardNav({ items, setOpen, collapse }: DashboardNavProps) {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)
	let location = useLocation()

	// Filter items based on user roles
	const filteredItems = items.filter(item => {
		if (item.role === "EVERYONE") return true
		item.role === user.role
	})
	console.log(user.role)
	if (!items?.length) {
		return null
	}

	return (
		<nav className="grid items-start gap-1">
			{filteredItems.map((item, index) => {
				const Icon = Icons[item.icon || "arrowRight"]
				return (
					item.href && (
						<Link
							key={index}
							to={item.disabled ? "/" : item.href}
							onClick={() => {
								if (setOpen) setOpen(false)
							}}
						>
							<Button
								variant={location.pathname === item.href ? "primary" : "ghost"}
								className={
									collapse
										? "grid place-content-center"
										: "flex items-center rounded-md font-medium w-full justify-start"
								}
								size={collapse ? "icon" : "default"}
							>
								<Icon className={`${!collapse && "mr-2"} h-4 w-4`} />
								{!collapse && <span>{item.title}</span>}
							</Button>
						</Link>
					)
				)
			})}
		</nav>
	)
}
