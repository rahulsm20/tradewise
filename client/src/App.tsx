import { useAuth0 } from "@auth0/auth0-react";
import { RotateCw } from "lucide-react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Layout from "./pages/Layout";

function App() {
  const { user: authUser, isLoading } = useAuth0();
  if (isLoading)
    return (
      <div className="flex items-center justify-center m-10 animate-spin">
        <RotateCw />
      </div>
    );
  else if (authUser) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    );
  } else if (!isLoading) {
    return (
      <Routes>
        <Route path="*" element={<Landing />} />
      </Routes>
    );
  }
}

export default App;
