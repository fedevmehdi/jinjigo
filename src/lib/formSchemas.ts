import { z } from "zod"
import { checkForDuplicateEmail } from "./utils"

export const signupFormSchema = z.object({
	fullName: z.string().max(50),
	username: z.string().max(20),
	email: z
		.string()
		.email({ message: "Invalid email format" }) // Basic format validation
		.max(100, "Email must be under 100 characters")
		.refine(async email => {
			// Duplication check
			const isDuplicate = await checkForDuplicateEmail(email)
			if (isDuplicate) {
				throw new Error("Email address already in use")
			}
			return true // Passes all validations
		}),
	password: z
		.string()
		.min(8)
		.max(32)
		.refine(
			password => {
				// 1. At least two of: uppercase, lowercase, number, symbol
				const hasTwoTypes =
					[
						/[A-Z]/, // Uppercase
						/[a-z]/, // Lowercase
						/[0-9]/, // Number
						/[^\w\s]/, // Special character (non-word, non-whitespace)
					].filter(regex => regex.test(password)).length >= 2

				// 2. Not a common weak password
				const commonWeakPasswords = ["password", "12345678" /* Add more here */]
				const isCommonPassword = commonWeakPasswords.includes(
					password.toLowerCase()
				)

				return hasTwoTypes && !isCommonPassword
			},
			{
				message:
					"Password must contain at least 2 of: uppercase, lowercase, number, symbol and not be a common password",
			}
		),
})

export const loginFormSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email format" }) // Basic format validation
		.max(100, "Email must be under 100 characters"),
	password: z.string(),
})

export const createInterviewTemplateSchema = z.object({
	templateName: z.string(),
	message: z.string(),
	interviewType: z.string(),
	interviewDuration: z.number(),
	candidateEmailTemplate: z.string(),
	interviewerEmailTemplate: z.string(),
	feedbackDeadline: z.number(),
	escalationEmail: z.string().email(),
	escalationDeadline: z.number(),
})

export const createInterviewCandidateSchema = z.object({})

export const createInterviewSchema = z.object({
	candidateEmail: z.string().email(),
	candidateName: z.string(),
	candidateCurrentEmployer: z.string(),
	candidateInformationUrl: z.string().url().optional(),
	candidatePosition: z.string(),
	interviewType: z.string(),
	interviewDuration: z.coerce.number(),
	interviewers: z.array(
		z.object({
			email: z.string().email(),
		})
	),
	candidateEmailTemplateId: z.string(),
	interviewerEmailTemplateId: z.string(),
	feedbackDeadline: z.coerce.number(),
	escalationEmail: z.string().email().optional(),
	escalationDeadline: z.coerce.number().optional(),
	feedbackNotificationFrequency: z.string().optional(),
	interviewSchedulingMethod: z.enum(["flexible", "fixed"]),
	interviewStartTime: z.date().optional(),
	interviewPosition: z.string(),
	initialDateRange: z
		.object({
			from: z.date(),
			to: z.date(),
		})
		.optional(),
	resume: z.array(z.string()).optional(),
	orderOfSchedule: z.array(z.string()).optional(),
	notes: z.string().optional(),
})

export const createEmailTemplateSchema = z.object({
	templateName: z.string(),
	title: z.string(),
	content: z.string(),
})
