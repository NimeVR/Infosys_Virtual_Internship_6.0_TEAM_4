import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home               from "./pages/Home";
import Login              from "./pages/Login";
import SignUp             from "./pages/SignUp";
import Logout             from "./pages/Logout";
import Dashboard          from "./pages/Dashboard";
import Transactions       from "./pages/Transactions";
import Budgets            from "./pages/Budgets";
import TaxEstimator       from "./pages/TaxEstimator";
import Reports            from "./pages/Reports";
import SettingCategories  from "./pages/SettingCategories";

import { TransactionProvider } from "./context/TransactionContext";
import { BudgetProvider } from "./context/BudgetContext";
import { TaxPaymentProvider } from "./context/TaxPaymentContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Budgets from "./pages/Budgets";
import Transactions from "./pages/Transactions";
import SettingLayout from "./pages/SettingLayout";
import SettingsProfile from "./pages/SettingsProfile";
import SettingCategories from "./pages/SettingCategories";
import SettingsNotifications from "./pages/SettingsNotifications";
import SettingsSecurity from "./pages/SettingsSecurity";
import TaxEstimator from "./pages/TaxEstimator";
import Reports from "./pages/Reports";

function App() {
  return (
    <CategoryProvider>
      <TransactionProvider>
        <BudgetProvider>
          <TaxPaymentProvider>
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/tax-estimator" element={<TaxEstimator />} />
            <Route path="/reports" element={<Reports />} />
import { CategoryProvider }    from "./context/CategoryContext";

function App() {
  return (
    <BrowserRouter>
      <CategoryProvider>
        <TransactionProvider>
          <Routes>
            <Route path="/"                    element={<Home />} />
            <Route path="/login"               element={<Login />} />
            <Route path="/signup"              element={<SignUp />} />
            <Route path="/logout"              element={<Logout />} />

            <Route path="/dashboard"           element={<Dashboard />} />
            <Route path="/transactions"        element={<Transactions />} />
            <Route path="/budgets"             element={<Budgets />} />
            <Route path="/tax-estimator"       element={<TaxEstimator />} />
            <Route path="/reports"             element={<Reports />} />
            <Route path="/settings/categories" element={<SettingCategories />} />
          </Routes>
        </BrowserRouter>
          </TaxPaymentProvider>
        </BudgetProvider>
      </TransactionProvider>
    </CategoryProvider>
  );
}

export default App;