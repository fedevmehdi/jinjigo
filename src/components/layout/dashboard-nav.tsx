import { Link, useLocation } from "react-router-dom"
import { Icons } from "../icons"
import { NavItem } from "@/lib/types"
import { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"

interface DashboardNavProps {
	items: NavItem[]
	setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
	let location = useLocation()

	if (!items?.length) {
		return null
	}

	return (
		<nav className="grid items-start gap-2">
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
								variant={location.pathname === item.href ? "default" : "ghost"}
								className="flex items-center rounded-md px-8 py-2 font-medium w-full justify-start"
								size="lg"
							>
								<Icon className="mr-2 h-4 w-4" />
								<span>{item.title}</span>
							</Button>
						</Link>
					)
				)
			})}
		</nav>
	)
}
