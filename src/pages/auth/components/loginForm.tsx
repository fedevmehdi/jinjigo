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

export default function LoginForm({ form, onSubmit, loading }: any) {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-2 last:pt-20"
			>
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
								<Input
									placeholder="Password"
									type="password"
									disabled={loading}
									{...field}
								/>
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
					{loading ? "Logging In" : "Login"}
				</Button>
			</form>
		</Form>
	)
}
