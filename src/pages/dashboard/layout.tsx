import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Outlet } from "react-router-dom"

export default function DashboardLayout() {
	return (
		<>
			<div className="flex h-screen lg:overflow-hidden">
				<Sidebar />
				<main className="w-[100vw] max-lg:pb-16 overflow-auto ">
					<Header />
					<div className="px-4 lg:px-6 max-lg:mt-20 lg:relative top-[-50px]">
						<Outlet />
					</div>
				</main>
			</div>
		</>
	)
}
