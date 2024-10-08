import { cn } from "@/lib/utils"
import { MobileSidebar } from "./mobile-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Bell, Search } from "lucide-react"
import ThemeToggle from "./theme-toggle/theme-toggle"

export default function Header() {
	return (
		<div className="max-lg:shadow-sm relative max-lg:fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 px-6 lg:mt-10 bg-white dark:bg-inherit max-lg:border lg:bg-transparent z-[10] ">
			<nav className="h-14 flex items-center justify-between lg:justify-end px-4">
				<div className={cn("block lg:!hidden")}>
					<MobileSidebar />
				</div>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button size="icon" variant="ghost">
						<Search />
					</Button>
					<Button size="icon" variant="ghost">
						<Bell />
					</Button>
					<Avatar className="ms-4 w-8 h-8 lg:w-12 lg:h-12">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</nav>
		</div>
	)
}
