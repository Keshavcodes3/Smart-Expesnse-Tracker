import express from 'express'
import cookie from 'cookie-parser'
import cors from 'cors'
const App=express()
App.use(express.json())
App.use(cookie())
App.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


import userRoute from './Routes/user.routes';
import expenseRouter from './Routes/expense.routes'


App.use('/api/v1/user',userRoute)
App.use('/api/v1/expense',expenseRouter)



export default App;
