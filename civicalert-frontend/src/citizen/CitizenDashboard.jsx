import React, { useState, useRef } from "react";
import { Mic, FileText, History, User, LogOut } from "lucide-react";
import { useEffect } from "react";
const CitizenDashboard = ({ user, onLogout }) => {

  const [active, setActive] = useState("dashboard");
  const [myComplaints, setMyComplaints] = useState([]);

  const totalComplaints = myComplaints.length;
  const pendingComplaints = myComplaints.filter(c => c.status === "Pending").length;
  const resolvedComplaints = myComplaints.filter(c => c.status === "Resolved").length;
  // 🎤 Voice Recording States

  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);


  // 🎤 START RECORDING

  const startRecording = async () => {

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {

        audioChunksRef.current.push(event.data);

      };


      mediaRecorder.onstop = () => {

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav"
        });

        const url = URL.createObjectURL(audioBlob);

        setAudioURL(url);

      };


      mediaRecorder.start();

      setRecording(true);

    }

    catch(err){

      alert("Microphone access denied");

    }

  };



  // ⏹ STOP RECORDING

  const stopRecording = () => {

    if(mediaRecorderRef.current){

      mediaRecorderRef.current.stop();

      setRecording(false);

    }

  };

  const submitComplaint = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/complaints", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },

      body: JSON.stringify({
        complaintText: "Voice complaint submitted"
      })

    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Complaint submission failed");
      return;
    }

    alert("Complaint submitted successfully!");

    setAudioURL(null);

  } catch (error) {

    console.error(error);
    alert("Server error");

  }

};

  const fetchMyComplaints = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/complaints/my",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    setMyComplaints(data);

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

  if (active === "history" || active === "dashboard") {

    fetchMyComplaints();

  }

}, [active]);



  return (

    <div className="min-h-screen bg-gray-100 flex">


      {/* SIDEBAR */}

      <div className="w-64 bg-blue-900 text-white flex flex-col">


        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          CivicAlert
        </div>



        <nav className="flex flex-col p-4 space-y-3 flex-grow">


          <button
            onClick={()=>setActive("dashboard")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <FileText size={20}/>
            Dashboard
          </button>



          <button
            onClick={()=>setActive("record")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <Mic size={20}/>
            Record Complaint
          </button>



          <button
            onClick={()=>setActive("history")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <History size={20}/>
            My Complaints
          </button>

          <button
            onClick={() => setActive("details")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <FileText size={20} />
            Complaint Details
          </button>



          <button
            onClick={() => setActive("profile")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            <User size={20} />
            Profile
          </button>


          <button
            onClick={() => setActive("settings")}
            className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded"
          >
            ⚙ Settings
          </button>



        </nav>



        {/* LOGOUT */}

        <button
          onClick={onLogout}
          className="flex items-center gap-3 hover:bg-red-600 p-3 rounded m-4"
        >

          <LogOut size={20}/>
          Logout

        </button>


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

              <h2>Total Complaints</h2>

              <p className="text-3xl text-blue-600 mt-2">

                {totalComplaints}

              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2>Pending</h2>

              <p className="text-3xl text-yellow-500 mt-2">

                {pendingComplaints}

              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2>Resolved</h2>

              <p className="text-3xl text-green-600 mt-2">

                {resolvedComplaints}

              </p>

            </div>


          </div>

        )}




        {/* 🎤 RECORD SECTION */}

        {active === "record" && (

          <div className="bg-white p-8 rounded-xl shadow max-w-xl">


            <h2 className="text-2xl font-semibold mb-6">

              Record New Complaint

            </h2>



            {/* RECORD BUTTONS */}


            {!recording ? (

              <button

                onClick={startRecording}

                className="bg-green-600 text-white px-6 py-3 rounded-lg"

              >

                🎤 Start Recording

              </button>

            )

            :

            (

              <button

                onClick={stopRecording}

                className="bg-red-600 text-white px-6 py-3 rounded-lg"

              >

                ⏹ Stop Recording

              </button>

            )}




            {/* AUDIO PREVIEW */}


            {audioURL && (

              <div className="mt-6">


                <p className="font-semibold mb-2">

                  Preview

                </p>

                <audio controls src={audioURL}/>

                <button
                  onClick={submitComplaint}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
                >

                  Submit Complaint

                </button>


              </div>

            )}

          </div>

        )}




        {/* HISTORY */}

        {active === "history" && (

          <div className="bg-white p-6 rounded-xl shadow">


            <h2 className="text-2xl mb-4">

              My Complaints

            </h2>



            {myComplaints.map((complaint) => (

  <div key={complaint._id} className="border p-4 mb-3 rounded">

    {complaint.complaintText}

    <div
      className={`mt-2 font-semibold ${
        complaint.status === "Resolved"
          ? "text-green-600"
          : complaint.status === "Pending"
          ? "text-yellow-600"
          : "text-blue-600"
      }`}
    >

      {complaint.status}

    </div>

  </div>

))}


          </div>

        )}
        {/* COMPLAINT DETAILS */}

{active === "details" && (

  <div className="bg-white p-6 rounded-xl shadow max-w-2xl">

    <h2 className="text-2xl font-semibold mb-4">
      Complaint Details
    </h2>


    {/* Complaint ID */}

    <p className="mb-2">
      <span className="font-semibold">Complaint ID:</span> CA1023
    </p>



    {/* Audio */}

    <div className="mb-4">

      <p className="font-semibold mb-1">
        Audio:
      </p>

      <audio controls src={audioURL}></audio>

    </div>



    {/* Transcription */}

    <div className="mb-4">

      <p className="font-semibold">
        Transcription:
      </p>

      <p className="bg-gray-100 p-3 rounded mt-1">

        Street light is not working and area is unsafe at night.

      </p>

    </div>



    {/* Emotion */}

    <div className="mb-4">

      <p className="font-semibold">
        Emotion Detected:
      </p>

      <span className="text-red-600 font-bold">

        Angry 😠

      </span>

    </div>



    {/* Urgency */}

    <div className="mb-4">

      <p className="font-semibold">
        Urgency Score:
      </p>

      <span className="bg-red-100 text-red-700 px-3 py-1 rounded">

        High Priority

      </span>

    </div>



    {/* Status */}

    <div>

      <p className="font-semibold">
        Status:
      </p>

      <span className="text-yellow-600 font-semibold">

        In Progress

      </span>

    </div>


  </div>

)}
    {/* PROFILE */}

      {active === "profile" && (

        <div className="bg-white p-8 rounded-xl shadow max-w-xl">

          <h2 className="text-2xl font-semibold mb-6">
            My Profile
          </h2>


          {/* Profile Image */}

          <div className="flex items-center gap-4 mb-6">

            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">

              C

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
              value={user?.name || "Citizen User"}
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
              value={user?.email || "citizen@gmail.com"}
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
              value="+91 9876543210"
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
              value="Citizen"
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />

          </div>



          {/* Save Button */}

          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">

            Save Changes

          </button>


        </div>

      )}

      {/* SETTINGS */}

      {active === "settings" && (

        <div className="bg-white p-8 rounded-xl shadow max-w-xl">

          <h2 className="text-2xl font-semibold mb-6">
            Settings
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

          <div className="mb-6 flex items-center justify-between">

            <span className="font-semibold">
              Enable Notifications
            </span>

            <input type="checkbox" defaultChecked />

          </div>



          {/* Dark Mode */}

        { /* <div className="mb-6 flex items-center justify-between">

            <span className="font-semibold">
              Dark Mode
            </span>

            <input type="checkbox" />

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



          {/* Save Button */}

          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">

            Save Settings

          </button>



          {/* Logout Button */}

          <button
            onClick={onLogout}
            className="ml-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >

            Logout

          </button>


        </div>

      )}



      </div>


    </div>

  );

};

export default CitizenDashboard;