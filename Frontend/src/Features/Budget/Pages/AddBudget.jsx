import React, { useState } from "react";
import {
  IndianRupee,
  Zap,
  ShoppingCart,
  TrainFront,
  Briefcase,
  Plus,
  FileText,
  Gift,
  HeartPulse,
} from "lucide-react";

const ModernBudgetScreen = () => {
  const [activeTab, setActiveTab] = useState("expense");
  const [amount, setAmount] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [note, setNote] = useState("");

  // Defined categories with associated icons based on Mongoose schema
  const categories = {
    expense: [
      {
        id: "shopping",
        label: "Shopping",
        icon: ShoppingCart,
        color: "text-sky-500",
      },
      { id: "bills", label: "Bills", icon: Zap, color: "text-amber-500" },
      {
        id: "travel",
        label: "Travel",
        icon: TrainFront,
        color: "text-teal-500",
      },
      { id: "food", label: "Food", icon: Gift, color: "text-orange-500" },
      {
        id: "health",
        label: "Health",
        icon: HeartPulse,
        color: "text-red-500",
      },
      { id: "other", label: "Other", icon: FileText, color: "text-slate-500" },
    ],
    income: [
      {
        id: "salary",
        label: "Salary",
        icon: Briefcase,
        color: "text-emerald-500",
      },
      { id: "other", label: "Other", icon: FileText, color: "text-slate-500" },
    ],
  };

  const handleAmountChange = (e) => {
    const val = e.target.value;
    // Basic validation: ensure number or empty
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  const switchTab = (type) => {
    setActiveTab(type);
    setSelectedCategory(""); // Reset category when switching tabs
  };

  // Build payload for your Mongoose model
  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0 || !selectedCategory) {
      alert("Please enter an amount and select a category.");
      return;
    }
    const payload = {
      amount: parseFloat(amount),
      type: activeTab, // 'expense' or 'income'
      category: selectedCategory, // Mongoose enum safe
      note: note || "",
      date: new Date(),
    };
    console.log("Submitting to Mongoose Backend:", payload);
    // integrate with axios.post(...) here
  };

  // Dynamic Styles based on type
  const isExpense = activeTab === "expense";
  const bgGradient = isExpense
    ? "from-rose-100/50 to-white"
    : "from-emerald-100/50 to-white";

  const primaryColor = isExpense ? "text-rose-600" : "text-emerald-600";
  const primaryBg = isExpense ? "bg-rose-600" : "bg-emerald-600";
  const fabShadow = isExpense ? "shadow-rose-300" : "shadow-emerald-300";

  return (
    // Base container with smooth gradient transition
    <div
      className={`min-h-screen ${bgGradient} p-4 pb-24 font-sans transition-all duration-500 ease-in-out relative`}
    >
      {/* Header & Toggle */}
      <div className="max-w-md mx-auto mt-6 flex flex-col items-center">
        <h1 className="text-xl font-bold text-slate-900">New Transaction</h1>

        <div className="relative mt-5 w-64 h-11 bg-white border border-slate-200 rounded-full shadow-inner p-1 flex items-center">
          {/* Animated Slider Background */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] ${primaryBg} rounded-full transition-all duration-300 ease-out ${!isExpense ? "left-1" : "left-[calc(50%+2px)]"}`}
          ></div>

          <button
            onClick={() => switchTab("income")}
            className={`flex-1 text-sm font-semibold relative z-10 transition-colors duration-300 ${!isExpense ? "text-white" : "text-slate-500"}`}
          >
            Income
          </button>
          <button
            onClick={() => switchTab("expense")}
            className={`flex-1 text-sm font-semibold relative z-10 transition-colors duration-300 ${isExpense ? "text-white" : "text-slate-500"}`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-md mx-auto mt-12 bg-white rounded-3xl p-6 shadow-xl shadow-slate-100 border border-slate-100/50 relative">
        {/* Amount Input (Large & Centered) */}
        <div className="text-center">
          <label className="text-xs uppercase tracking-widest text-slate-400 font-bold">
            How much?
          </label>
          <div
            className={`mt-2 flex items-baseline justify-center font-bold ${primaryColor}`}
          >
            <span className="text-3xl mr-1">
              <IndianRupee size={28} className="inline" strokeWidth={3} />
            </span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-1/2 bg-transparent text-5xl font-extrabold text-slate-950 focus:outline-none placeholder:text-slate-200"
              placeholder="0"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Note Input (Subtle) */}
        <div className="mt-8 relative max-w-sm mx-auto">
          <span className="absolute left-4 top-3.5 text-slate-400">
            <FileText size={18} />
          </span>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a quick note..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-100 rounded-2xl text-sm focus:ring-1 focus:ring-slate-300 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Floating Category Pills (X-Axis Overflow) */}
        <div className="mt-12 -mx-6">
          <div className="px-6 mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Select Category
            </h2>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide snap-x snap-mandatory">
            {categories[activeTab].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-none snap-start flex flex-col items-center justify-center gap-2 p-4 w-28 h-28 rounded-3xl border-2 transition-all duration-150 ${
                    isSelected
                      ? `${primaryColor} ${isExpense ? "border-rose-300 bg-rose-50" : "border-emerald-300 bg-emerald-50"} shadow-md`
                      : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <span
                    className={`${cat.color} ${isSelected ? "" : "opacity-80"}`}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </span>
                  <span
                    className={`text-xs font-semibold ${isSelected ? primaryColor : "text-slate-700"}`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Action Button (FAB) at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
        <button
          onClick={handleSubmit}
          className={`w-full h-16 ${primaryBg} ${fabShadow} shadow-lg rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-95`}
        >
          <Plus size={24} />
          <span>Add {isExpense ? "Expense" : "Income"}</span>
        </button>
      </div>
    </div>
  );
};

// Simple utility to hide scrollbars via Tailwind
const style = document.createElement("style");
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;
document.head.appendChild(style);

export default ModernBudgetScreen;
