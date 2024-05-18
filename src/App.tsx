import { Outlet } from "react-router-dom"
import ThemeProvider from "@/components/layout/theme-toggle/theme-provider"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient()
export default function App() {
	return (
		<GoogleOAuthProvider clientId="591534715807-jc2g9mq5vnhgnnvtpnnpnu7bgb24dljr.apps.googleusercontent.com">
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<QueryClientProvider client={queryClient}>
					<Outlet />
					<Toaster richColors position="top-right" />
				</QueryClientProvider>
			</ThemeProvider>
		</GoogleOAuthProvider>
	)
}
