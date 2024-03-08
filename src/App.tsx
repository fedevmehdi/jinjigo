import { Outlet } from "react-router-dom"
import ThemeProvider from "./components/layout/theme-toggle/theme-provider"

export default function App() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Outlet />
		</ThemeProvider>
	)
}
