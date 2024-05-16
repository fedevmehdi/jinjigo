import { Icons } from "@/components/icons"

export interface NavItem {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
	label?: string
	description?: string
}

export interface InterviewType {
	name: string
	value: string
}

export type User = {
	token: string
	email: string
	_id: string
	username: string
}
