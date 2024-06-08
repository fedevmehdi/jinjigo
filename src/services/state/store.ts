import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"
import rootReducers from "@/services/state/state.reducer.ts"
import createSagaMiddleware from "@redux-saga/core"

const persistConfig = {
	key: "root",
	storage: storage,
	debug: true,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(sagaMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
