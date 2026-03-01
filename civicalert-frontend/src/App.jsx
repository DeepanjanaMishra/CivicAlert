import { useState } from "react";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import CitizenDashboard from "./citizen/CitizenDashboard";
import AuthorityDashboard from "./authority/AuthorityDashboard";
import AdminDashboard from "./admin/AdminDashboard";

function App(){

  const [page, setPage] = useState("login");

  const [user, setUser] = useState(null);   // ⭐ store full user


  // DASHBOARD ROUTING

  if(user?.role === "Citizen")
    return <CitizenDashboard user={user} onLogout={() => setUser(null)} />;


  if(user?.role === "Authority")
    return <AuthorityDashboard user={user} onLogout={() => setUser(null)} />;


  if(user?.role === "Admin")
    return <AdminDashboard user={user} onLogout={() => setUser(null)} />;



  // SIGNUP

  if(page === "signup")
    return (
      <Signup 
        goToLogin={()=>setPage("login")} 
      />
    );



  // LOGIN

  return (

    <Login
      goToSignup={()=>setPage("signup")}
      onLogin={(loggedInUser)=>setUser(loggedInUser)}
    />

  );

}

export default App;