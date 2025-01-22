import React, {useState} from 'react'
import './Styles.css'
export default function Sidebar({enableField, setimageData, setenableField, startAnalyzing, applyDetectionAndTracking}) {
    const [PlayerId, setPlayerId] = useState();
    const [TeamA, setTeamA] = useState("");
    const [TeamB, setTeamB] = useState("");

    if(enableField){
      document.getElementById('TeamA').disabled = false
      document.getElementById('TeamB').disabled = false
      document.getElementById('detect').diabled = false
    }
   
  
  return (
    <div className='sidebar mr-4 p-6 border-r-2 shadow-lg text-gray-700 font-extrabold'>
        
        <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="Team_A_Color" className="block mb-1">Team A Color</label>
          <input
          disabled
            type="text"
            id="TeamA"
            value={TeamA}
            onChange={(e) => setTeamA(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Team_B_Color" className="block mb-1">Team B Color:</label>
          <input
          disabled
            type="text"
            id="TeamB"
            value={TeamB}
            onChange={(e) => setTeamB(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <button id='detect' type='button' onClick={()=>{
          document.getElementById('TeamA').disabled=true
          document.getElementById('TeamB').disabled=true
          setTeamA("")
          setTeamB("")
          applyDetectionAndTracking(document.getElementById('PlayerId'),TeamA, TeamB)
         
         
        }} className=' w-40 p-2 rounded-md bg-blue-600 text-white font-bold shadow-md
             hover:bg-blue-700'>
Start Detect and Track
            </button>
          </form>
        <div className="mb-4">
          <label htmlFor="PlayerId" className="block mb-1">Player ID:</label>
          <input
          disabled
            type="number"
            id="PlayerId"
            value={PlayerId}
            onChange={(e) => setPlayerId(e.target.value)}
            
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
        </div>
        <div>
            <button onClick={(e)=>{
              setPlayerId("")
              document.getElementById('PlayerId').disabled = true
              document.getElementById('TeamA').disabled = true
              document.getElementById('TeamB').disabled = true
              document.getElementById('detect').disbled = true
              startAnalyzing(PlayerId)}} className=' w-36 p-2 rounded-md bg-blue-600 text-white font-bold shadow-md
             hover:bg-blue-700'>
Start Analysing
            </button>
        </div>
        
    </div>
  )
}
