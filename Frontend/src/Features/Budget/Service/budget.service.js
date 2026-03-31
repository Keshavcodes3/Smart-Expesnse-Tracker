import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/expense",
    withCredentials: true
});


export const createBudget = async (budgetData) => {
    try {
        const response = await api.post("/add", budgetData);
        return response.data;
    } catch (error) {
        console.error("Error creating budget:", error);
        throw error;
    }
};

export const getBudgets = async () => {
    try {
        const response = await api.get("/getSummery");
        return response.data;
    } catch (error) {
        console.error("Error fetching budgets:", error);
        throw error;
    }
};
