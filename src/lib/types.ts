import { Icons } from "@/components/icons"

export interface User {
	id: number
	name: string
	email: string
	role: "HR" | "Candidate" | "Interviewer"
	password?: string
}

export interface NavItem {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
	label?: string
	description?: string
}
