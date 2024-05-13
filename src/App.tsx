import { Outlet } from "react-router-dom"
import ThemeProvider from "./components/layout/theme-toggle/theme-provider"
import { GoogleOAuthProvider } from "@react-oauth/google"

export default function App() {
	return (
		<GoogleOAuthProvider clientId="591534715807-jc2g9mq5vnhgnnvtpnnpnu7bgb24dljr.apps.googleusercontent.com">
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<Outlet />
			</ThemeProvider>
		</GoogleOAuthProvider>
	)
}
