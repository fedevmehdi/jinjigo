import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import App from "./App"
import ErrorView from "./views/error/ErrorView"
import SignupView from "./views/auth/SignupView"
import LoginView from "./views/auth/LoginView"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorView />,
		children: [
			{
				path: "signup",
				element: <SignupView />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
