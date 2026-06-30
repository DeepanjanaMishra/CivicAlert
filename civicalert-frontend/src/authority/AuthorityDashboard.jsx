import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  BarChart,
  User,
  Settings,
  LogOut
} from "lucide-react";
import DepartmentChart from "../components/charts/DepartmentChart";
import PriorityChart from "../components/charts/PriorityChart";
import EmotionIntensityChart from "../components/charts/EmotionIntensityChart";
import TimelineChart from "../components/charts/TimelineChart";

const AuthorityDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);

  const priorityComplaints =
    complaints.filter(c => c.priority === "High");

  const pendingComplaints =
    complaints.filter(c => c.status === "Pending").length;

  const resolvedComplaints =
    complaints.filter(c => c.status === "Resolved").length;

  const avgUrgency =
    complaints.length > 0
      ? Math.round(
          complaints.reduce((sum, c) => sum + (c.urgencyScore || 0), 0) /
          complaints.length
        )
      : 0;


  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setComplaints(data);
      } else {
        console.error("Invalid response:", data);
        setComplaints([]);
      }

    } catch (error) {

      console.error(error);
      setComplaints([]);

    }

  };


  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:5000/api/complaints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      fetchComplaints();

    } catch (error) {

      console.error(error);

    }

  };


  useEffect(() => {

    fetchComplaints();

  }, []);



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

  <div>

    {/* KPI CARDS */}

    <div className="grid grid-cols-4 gap-6 mb-10">

      <StatCard
        title="Total Complaints"
        value={complaints.length}
      />

      <StatCard
        title="High Priority"
        value={priorityComplaints.length}
        color="red"
      />

      <StatCard
        title="Pending"
        value={pendingComplaints}
        color="yellow"
      />

      <StatCard
        title="Resolved"
        value={resolvedComplaints}
        color="green"
      />

    </div>


    {/* ANALYTICS */}

    <h2 className="text-3xl font-bold mb-6">
      Authority Analytics
    </h2>

    <div className="grid grid-cols-2 gap-6">

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <DepartmentChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <PriorityChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <EmotionIntensityChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <TimelineChart complaints={complaints}/>
      </div>

    </div>

  </div>

)}


        {/* ALL COMPLAINTS */}

        {active === "complaints" && (

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              All Complaints
            </h2>

            {complaints.map(c => (

              <ComplaintCard
                key={c._id}
                complaint={c}
                updateStatus={updateStatus}
              />

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

              <ComplaintCard
                key={c._id}
                complaint={c}
                highlight
                updateStatus={updateStatus}
              />

            ))}

          </div>

        )}



        {/* ANALYTICS */}

        {active === "analytics" && (

  <div>

    <h2 className="text-3xl font-bold mb-6">
      Detailed Analytics
    </h2>

    <div className="grid grid-cols-3 gap-6 mb-8">

      <StatCard
        title="Average Urgency Score"
        value={avgUrgency}
      />

      <StatCard
        title="Total Complaints"
        value={complaints.length}
      />

      <StatCard
        title="Resolved Complaints"
        value={resolvedComplaints}
      />

    </div>

    <div className="grid grid-cols-2 gap-6">

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <DepartmentChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <PriorityChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <EmotionIntensityChart complaints={complaints}/>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
        <TimelineChart complaints={complaints}/>
      </div>

    </div>

  </div>

)}



        {/* PROFILE */}

        {active === "profile" && (

          <div className="bg-white p-8 rounded-xl shadow max-w-xl">

            <h2 className="text-2xl font-semibold mb-6">
              Authority Profile
            </h2>

            <ProfileField label="Name" value={user?.name}/>
            <ProfileField label="Email" value={user?.email}/>
            <ProfileField label="Role" value="Authority"/>

          </div>

        )}



        {/* SETTINGS */}                                                                                                                                                                            

        {active === "settings" && (

          <div className="bg-white p-8 rounded-xl shadow max-w-xl">

            <h2 className="text-2xl font-semibold mb-6">
              Settings
            </h2>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Language</label>
              <select className="w-full border p-2 rounded">
                <option>English</option>
                <option>Hindi</option>
                <option>Hinglish</option>
              </select>
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



const SidebarButton = ({ icon, text, value, setActive }) => (

  <button
    onClick={()=>setActive(value || "dashboard")}
    className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
  >
    {icon}
    {text}
  </button>

);



const StatCard = ({ title, value, color }) => {

  const colorMap = {
    red: "text-red-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    blue: "text-blue-600"
  };

  return (

    <div className="bg-white p-6 rounded shadow">

      <p className="text-gray-500">{title}</p>

      <h2 className={`text-3xl font-bold ${colorMap[color] || "text-blue-600"}`}>
        {value}
      </h2>

    </div>

  );

};



const ComplaintCard = ({ complaint, highlight, updateStatus }) => (

  <div className={`border p-4 mb-4 rounded ${highlight ? "bg-red-50" : ""}`}>

    <h3 className="font-semibold text-lg">
      {complaint.complaintText}
    </h3>

    <p>Citizen: {complaint.citizenId?.name || "Unknown"}</p>

    <p>
      Emotion:
      <span className="text-red-600 font-semibold">
        {" "} {complaint.emotion || "Neutral"}
      </span>
    </p>

    <p>
      Urgency Score:
      <span className="font-bold">
        {" "} {complaint.urgencyScore || 0}
      </span>
    </p>

    <p>
      Status:
      <span className={`ml-2 font-bold ${
        complaint.status === "Resolved"
          ? "text-green-600"
          : complaint.status === "Pending"
          ? "text-yellow-600"
          : "text-blue-600"
      }`}>
        {complaint.status}
      </span>
    </p>

    {complaint.status !== "Resolved" && (

      <button
        onClick={() => updateStatus(complaint._id, "Resolved")}
        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
      >
        Resolve Complaint
      </button>

    )}

  </div>

);



const ProfileField = ({ label, value }) => (

  <div className="mb-4">

    <label className="font-semibold">{label}</label>

    <input
      className="border p-2 w-full"
      value={value || ""}
      readOnly
    />

  </div>

);