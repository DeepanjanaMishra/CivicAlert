import React, { useState, useRef } from "react";
import { Mic, FileText, History, User, LogOut } from "lucide-react";

const CitizenDashboard = ({ onLogout }) => {

  const [active, setActive] = useState("dashboard");

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



          <button className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded">

            <User size={20}/>
            Profile

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

                12

              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2>Pending</h2>

              <p className="text-3xl text-yellow-500 mt-2">

                4

              </p>

            </div>



            <div className="bg-white p-6 rounded-xl shadow">

              <h2>Resolved</h2>

              <p className="text-3xl text-green-600 mt-2">

                8

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



            <div className="border p-4 mb-3 rounded">

              Street light not working

              <div className="text-yellow-600">

                Pending

              </div>

            </div>



            <div className="border p-4 rounded">

              Water leakage issue

              <div className="text-green-600">

                Resolved

              </div>

            </div>


          </div>

        )}



      </div>


    </div>

  );

};

export default CitizenDashboard;