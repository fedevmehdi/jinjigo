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

export type AvailableTimeRange = {
	groupId: string
	start: string
	end: string
	display: string
}

export type CalendarEvent = {
	id: string | number
	title: string
	start: string
	end: string
	constraint?: string
	editable?: boolean
}
