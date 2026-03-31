import mongoose from "mongoose";


const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    limit:{
        type:Number,
        required:true,
    },
    month:{
        type:Number,
        required:true,
        default:()=>new Date().getMonth()
    },
    year:{
        type:Number,
        required:true,
        default:()=>new Date().getFullYear()
    }
},{timestamps:true})


budgetSchema.index({userId:1,category:1,month:1,year:1},{unique:true})



const budgetModel=mongoose.model('budgets',budgetSchema)

export default budgetModel