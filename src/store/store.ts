import {configureStore} from '@reduxjs/toolkit'
import billionairesReducer from '@/store/slices/oligarch'

export const store = configureStore({
    reducer: {
        billionaires: billionairesReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch