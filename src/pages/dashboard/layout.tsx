import Logo from "@/components/layout/logo"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import Sidebar from "@/components/layout/sidebar"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
	//? Fixes improper scrolling issue on dashboard routes
	useEffect(() => {
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = ""
		}
	}, [])
	return (
		<div className="!overflow-hidden">
			<div className="flex h-cscreen lg:overflow-hidden">
				<Sidebar />
				<main className="container w-[100vw] overflow-auto">
					<div className="flex items-center justify-between py-4 lg:hidden">
						<Logo />
						<MobileSidebar />
					</div>
					<div className="p-0 lg:p-4 lg:mt-4">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}
