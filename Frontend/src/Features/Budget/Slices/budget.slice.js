import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
    name: "budget",
    initialState: {
        transactions: [],
        balance:{},
        loading: false,
        error: null,
    },
    reducers: {
        setTransaction: (state, action) => {
            state.transactions.unshift(action.payload)
        },
        clearTransaction:(state)=>{
            state.transactions=[]
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {setTransaction,clearTransaction,setLoading,setError}=budgetSlice.actions

export default budgetSlice.reducer