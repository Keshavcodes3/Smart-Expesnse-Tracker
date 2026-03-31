import { useDispatch } from "react-redux";
import { createBudget,getBudgets } from "../Service/budget.service";
import {setTransaction,setLoading, setError} from '../Slices/budget.slice'


export const useBudget=()=>{
    const dispatch=useDispatch()
    const handleCreateBudget=async(budgetData)=>{
        try{
            dispatch(setLoading(true))
            const data=await createBudget(budgetData)
            if(data.success){
                dispatch(setTransaction(budgetData))
            }
            return data
        }catch(err){
            dispatch(setError(err?.message || "Something went wrong"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    const handleGetBudget=async()=>{
        try{
            dispatch(setLoading(true))
            const data=await getBudgets()
            if(data.success){
                dispatch(setTransaction(data.budget))
            }
            return data
        }catch(err){
            dispatch(setError(err?.message || "Something went wrong"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    return {handleCreateBudget,handleGetBudget}
}