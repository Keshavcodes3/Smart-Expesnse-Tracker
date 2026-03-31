import { createBrowserRouter } from "react-router-dom";
import SignupPage from "../Features/Auth/Pages/SignUpPage";
import SignInPage from "../Features/Auth/Pages/SignInPage";
import AddBudget from "../Features/Budget/Pages/AddBudget";

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path:'/addBudget',
    element:<AddBudget/>
  }
]);
