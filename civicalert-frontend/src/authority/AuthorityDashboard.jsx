import React, { useState } from "react";
import { LayoutDashboard, FileText, AlertTriangle, User, LogOut } from "lucide-react";

const AuthorityDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");

  const complaints = [
    {
      id: 1,
      issue: "Street light not working",
      citizen: "Rahul",
      priority: "High",
      status: "Pending"
    },
    {
      id: 2,
      issue: "Water leakage",
      citizen: "Amit",
      priority: "Medium",
      status: "In Progress"
    }
  ];


  return (

    <div className="flex min-h-screen bg-gray-100">


      {/* SIDEBAR */}

      <div className="w-64 bg-blue-900 text-white flex flex-col">


        <div className="p-5 text-2xl font-bold border-b border-blue-700">
          CivicAlert
        </div>


        <nav className="flex flex-col p-4 space-y-2">

          <button
            onClick={() => setActive("dashboard")}
            className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded"
          >
            <LayoutDashboard size={20}/>
            Dashboard
          </button>


          <button
            onClick={() => setActive("complaints")}
            className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded"
          >
            <FileText size={20}/>
            Complaints
          </button>


          <button
            onClick={() => setActive("priority")}
            className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded"
          >
            <AlertTriangle size={20}/>
            Priority Cases
          </button>


          <button
            className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded"
          >
            <User size={20}/>
            Profile
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
          Authority Dashboard
        </h1>



        {active === "dashboard" && (

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded shadow">
              Total Complaints
              <p className="text-2xl font-bold text-blue-600">120</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              Pending
              <p className="text-2xl font-bold text-yellow-600">35</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              Resolved
              <p className="text-2xl font-bold text-green-600">85</p>
            </div>

          </div>

        )}



        {active === "complaints" && (

          <div className="space-y-4">

            {complaints.map(c => (

              <div key={c.id} className="bg-white p-4 shadow rounded">

                <h3 className="font-semibold">{c.issue}</h3>

                <p>Citizen: {c.citizen}</p>

                <p>
                  Priority:
                  <span className={
                    c.priority === "High"
                    ? "text-red-600 font-bold"
                    : "text-yellow-600 font-bold"
                  }>
                    {" "}{c.priority}
                  </span>
                </p>

                <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
                  Resolve
                </button>

              </div>

            ))}

          </div>

        )}


      </div>


    </div>

  );

};

export default AuthorityDashboard;