import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { UsersDB } from "@/database.ts"

import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/services/firebase"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const checkForDuplicateEmail = async (email: string) => {
	const existingUser = UsersDB.find(user => user.email === email)
	return !!existingUser
}

export const uploadFile = async (file: File) => {
	if (!file) return

	// Create a storage reference
	const storageRef = ref(storage, `resumes/${file.name}`)

	// Upload the file
	await uploadBytes(storageRef, file)

	// Get the file's URL
	const url = await getDownloadURL(storageRef)

	return url
}
