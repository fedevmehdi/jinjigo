import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "@/services/state/store.ts"

export type ProtectedRouteProps = {
	authenticationPath: string
	outlet: JSX.Element
}

export default function ProtectedRoute({
	authenticationPath,
	outlet,
}: ProtectedRouteProps) {
	const userInfo = useSelector((state: RootState) => state.auth.userInfo)

	if (userInfo) {
		return outlet
	} else {
		return <Navigate to={{ pathname: authenticationPath }} replace />
	}
}
