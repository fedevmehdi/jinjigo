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
		href: "/dashboard",
		icon: "home",
		label: "home",
	},
	{
		title: "Interview",
		href: "/dashboard/interviews",
		icon: "presentation",
		label: "presentation",
	},
	{
		title: "Interview Template",
		href: "/dashboard/interview-templates",
		icon: "bookDashed",
		label: "bookDashed",
	},
	{
		title: "Feedbacks",
		href: "/feedback",
		icon: "notebookPen",
		label: "notebook pen",
	},
	{
		title: "Messages",
		href: "/messages",
		icon: "messageCircleMore",
		label: "message circle more",
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
