import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState("profile")
	return (
		<div className="container">
			<h3 className="mb-12">Settings</h3>

			<Tabs
				defaultValue="profile"
				className="md:grid md:grid-cols-[20%_1fr] gap-10"
				value={activeTab}
				onValueChange={setActiveTab}
			>
				<TabsList className="flex max-md:mb-12 md:flex-col gap-2">
					<TabsTrigger value="profile" asChild>
						<Button
							variant={activeTab === "profile" ? "primary" : "ghost"}
							className="justify-start"
						>
							Profile
						</Button>
					</TabsTrigger>
					<TabsTrigger value="preferences" asChild>
						<Button
							variant={activeTab === "preferences" ? "primary" : "ghost"}
							className="justify-start"
						>
							Preferences
						</Button>
					</TabsTrigger>
					<TabsTrigger value="security" asChild>
						<Button
							variant={activeTab === "security" ? "primary" : "ghost"}
							className="justify-start"
						>
							Security
						</Button>
					</TabsTrigger>
				</TabsList>
				<div className="md:max-w-[80%] lg:max-w-[50%]">
					<TabsContent value="profile">
						<h4 className="font-medium mb-4">Profile</h4>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="full_name">Full Name</Label>
								<Input
									placeholder="Your Full Name"
									value="Muhammad Mehdi"
									type="text"
									maxLength={200}
									id="full_name"
									aria-label="Full Name"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									placeholder="Email"
									value="edoitachime@gmail.com"
									type="email"
									id="email"
									aria-label="Email"
									disabled
									required
								/>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="preferences">
						<h4 className="font-medium mb-4">Preferences</h4>
						<div className="space-y-4">
							<div className="flex flex-col gap-2">
								<Label htmlFor="full_name">Job Role</Label>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" className="justify-start">
											<div className="flex w-full justify-between items-center">
												<p>Developer</p>
												<ChevronDown />
											</div>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										className=" lg:min-w-[20rem]"
										align="start"
									>
										<DropdownMenuItem>Developer</DropdownMenuItem>
										<DropdownMenuItem>IT Support</DropdownMenuItem>
										<DropdownMenuItem>Designer</DropdownMenuItem>
										<DropdownMenuItem>HR</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="security">
						<h4 className="font-medium mb-4">Security</h4>
						<div className="space-y-4">
							<div className="flex flex-col gap-3">
								<Label htmlFor="password">Change Password</Label>
								<div className="space-y-2">
									<Input
										placeholder="New Password"
										type="password"
										id="password"
										aria-label="New password"
										required
									/>
									<Input
										placeholder="Confirm Password"
										type="password"
										id="password"
										aria-label="Confirm new password"
										required
									/>
								</div>
							</div>
						</div>
					</TabsContent>

					<div className="flex mt-8 gap-2">
						<Button disabled>Save</Button>
						<Button variant="outline">Reset</Button>
					</div>
				</div>
			</Tabs>
		</div>
	)
}
