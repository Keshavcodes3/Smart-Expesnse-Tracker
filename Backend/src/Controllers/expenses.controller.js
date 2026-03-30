import expenseModel from "../Models/expenses.model";
import userModel from "../Models/user.model";

export const addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(401).json({
                message: "No user found",
                error: "Unauthorized or no user",
                success: false
            })
        }
        const { amount, type, category, note } = req.body
        if (!amount || !category || !type) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        const amounts = Number(amount)
        if (isNaN(amounts) || amounts <= 0) {
            return res.status(400).json({
                message: "Amount can't be empty or negative"
            })
        }
        const expense = await expenseModel.create({
            userId: req.user.id,
            amount: amounts,
            category,
            note,
            type
        })
        const userExpense = await userModel.findById(userId).select('+totalMoney +totalIncome +totalExpense')
        if (type === 'income') {
            userExpense.totalIncome += amounts
            userExpense.totalMoney += amounts
        }
        else {
            userExpense.totalMoney -= amounts
            userExpense.totalExpense += amounts
        }
        await userExpense.save()
        return res.status(201).json({
            message: `${type} created successfully `,
            expense,
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}


export const getSummery = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json({
                error: "No user found",
                message: "unauthorized or no user found",
                success: false
            })
        }
        const userSummery = await userModel.findById(userId).select('+totalMoney +totalIncome +totalExpense')
        const totalMoney = userSummery.totalMoney
        const totalExpense = userSummery.totalExpense;
        const totalIncome = userSummery.totalIncome
        return res.status(200).json({
            message: "User summery found successfully",
            success: true,
            totalAmount: totalMoney,
            totalExpense: totalExpense,
            totalIncome: totalIncome
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}