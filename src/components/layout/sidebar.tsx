import { DashboardNav } from "@/components/layout/dashboard-nav"
import { navItems } from "@/database"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useState } from "react"
import { Button } from "../ui/button"
import Logo from "./logo"
import UserDropdown from "./user-dropdown"

export default function Sidebar() {
	const [collapse, setCollapse] = useState(false)
	return (
		<nav
			className={`group relative hidden h-screen lg:flex flex-col justify-between flex-shrink-0 ${
				collapse ? "w-[60px]" : "w-[280px]"
			} bg-primary/5 dark:bg-inherit border z-[20] transition-all duration-300`}
		>
			<div className="hidden group-hover:flex absolute top-[10%] -right-[65px] w-20 h-20 justify-center items-center">
				<Button
					variant="outline"
					size="icon"
					className="w-7 h-7"
					onClick={() => setCollapse(!collapse)}
				>
					{collapse ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</Button>
			</div>

			<div className="px-2 space-y-2 mt-10">
				<div className="mx-3 mb-14">
					<Logo collapse={collapse} />
				</div>
				<DashboardNav items={navItems} collapse={collapse} />
			</div>
			<UserDropdown collapse={collapse} />
		</nav>
	)
}
