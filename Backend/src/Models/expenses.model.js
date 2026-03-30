import mongoose from "mongoose";

const expensesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount can't be negative"]
    },

    type: {
        type: String,
        enum: ['expense', 'income'],
        required: true
    },

    category: {
        type: String,
        required: true,
        enum: [
            "food",
            "travel",
            "shopping",
            "bills",
            "health",
            "salary",
            "other"
        ]
    },

    note: {
        type: String,
        default: "",
    },

    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const expenseModel = mongoose.model('Expense', expensesSchema);

export default expenseModel;