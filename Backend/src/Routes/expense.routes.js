import express from 'express';
import { IdentifyUser } from '../Middleware/user.middleware';
import { addExpense, getSummery } from '../Controllers/expenses.controller';

const expenseRouter=express.Router()


expenseRouter.post('/add',IdentifyUser,addExpense)
expenseRouter.get('/getSummery',IdentifyUser,getSummery)

export default expenseRouter