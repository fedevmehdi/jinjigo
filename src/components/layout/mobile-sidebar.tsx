"use client"
import { DashboardNav } from "@/components/layout/dashboard-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navItems } from "@/database"
import { MenuIcon } from "lucide-react"
import { useState } from "react"

// import { Playlist } from "../data/playlists";

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
// 	// playlists: Playlist[];
// }

export function MobileSidebar() {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<MenuIcon className="text-black" />
			</SheetTrigger>
			<SheetContent side="left" className="!px-0">
				<div className="px-3 py-4 space-y-4">
					<h2 className="mb-8 px-4 text-2xl font-semibold tracking-tight text-secondary-foreground">
						IntaBook
					</h2>
					<div className="space-y-1">
						<DashboardNav items={navItems} setOpen={setOpen} />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
