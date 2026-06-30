import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  BarChart,
  User,
  Settings,
  LogOut
} from "lucide-react";
import EmotionChart from "../components/charts/EmotionChart";
import StatusChart from "../components/charts/StatusChart";
import DepartmentChart from "../components/charts/DepartmentChart";
import PriorityChart from "../components/charts/PriorityChart";
import TopIssuesChart from "../components/charts/TopIssuesChart";
import TimelineChart from "../components/charts/TimelineChart";

const AdminDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);

  const totalComplaints = complaints.length;

  const pendingComplaints =
    complaints.filter(c => c.status === "Pending").length;

  const resolvedComplaints =
    complaints.filter(c => c.status === "Resolved").length;

  const highUrgency =
    complaints.filter(c => (c.urgencyScore || 0) > 70).length;

  const angryComplaints =
    complaints.filter(c => c.emotion === "angry").length;

  const averageUrgency =
    complaints.length > 0
      ? Math.round(
          complaints.reduce((sum, c) => sum + (c.urgencyScore || 0), 0) /
          complaints.length
        )
      : 0;


  const toggleStatus = (id) => {

    const updatedUsers = users.map(u => {

      if (u._id === id) {

        return {
          ...u,
          status: u.status === "Active" ? "Blocked" : "Active"
        };

      }

      return u;

    });

    setUsers(updatedUsers);

  };


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

      setComplaints(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error(error);
      setComplaints([]);

    }

  };
  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      setUsers(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error(error);
      setUsers([]);

    }

  };


  useEffect(() => {

    fetchComplaints();
    fetchUsers();

  }, []);


  return (

    <div className="flex min-h-screen bg-gray-100">

      <div className="w-64 bg-blue-900 text-white flex flex-col">

        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          CivicAlert Admin
        </div>

        <nav className="flex flex-col p-4 space-y-2 flex-grow">

          <SidebarButton icon={<LayoutDashboard size={18}/>} text="Dashboard" setActive={setActive}/>
          <SidebarButton icon={<Users size={18}/>} text="Users" value="users" setActive={setActive}/>
          <SidebarButton icon={<Shield size={18}/>} text="Authorities" value="authority" setActive={setActive}/>
          <SidebarButton icon={<FileText size={18}/>} text="Complaints" value="complaints" setActive={setActive}/>
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


      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.name || "Admin"} 🧑‍💻
        </h1>


        {active === "dashboard" && (

          <div>

            <div className="grid grid-cols-4 gap-6">

              <StatCard title="Total Complaints" value={totalComplaints}/>
              <StatCard title="Pending" value={pendingComplaints}/>
              <StatCard title="Resolved" value={resolvedComplaints}/>
              <StatCard title="High Urgency" value={highUrgency}/>

            </div>
            <h2 className="text-3xl font-bold mb-6 mt-10">
  Admin Analytics Dashboard
</h2>

<div className="grid grid-cols-2 gap-6">

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <StatusChart complaints={complaints}/>
  </div>

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <PriorityChart complaints={complaints}/>
  </div>

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <DepartmentChart complaints={complaints}/>
  </div>

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <TimelineChart complaints={complaints}/>
  </div>

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <EmotionChart complaints={complaints}/>
  </div>

  <div className="bg-white rounded-2xl shadow p-6 h-[420px]">
    <TopIssuesChart complaints={complaints}/>
  </div>

</div>

            <div className="bg-white p-6 rounded shadow mt-6">

              <h2 className="text-xl font-semibold mb-4">
                All Complaints
              </h2>

              {complaints.map((c) => (

                <div key={c._id} className="border p-4 mb-3 rounded">

                  <p className="font-semibold">{c.complaintText}</p>

                  <p>Citizen: {c.citizenId?.name}</p>

                  <p>Status: <span className="font-bold ml-2">{c.status}</span></p>

                  <p>Urgency Score: <span className="font-bold ml-2">{c.urgencyScore}</span></p>

                </div>

              ))}

            </div>

          </div>

        )}


        {active === "users" && (

          <Section title="User Management">

            {users
              .filter(u => (u.role || "").toLowerCase() === "citizen")
              .map(u => (

              <div
                key={u._id}
                className="border p-4 rounded mb-3 flex justify-between items-center"
              >

                <div>

                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.role}</p>

                  <p className={`text-sm font-semibold ${
                    u.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {u.status}
                  </p>

                </div>

                <button
                  onClick={() => toggleStatus(u._id)}
                  className={`px-4 py-1 rounded text-white ${
                    u.status === "Active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {u.status === "Active" ? "Block" : "Unblock"}
                </button>

              </div>

            ))}

          </Section>

        )}


        {active === "authority" && (

          <Section title="Authority Management">

            {users
              .filter(u => (u.role || "").toLowerCase() === "authority")
              .map(u => (

              <div
                key={u._id}
                className="border p-4 rounded mb-3 flex justify-between"
              >

                <p>{u.name}</p>

                <button
                  onClick={() => toggleStatus(u._id)}
                  className={`px-4 py-1 rounded text-white ${
                    u.status === "Active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {u.status}
                </button>

              </div>

            ))}

          </Section>

        )}


        {active === "complaints" && (

          <Section title="Complaint Monitoring">

            {complaints.map(c => (

              <div key={c._id} className="border p-4 rounded mb-3">

                <p className="font-semibold">{c.complaintText}</p>

                <p>Citizen: {c.citizenId?.name}</p>

                <p>Urgency Score:
                  <span className="font-bold ml-2">
                    {c.urgencyScore}
                  </span>
                </p>

              </div>

            ))}

          </Section>

        )}

      </div>

    </div>

  );

};

export default AdminDashboard;



const SidebarButton = ({ icon, text, value, setActive }) => (

  <button
    onClick={()=>setActive(value || "dashboard")}
    className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
  >
    {icon}
    {text}
  </button>

);


const StatCard = ({ title, value }) => (

  <div className="bg-white p-6 rounded-xl shadow">

    <p className="text-gray-500">{title}</p>

    <h2 className="text-3xl font-bold text-blue-600">
      {value}
    </h2>

  </div>

);


const Section = ({ title, children }) => (

  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-xl font-semibold mb-4">
      {title}
    </h2>

    {children}

  </div>

);