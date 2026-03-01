import React, { useState } from "react";
import { LayoutDashboard, Users, BarChart, Settings, LogOut } from "lucide-react";

const AdminDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");


  return (

    <div className="flex min-h-screen bg-gray-100">


      {/* SIDEBAR */}

      <div className="w-64 bg-black text-white flex flex-col">


        <div className="p-5 text-2xl font-bold border-b border-gray-700">
          CivicAlert
        </div>


        <nav className="flex flex-col p-4 space-y-2">


          <button
            onClick={()=>setActive("dashboard")}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
          >
            <LayoutDashboard size={20}/>
            Dashboard
          </button>


          <button
            onClick={()=>setActive("users")}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
          >
            <Users size={20}/>
            Users
          </button>


          <button
            onClick={()=>setActive("analytics")}
            className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded"
          >
            <BarChart size={20}/>
            Analytics
          </button>


          <button
            onClick={onLogout}
            className="flex items-center gap-3 p-3 hover:bg-red-600 rounded mt-auto"
          >
            <LogOut size={20}/>
            Logout
          </button>


        </nav>


      </div>



      {/* MAIN */}

      <div className="flex-1 p-6">


        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>



        {active === "dashboard" && (

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded shadow">
              Total Users
              <p className="text-2xl font-bold">300</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              Authorities
              <p className="text-2xl font-bold">25</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              Complaints
              <p className="text-2xl font-bold">500</p>
            </div>

          </div>

        )}



      </div>


    </div>

  );

};

export default AdminDashboard;