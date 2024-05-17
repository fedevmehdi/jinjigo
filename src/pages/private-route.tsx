import { User } from "@/lib/types"
import { RootState } from "@/services/state/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
	const user: User = useSelector((state: RootState) => state.auth.userInfo!)
	return user ? <Outlet /> : <Navigate to={"/login"} replace />
}

export default PrivateRoute
