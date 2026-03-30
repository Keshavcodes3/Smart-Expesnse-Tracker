import express from 'express'
import cookie from 'cookie-parser'

const App=express()
App.use(express.json())
App.use(cookie())



import userRoute from './Routes/user.routes';
import expenseRouter from './Routes/expense.routes'


App.use('/api/v1/user',userRoute)
App.use('/api/v1/expense',expenseRouter)



export default App;
