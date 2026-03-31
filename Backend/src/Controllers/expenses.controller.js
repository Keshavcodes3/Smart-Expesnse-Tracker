import budgetModel from "../Models/budgetSchema";
import expenseModel from "../Models/expenses.model";
import userModel from "../Models/user.model";
import mongoose from 'mongoose'
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
            userId: new mongoose.Types.ObjectId(req.user.id),
            amount: amounts,
            category,
            note,
            type
        });
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
            budget: {
                totalAmount: totalMoney,
                totalExpense: totalExpense,
                totalIncome: totalIncome
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        })
    }
}



export const getDashboard = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);

        const allExpenses = await expenseModel.find({ userId });
        const Summery = await userModel.findById(userId).select('+totalMoney +totalIncome +totalExpense')
        const total = Summery.totalMoney

        let totalIncome = Summery.totalIncome;
        let totalExpense = Summery.totalExpense;

        const balance = totalIncome - totalExpense;

        const recent = await expenseModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);

        //  category breakdown
        const categoryData = await expenseModel.aggregate([
            {
                $match: {
                    userId: userId,
                    type: 'expense'
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' }
                }
            },
            {
                $sort: { total: -1 }
            }
        ]);
        const categoryBreakdown = {};
        categoryData.forEach(item => {
            categoryBreakdown[item._id] = item.total;
        });

        return res.status(200).json({
            success: true,
            balance,
            totalIncome,
            totalExpense,
            recentExpenses: recent,
            categoryBreakdown,
            categoryData
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
};


export const addBudget = async (req, res) => {
    try {
        const userId = req.user.id;
        const { category, limit, month, year } = req.body
        const currentMonth = month || new Date().getMonth() + 1
        const currentYear = year || new Date().getFullYear()
        if (!category || !limit) {
            return res.status(400).json({
                message: "Category and limit are required",
                success: false,
                error: "Category and limit are required"
            })
        }
        const budget = await budgetModel.findOneAndUpdate({
            userId,
            category,
            month: currentMonth,
            year: currentYear
        }, { $set: { limit } }, { new: true, upsert: true })
        return res.status(200).json({
            message: "Budget set successfullt",
            budget,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message,
            success: false
        });
    }
}


export const getBudget = async (req, res) => {
    try {
        const userId = (req.user.id)
        const month = new Date().getMonth() + 1
        const year = new Date().getFullYear()

        const budget = await budgetModel.find({ userId, month, year })
        if (budget.length < 1) {
            return res.status(400).json({
                message: "No budget found",
                success: false,
                error: "No budget setted"
            })
        }
        const categoryData = await expenseModel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    type: 'expense'
                }
            }, {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            }, {
                $sort: {
                    total: -1
                }
            }
        ])
        const budgetBreakdown = new Map();

        budget.forEach(item => {
            budgetBreakdown.set(item.category, item.limit);
        });

        const categoryBreakdown = new Map();

        categoryData.forEach(item => {
            categoryBreakdown.set(item._id, item.total);
        });

        const totalBudgetVSExpenses = new Map();
        const calculateStatus = ({ percentage }) => {
            let Statuss;
            if (percentage > 100) {
                Statuss = 'exceeded'
            } else if (percentage > 90) {
                Statuss = "warning"
            } else {
                Statuss = 'safe'
            }
            return Statuss
        }
        budgetBreakdown.forEach((limit, category) => {
            totalBudgetVSExpenses.set(category, {
                budget: limit,
                spent: categoryBreakdown.get(category) || 0,
                percentage: categoryBreakdown.get(category) ? ((categoryBreakdown.get(category) / limit) * 100).toFixed(2) : 0,
                remaining: limit - (categoryBreakdown.get(category) || 0),
                status: calculateStatus(categoryBreakdown.get(category) ? ((categoryBreakdown.get(category) / limit) * 100).toFixed(2) : 0)
            });
        });


        return res.status(200).json({
            message: "Budget fetched successfully",
            totalBudgetVSExpenses: Object.fromEntries(totalBudgetVSExpenses), // important!
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}