import { useState } from "react";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import CitizenDashboard from "./citizen/CitizenDashboard";
import AuthorityDashboard from "./authority/AuthorityDashboard";
import AdminDashboard from "./admin/AdminDashboard";

function App(){

  const [page, setPage] = useState("login");
  const [role, setRole] = useState(null);


  // ROLE BASED DASHBOARD

  if(role === "Citizen")
    return <CitizenDashboard onLogout={() => setRole(null)} />;


  if(role === "Authority")
    return <AuthorityDashboard onLogout={() => setRole(null)} />;


  if(role === "Admin")
    return <AdminDashboard onLogout={() => setRole(null)} />;


  // SIGNUP PAGE

  if(page === "signup")
    return (
      <Signup 
        goToLogin={()=>setPage("login")} 
      />
    );


  // LOGIN PAGE

  return (

    <Login
      goToSignup={()=>setPage("signup")}
      onLogin={(selectedRole)=>setRole(selectedRole)}
    />

  );

}

export default App;