import express from 'express';
import { IdentifyUser } from '../Middleware/user.middleware';
import { addBudget, addExpense, getBudget, getDashboard, getSummery } from '../Controllers/expenses.controller';

const expenseRouter=express.Router()


expenseRouter.post('/add',IdentifyUser,addExpense)
expenseRouter.get('/getSummery',IdentifyUser,getSummery)
expenseRouter.get('/getDashboard',IdentifyUser,getDashboard)
expenseRouter.post('/addBudget',IdentifyUser,addBudget)
expenseRouter.get('/getBudget',IdentifyUser,getBudget)

export default expenseRouter