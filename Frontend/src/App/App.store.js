import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/Slices/auth.slice"
import budgetReducer from '../Features/Budget/Slices/budget.slice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        budget:budgetReducer
    }
})