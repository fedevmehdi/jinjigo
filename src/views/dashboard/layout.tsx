import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
	return (
		<>
			<div className="flex h-screen lg:overflow-hidden">
				<Header />
				<Sidebar />
				<main className="w-full max-lg:pb-16 mt-16 lg:mt-10">
					<div className="px-4 lg:px-6 h-[90vh]">
						<Outlet />
					</div>
				</main>
			</div>
		</>
	)
}
