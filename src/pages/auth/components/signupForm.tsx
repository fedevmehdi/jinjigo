import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

export default function SignupForm({ form, onSubmit, loading }: any) {
	const { control, handleSubmit, watch } = useForm()
	const password = watch("password")

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-2 last:pt-20">
				<FormField
					control={control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Richard James"
									size={100}
									disabled={loading}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="richard2830"
									size={20}
									disabled={loading}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="example@email.com"
									size={40}
									disabled={loading}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="password"
					render={({ field }) => (
						<FormItem className="gap-0">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Password"
									type="password"
									disabled={loading}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="confirmPassword"
					rules={{
						validate: value => value === password || "Passwords do not match",
					}}
					render={({ field, fieldState: { error } }) => (
						<FormItem className="gap-0">
							<FormControl>
								<Input
									placeholder="Confirm Password"
									type="password"
									disabled={loading}
									{...field}
								/>
							</FormControl>
							{error && (
								<div className="text-red-500 text-xs">{error.message}</div>
							)}
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full !mt-4"
					size="lg"
					loading={loading}
				>
					{loading ? "Signing Up..." : "Signup"}
				</Button>
			</form>
		</Form>
	)
}
