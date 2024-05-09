import { configureStore, combineReducers } from '@reduxjs/toolkit'
import UserSlice from '../UserSlice/UserSlice'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import JobSlice from '../JobSlice/JobSlice'
import StudentSlice from '../StudentSlice/StudentSlice'
import ApplicationSlice from '../ApplicationSlice/ApplicationSlice'
import { jobApplicationSchema } from '@/schema'
import JobApplicationSlice from '../JobApplicationSlice/JobApplicationSlice'


//set presist configuration
const persistConfig = {
	key: 'root',
	version: 1,
	storage: storage,
	
}

//combine all reducer
const rootReducer: any = combineReducers({
	user: UserSlice,
    job:JobSlice,
	student:StudentSlice,
	application:ApplicationSlice,
	jobApplication:JobApplicationSlice,
})

//set presistorReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

//export store
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

//export presistor
export const persistor = persistStore(store)
