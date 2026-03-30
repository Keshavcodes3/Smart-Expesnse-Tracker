import express from 'express';
import { IdentifyUser } from '../Middleware/user.middleware';
import { addExpense, getDashboard, getSummery } from '../Controllers/expenses.controller';

const expenseRouter=express.Router()


expenseRouter.post('/add',IdentifyUser,addExpense)
expenseRouter.get('/getSummery',IdentifyUser,getSummery)
expenseRouter.get('/getDashboard',IdentifyUser,getDashboard)


export default expenseRouter