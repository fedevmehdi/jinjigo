import { DashboardNav } from "@/components/layout/dashboard-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navItems } from "@/database"
import { MenuIcon } from "lucide-react"
import { useState } from "react"
import Logo from "./logo"
import UserDropdown from "./user-dropdown"

export function MobileSidebar() {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<MenuIcon className="text-secondary-foreground" />
			</SheetTrigger>
			<SheetContent side="left" className="!px-0 flex flex-col justify-between">
				<div className="px-3 py-4 space-y-4">
					<Logo />
					<div className="space-y-1">
						<DashboardNav items={navItems} setOpen={setOpen} />
					</div>
				</div>
				<UserDropdown />
			</SheetContent>
		</Sheet>
	)
}
