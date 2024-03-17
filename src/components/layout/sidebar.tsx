import { DashboardNav } from "@/components/layout/dashboard-nav"
import { navItems } from "@/database"

export default function Sidebar() {
	return (
		<nav className="relative hidden h-screen lg:block w-80 shadow-sm bg-white dark:bg-inherit dark:border z-[20]">
			<div className="px-4 space-y-10 mt-10">
				<h2 className="mb-2 px-4 text-2xl font-semibold tracking-tight text-secondary-foreground">
					IntaBook
				</h2>
				<DashboardNav items={navItems} />
			</div>
		</nav>
	)
}
