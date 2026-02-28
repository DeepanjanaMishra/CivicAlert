import { useState } from "react";

import Login from "./auth/Login";
import Signup from "./auth/signUp";

import CitizenDashboard from "./citizen/CitizenDashboard";
import AuthorityDashboard from "./authority/AuthorityDashboard";
import AdminDashboard from "./admin/AdminDashboard";

function App(){

  const [page, setPage] = useState("login");
  const [role, setRole] = useState(null);


  if(role === "citizen")
    return <CitizenDashboard/>


  if(role === "authority")
    return <AuthorityDashboard/>


  if(role === "admin")
    return <AdminDashboard/>


  if(page === "signup")
    return <Signup goToLogin={()=>setPage("login")} />


  return (

    <Login
      goToSignup={()=>setPage("signup")}
      onLogin={(r)=>setRole(r)}
    />

  );

}

export default App;