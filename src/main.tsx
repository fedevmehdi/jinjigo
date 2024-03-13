import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import App from "./App"

// Views
import SignupView from "./views/auth/signup"
import LoginView from "./views/auth/login"
import ErrorView from "./views/error"
import DashboardView from "./views/dashboard/layout"
import HomeView from "./views/dashboard/home"
import AuthLayout from "./views/auth/layout"
import CreateInterviewView from "./views/dashboard/interview/create"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorView />,
		children: [
			{
				path: "signup",
				element: <AuthLayout />,
				children: [{ index: true, element: <SignupView /> }],
			},
			{
				path: "login",
				element: <AuthLayout />,
				children: [{ index: true, element: <LoginView /> }],
			},
			{
				path: "dashboard",
				element: <DashboardView />,
				children: [
					{ path: "", element: <HomeView /> },
					{ path: "new-interview", element: <CreateInterviewView /> },
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
