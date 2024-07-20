import { DashboardNav } from "@/components/layout/dashboard-nav"
import { navItems } from "@/database"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

import { useState } from "react"
import { Button } from "../ui/button"
import Logo from "./logo"
import UserDropdown from "./user-dropdown"

export default function Sidebar() {
	const [collapse, setCollapse] = useState(false)
	const MotionButton = motion(Button)

	const variants = {
		collapse: { width: "60px" },
		extend: { width: "280px" },
	}

	return (
		<motion.nav
			className={`group relative hidden h-screen lg:flex flex-col justify-between flex-shrink-0 bg-primary/5 dark:bg-inherit border z-[20]`}
			variants={variants}
			animate={collapse ? "collapse" : "extend"}
			initial={collapse ? "collapse" : "extend"}
			transition={{ type: "tween" }}
		>
			<motion.div
				className="flex w-60 h-60 justify-center items-center"
				initial={{
					opacity: 0,
					position: "absolute",
					right: "-120px",
					top: "-2%",
				}}
				whileHover={{ opacity: 1, right: "-150px" }}
				transition={{ type: "spring" }}
			>
				<MotionButton
					variant="outline"
					size="icon"
					className="w-6 h-6"
					onClick={() => setCollapse(!collapse)}
					whileHover={{ scale: 1.2 }}
					transition={{ type: "spring" }}
				>
					{collapse ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</MotionButton>
			</motion.div>

			<div className="px-2 space-y-2 mt-10">
				<div className="mx-3 mb-14">
					<Logo collapse={collapse} />
				</div>
				<DashboardNav items={navItems} collapse={collapse} />
			</div>
			<UserDropdown collapse={collapse} />
		</motion.nav>
	)
}
