import { Outlet } from "react-router-dom"

export default function AuthLayout() {
	return (
		<div className="my-8">
			<Outlet />
		</div>
	)
}
