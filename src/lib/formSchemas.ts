import { z } from "zod"
import { checkForDuplicateEmail } from "./utils"

export const authFormSchema = z.object({
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

export const createInterviewTemplateSchema = z.object({
	templateName: z.string(),
	message: z.string(),
})

export const createInterviewCandidateSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	position: z.string(),
	currentEmployer: z.string(),
	candidateInformationUrl: z.string().url(),
})

export const createInterviewInterviewSchema = z.object({
	interviewType: z.string(),
	position: z.string(),
	interviewDuration: z.number(),
	interviewer1: z.string().email(),
	interviewer2: z.string().email(),
})
