import {combineReducers} from "redux";
import {authSlice} from "@/services/state/auth/authSlice.ts";


const rootReducers = combineReducers({
    auth: authSlice.reducer,
})

export default rootReducers;
