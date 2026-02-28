import React, { useState } from "react";
import { Mic, FileText, History, User, LogOut } from "lucide-react";

const CitizenDashboard = () => {

  const [active, setActive] = useState("dashboard");

  return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}

      <div className="w-64 bg-blue-900 text-white flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          CivicAlert
        </div>


        <nav className="flex flex-col p-4 space-y-3">

          <button
            onClick={() => setActive("dashboard")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <FileText size={20} />
            Dashboard
          </button>


          <button
            onClick={() => setActive("record")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <Mic size={20} />
            Record Complaint
          </button>


          <button
            onClick={() => setActive("history")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <History size={20} />
            My Complaints
          </button>


          <button
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <User size={20} />
            Profile
          </button>


          <button
            className="flex items-center gap-3 hover:bg-red-600 p-3 rounded mt-auto"
          >
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </div>



      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Welcome, Citizen 👋
        </h1>



        {/* DASHBOARD */}

        {active === "dashboard" && (

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">
                Total Complaints
              </h2>

              <p className="text-3xl mt-3 text-blue-600">
                12
              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-semibold">
                Pending
              </h2>

              <p className="text-3xl mt-3 text-yellow-500">
                4
              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="text-xl font-semibold">
                Resolved
              </h2>

              <p className="text-3xl mt-3 text-green-600">
                8
              </p>

            </div>

          </div>

        )}



        {/* RECORD */}

        {active === "record" && (

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4">
              Record New Complaint
            </h2>


            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">

              🎤 Start Recording

            </button>

          </div>

        )}



        {/* HISTORY */}

        {active === "history" && (

          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-semibold mb-4">
              My Complaints
            </h2>


            <div className="border p-4 rounded mb-3">

              <p>
                Street light not working
              </p>

              <span className="text-sm text-yellow-600">
                Pending
              </span>

            </div>



            <div className="border p-4 rounded">

              <p>
                Water leakage issue
              </p>

              <span className="text-sm text-green-600">
                Resolved
              </span>

            </div>


          </div>

        )}


      </div>


    </div>

  );

};

export default CitizenDashboard;