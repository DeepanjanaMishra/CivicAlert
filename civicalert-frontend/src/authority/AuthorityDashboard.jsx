import React from "react";

const AuthorityDashboard = ({ user, onLogout }) => {

  const complaints = [

    {
      id: 1,
      text: "Street light not working",
      priority: "High",
      status: "Pending",
      citizen: "Rahul"
    },

    {
      id: 2,
      text: "Water leakage",
      priority: "Medium",
      status: "In Progress",
      citizen: "Amit"
    }

  ];



  return (

    <div className="min-h-screen bg-gray-100">


      {/* HEADER */}

      <div className="bg-blue-900 text-white p-4 flex justify-between">

        <h1 className="text-xl font-bold">
          CivicAlert Authority Panel
        </h1>


        <div>

          Welcome, {user?.name}

          <button
            onClick={onLogout}
            className="ml-4 bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>

        </div>

      </div>



      {/* CONTENT */}

      <div className="p-6">


        <h2 className="text-2xl font-bold mb-4">
          Complaints
        </h2>



        <div className="grid gap-4">


          {complaints.map(c => (

            <div
              key={c.id}
              className="bg-white p-4 rounded shadow"
            >

              <h3 className="font-semibold">
                {c.text}
              </h3>


              <p>
                Citizen: {c.citizen}
              </p>


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


              <p>Status: {c.status}</p>


              <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">

                Mark Resolved

              </button>


            </div>

          ))}


        </div>


      </div>


    </div>

  );

};

export default AuthorityDashboard;