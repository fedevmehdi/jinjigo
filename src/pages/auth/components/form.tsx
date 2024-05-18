import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function AuthForm({ form, onSubmit, state, loading }: any) {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 last:pt-20"
			>
				{state === "signup" && (
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="user3890"
										size={20}
										disabled={loading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
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
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="gap-0">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} disabled={loading} />
							</FormControl>
							<div className="h-8">
								<FormMessage className="text-xs" />
							</div>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-full !mt-4"
					size="lg"
					loading={loading}
				>
					{!loading ? (state === "signup" ? "Signup" : "Login") : "Loading..."}
				</Button>
			</form>
		</Form>
	)
}
