import { Icons } from "@/components/icons"
import { createInterviewSchema } from "./formSchemas"
import { z } from "zod"

export interface NavItem {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
	label?: string
	description?: string
	role: "HR" | "CANDIDATE" | "INTERVIEWER" | "EVERYONE"
}

export interface InterviewType {
	name: string
	value: string
}

export type User = {
	accessToken: string
	email: string
	_id: string
	username: string
	role: string
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

export type TimeRanges = { to: Date; from: Date }[] | null

type CreateInterviewSchema = z.infer<typeof createInterviewSchema>
export type CreateInterview = Omit<CreateInterviewSchema, "interviewers"> & {
	interviewers: string[]
}
