import { Link, useLocation } from "react-router-dom"
import { NavItem } from "@/lib/types"
import { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"
import { Icons } from "../icons"

interface DashboardNavProps {
	items: NavItem[]
	setOpen?: Dispatch<SetStateAction<boolean>>
	collapse?: boolean
}

export function DashboardNav({ items, setOpen, collapse }: DashboardNavProps) {
	let location = useLocation()

	if (!items?.length) {
		return null
	}

	return (
		<nav className="grid items-start gap-1">
			{items.map((item, index) => {
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
