import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import App from "./App"

// Pages
import AuthLayout from "./pages/auth/layout"
import SignupPage from "./pages/auth/signup"
import LoginPage from "./pages/auth/login"
import DashboardLayout from "./pages/dashboard/layout"
import OverviewPage from "./pages/dashboard/overview"
import CreateInterviewPage from "./pages/dashboard/interview/create"
import InterviewTemplatePage from "./pages/dashboard/interview/template"
import ErrorPage from "./pages/dashboard/error"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "signup",
				element: <AuthLayout />,
				children: [{ index: true, element: <SignupPage /> }],
			},
			{
				path: "login",
				element: <AuthLayout />,
				children: [{ index: true, element: <LoginPage /> }],
			},
			{
				path: "dashboard",
				element: <DashboardLayout />,
				children: [
					{ path: "", element: <OverviewPage /> },
					{ path: "new-interview", element: <CreateInterviewPage /> },
					{ path: "interview-template", element: <InterviewTemplatePage /> },
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
