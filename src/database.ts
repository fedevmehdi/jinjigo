import { InterviewType, NavItem } from "./lib/types"

export const UsersDB = [
	{
		id: 1,
		name: "Alice Johnson",
		email: "alice.johnson@hrdept.com",
		role: "HR",
		password: "hrpassword123",
	},
	{
		id: 2,
		name: "Bob Smith",
		email: "bob.smith@email.com",
		role: "Candidate",
		password: "candidatetest",
	},
	{
		id: 3,
		name: "Sarah Lee",
		email: "sarah.lee@interviewly.com",
		role: "Interviewer",
		password: "interviewerpass",
	},
]

export const navItems: NavItem[] = [
	{
		title: "Home",
		href: "/",
		icon: "home",
		label: "home",
		role: "EVERYONE",
	},
	{
		title: "Interview",
		href: "/interviews",
		icon: "presentation",
		label: "presentation",
		role: "EVERYONE",
	},
	{
		title: "Interview Template",
		href: "/interview-templates",
		icon: "bookDashed",
		label: "bookDashed",
		role: "HR",
	},
	{
		title: "Email Template",
		href: "/email-templates",
		icon: "inbox",
		label: "inbox",
		role: "HR",
	},
	{
		title: "Feedbacks",
		href: "/feedback",
		icon: "notebookPen",
		label: "notebook pen",
		role: "INTERVIEWER",
	},
	{
		title: "Messages",
		href: "/messages",
		icon: "messageCircleMore",
		label: "message circle more",
		role: "EVERYONE",
	},
]

export const interviewTypes: InterviewType[] = [
	{
		name: "Panel Interview",
		value: "panel",
	},
	{
		name: "Group Interview",
		value: "group",
	},
	{
		name: "Behavior Interview",
		value: "behavior",
	},
	{
		name: "Informal Interview",
		value: "informal",
	},
	{
		name: "Formal Interview",
		value: "formal",
	},
	{
		name: "Case Interview",
		value: "case",
	},
]

export const frequency: string[] = [
	"hourly",
	"6 hours",
	"daily",
	"2 days",
	"3 days",
]
