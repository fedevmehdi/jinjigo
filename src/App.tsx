import { Outlet } from "react-router-dom"
import ThemeProvider from "@/components/layout/theme-toggle/theme-provider"
import { QueryClient, QueryClientProvider } from "react-query"
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from "@react-oauth/google"

const queryClient = new QueryClient()

export default function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
			<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
				<QueryClientProvider client={queryClient}>
					<Outlet />
					<Toaster richColors={true} position="top-right" closeButton={true} />
				</QueryClientProvider>
			</ThemeProvider>
		</GoogleOAuthProvider>
	)
}
