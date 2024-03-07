import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { UsersDB } from "@/database.ts"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const checkForDuplicateEmail = async (email: string) => {
	const existingUser = UsersDB.find(user => user.email === email)
	return !!existingUser
}
