import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/auth/layout";
import SignupPage from "./pages/auth/signup";
import LoginPage from "./pages/auth/login";
import DashboardLayout from "./pages/dashboard/layout";
import OverviewPage from "./pages/dashboard/overview";
import CreateInterviewPage from "./pages/dashboard/interview/create";
import InterviewTemplatePage from "./pages/dashboard/interview/template";
import CreateInterviewTemplatePage from "./pages/dashboard/interview/template/create";
import InterviewPage from "./pages/dashboard/interview";
import EmailTemplatePage from "./pages/dashboard/email/template";
import CreateEmailTemplatePage from "./pages/dashboard/email/create";
import App from "./App";
import ScheduleInterviewPage from "./pages/dashboard/interview/schedule";
import Error404 from "./pages/error/not-found";
import ErrorPage from "./pages/error/error";
import SettingsPage from "./pages/settings";
import PrivateRoute from "./pages/private-route";
import ProtectedRoute, { ProtectedRouteProps } from "@/guards/authGuard.tsx";

const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
	isAuthenticated: localStorage.getItem('token') ? true : false,
	authenticationPath: '/login',
};

export const router = createBrowserRouter([
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
				path: "/google/callback",
				element: <LoginPage />,
			},
			{
				path: "/",
				element: <ProtectedRoute {...defaultProtectedRouteProps} outlet={<PrivateRoute />} />,
				children: [
					{
						element: <DashboardLayout />,
						children: [
							{ path: "/", element: <OverviewPage /> },
							{ path: "interviews", element: <InterviewPage /> },
							{ path: "new-interview", element: <CreateInterviewPage /> },
							{ path: "interview-templates", element: <InterviewTemplatePage /> },
							{ path: "new-interview-template", element: <CreateInterviewTemplatePage /> },
							{ path: "email-templates", element: <EmailTemplatePage /> },
							{ path: "new-email-template", element: <CreateEmailTemplatePage /> },
							{ path: "interview-schedule", element: <ScheduleInterviewPage /> },
							{ path: "settings", element: <SettingsPage /> },
						],
					},
				],
			},
			{
				path: "*",
				element: <Error404 />,
			},
		],
	},
]);
