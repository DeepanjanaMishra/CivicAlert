import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  BarChart,
  User,
  Settings,
  LogOut
} from "lucide-react";

const AuthorityDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");

  const complaints = [

    {
      id: "CA101",
      issue: "Street light not working in Sector 18",
      citizen: "Rahul Sharma",
      emotion: "Angry",
      priority: "High",
      urgency: 92,
      status: "Pending",
      date: "2026-03-01"
    },

    {
      id: "CA102",
      issue: "Water leakage near main road",
      citizen: "Amit Verma",
      emotion: "Concerned",
      priority: "Medium",
      urgency: 68,
      status: "In Progress",
      date: "2026-02-28"
    }

  ];

  const priorityComplaints =
    complaints.filter(c => c.priority === "High");



  return (

    <div className="flex min-h-screen bg-gray-100">


      {/* SIDEBAR */}


      <div className="w-64 bg-blue-900 text-white flex flex-col">


        <div className="p-6 text-2xl font-bold border-b border-blue-700">

          CivicAlert Authority

        </div>


        <nav className="flex flex-col p-4 space-y-2 flex-grow">


          <SidebarButton icon={<LayoutDashboard size={18}/>} text="Dashboard" setActive={setActive}/>

          <SidebarButton icon={<FileText size={18}/>} text="All Complaints" value="complaints" setActive={setActive}/>

          <SidebarButton icon={<AlertTriangle size={18}/>} text="Priority Complaints" value="priority" setActive={setActive}/>

          <SidebarButton icon={<BarChart size={18}/>} text="Analytics" value="analytics" setActive={setActive}/>

          <SidebarButton icon={<User size={18}/>} text="Profile" value="profile" setActive={setActive}/>

          <SidebarButton icon={<Settings size={18}/>} text="Settings" value="settings" setActive={setActive}/>


        </nav>



        <button
          onClick={onLogout}
          className="flex items-center gap-3 hover:bg-red-600 p-3 rounded m-4"
        >

          <LogOut size={18}/>

          Logout

        </button>


      </div>



      {/* MAIN CONTENT */}



      <div className="flex-1 p-8">


        <h1 className="text-3xl font-bold mb-6">

          Welcome, {user?.name || "Officer"} 👮

        </h1>



        {/* DASHBOARD */}


        {active === "dashboard" && (

          <div className="grid grid-cols-4 gap-6">


            <StatCard title="Total Complaints" value={complaints.length}/>

            <StatCard title="High Priority" value={priorityComplaints.length} color="red"/>

            <StatCard title="Pending" value="5" color="yellow"/>

            <StatCard title="Resolved" value="87" color="green"/>


          </div>

        )}



        {/* ALL COMPLAINTS */}


        {active === "complaints" && (

          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-semibold mb-4">

              All Complaints

            </h2>


            {complaints.map(c => (

              <ComplaintCard complaint={c}/>

            ))}


          </div>

        )}



        {/* PRIORITY */}



        {active === "priority" && (

          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-semibold mb-4 text-red-600">

              High Priority Complaints 🚨

            </h2>


            {priorityComplaints.map(c => (

              <ComplaintCard complaint={c} highlight/>

            ))}


          </div>

        )}



        {/* ANALYTICS */}


        {active === "analytics" && (

          <div className="grid grid-cols-3 gap-6">


            <StatCard title="Avg Urgency Score" value="74"/>

            <StatCard title="Angry Complaints" value="42"/>

            <StatCard title="Resolution Rate" value="81%"/>


          </div>

        )}



        {/* PROFILE */}


        {/* PROFILE */}

{active === "profile" && (

  <div className="bg-white p-8 rounded-xl shadow max-w-xl">

    <h2 className="text-2xl font-semibold mb-6">
      Authority Profile
    </h2>


    {/* Profile Photo */}

    <div className="flex items-center gap-4 mb-6">

      <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">

        {user?.name?.charAt(0) || "A"}

      </div>

      <button className="text-blue-600 hover:underline">

        Edit Photo

      </button>

    </div>



    {/* Name */}

    <div className="mb-4">

      <label className="block font-semibold mb-1">

        Full Name

      </label>

      <input
        type="text"
        defaultValue={user?.name || "Authority User"}
        className="w-full border p-2 rounded"
      />

    </div>



    {/* Email */}

    <div className="mb-4">

      <label className="block font-semibold mb-1">

        Email

      </label>

      <input
        type="email"
        defaultValue={user?.email || "authority@gmail.com"}
        className="w-full border p-2 rounded"
      />

    </div>



    {/* Phone */}

    <div className="mb-4">

      <label className="block font-semibold mb-1">

        Phone

      </label>

      <input
        type="text"
        defaultValue="+91 9876543210"
        className="w-full border p-2 rounded"
      />

    </div>



    {/* Role */}

    <div className="mb-6">

      <label className="block font-semibold mb-1">

        Role

      </label>

      <input
        type="text"
        value="Authority"
        disabled
        className="w-full border p-2 rounded bg-gray-100"
      />

    </div>



    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">

      Save Changes

    </button>


  </div>

)}



        {/* SETTINGS */}

{active === "settings" && (

  <div className="bg-white p-8 rounded-xl shadow max-w-xl">

    <h2 className="text-2xl font-semibold mb-6">

      Authority Settings

    </h2>


    {/* Language */}

    <div className="mb-6">

      <label className="block font-semibold mb-2">

        Language

      </label>

      <select className="w-full border p-2 rounded">

        <option>English</option>

        <option>Hindi</option>

        <option>Hinglish</option>

      </select>

    </div>



    {/* Notifications */}

    <div className="mb-6 flex justify-between items-center">

      <span className="font-semibold">

        Enable Notifications

      </span>

      <input type="checkbox" defaultChecked />

    </div>



    {/* Dark Mode */}

    {/*<div className="mb-6 flex justify-between items-center">

      <span className="font-semibold">

        Dark Mode

      </span>

      <input type="checkbox"/>

    </div>*/}



    {/* Change Password */}

    <div className="mb-6">

      <label className="block font-semibold mb-2">

        Change Password

      </label>

      <input
        type="password"
        placeholder="Enter new password"
        className="w-full border p-2 rounded"
      />

    </div>



    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">

      Save Settings

    </button>


  </div>

)}



      </div>


    </div>

  );

};

export default AuthorityDashboard;



/* COMPONENTS */



const SidebarButton = ({ icon, text, value, setActive }) => (

  <button
    onClick={()=>setActive(value || "dashboard")}
    className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
  >

    {icon}

    {text}

  </button>

);



const StatCard = ({ title, value, color }) => (

  <div className="bg-white p-6 rounded shadow">

    <p className="text-gray-500">

      {title}

    </p>

    <h2 className={`text-3xl font-bold text-${color || "blue"}-600`}>

      {value}

    </h2>

  </div>

);



const ComplaintCard = ({ complaint, highlight }) => (

  <div className={`border p-4 mb-4 rounded ${highlight && "bg-red-50"}`}>

    <h3 className="font-semibold text-lg">

      {complaint.issue}

    </h3>


    <p>

      Citizen: {complaint.citizen}

    </p>


    <p>

      Emotion:

      <span className="text-red-600 font-semibold">

        {" "}{complaint.emotion}

      </span>

    </p>


    <p>

      Urgency Score:

      <span className="font-bold">

        {" "}{complaint.urgency}

      </span>

    </p>


    <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded">

      Mark Resolved

    </button>


  </div>

);



const ProfileField = ({ label, value }) => (

  <div className="mb-4">

    <label className="font-semibold">

      {label}

    </label>

    <input
      className="border p-2 w-full"
      value={value}
      readOnly
    />

  </div>

);