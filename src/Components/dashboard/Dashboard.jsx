import React  from 'react'
import Cards from './Components/Cards'
import Header from './Components/Header/Header';
import './dashboard.css'
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import VideoDisplay from './Components/VideoDisplay/VideoDisplay';
import Sidebar from './Components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import LinearColor from '../Loaders/LinearColor'

import VideoContainer from './Components/VideoContainer/VideoContainer';
import PlayerData from './Components/PlayerData/PlayerData';


export default function Dashboard() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [home, setHome] = useState(true);
    const [videoUploadData, setuploadVideoData] = useState()
    const [colorsData, setcolorsData] = useState()
    const [enableField, setenableField] = useState(false)
    const [image_data, setimageData] = useState(null)
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isupdate, setIsupdate] = useState(true)
    const [playerData, setplayerData] = useState(null)
    const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [isframe, setisframe] = useState(false)

      useEffect(() => {
        const getEmailFromToken = () => {
          const token = localStorage.getItem('token'); // Retrieve the token from localStorage (or wherever you store it)
          
          if (!token) {
            console.error('No token found');
            return null;
          }
          
          try {
            const decodedToken = jwtDecode(token);
            return decodedToken.email; // Assuming the token payload has the 'email' field
          } catch (error) {
            console.error('Invalid token:', error);
            return null;
          }
        };
        
        const email = getEmailFromToken();
        
        console.log(email)
        const fetchVideos = async () => {
          try {
            const response = await fetch(`http://localhost:3500/videos/${email}`);
            if (!response.ok) {
              // throw new Error('Error fetching videos');
            }

            const data = await response.json();
            console.log('Data received:', data);
            
            setVideos(data);
            setLoading(false);
          } catch (err) {
            console.log("this is the error",err.message)
            // setError(err.message);
            setLoading(false);
          }
        };
        if(home){
          setimageData(null)
        }
        fetchVideos();
      }, [isupdate]);

      useEffect(() => {
        // Enable field when image_data changes
        if (image_data) {
          setenableField(true);
        }
      
      }, [image_data]);

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

     

    const gradient = [{
        colors: ['#4158D0', '#C850C0', '#FFCC70'],
        deg: '43deg'
      },
      {

          colors: ['#8EC5FC','#8EC5FC','#E0C3FC'],
          deg: '62deg'
      },
      {
        colors:['#8BC6E', '#8BC6EC', '#9599E2'],
        deg:'69deg'
      }

    ];
    const svgElement = [(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
      </svg>
    ),

(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 transform rotate-90">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
  </svg>
  

)
]
function showVideos(){
    setHome(false);
}
async function applyDetectionAndTracking(element,TeamA, TeamB){
  setisLoading(true)
  setisframe(true)
  const ngrok = "https://68e5-35-201-140-245.ngrok-free.app"
  // Send the form data to the Flask backend
  const response = await fetch(`${ngrok}/process_frame`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        team_a_color: TeamA,
        team_b_color: TeamB,
      }),
  });
 console.log(response)
   // Check if the response is OK
   if (!response.ok) {
    const errorData = await response.text();
    console.log("things under bad response")
    console.error('Error from Flask backend:', errorData);
    return response.status(response.status).json({ error: errorData });
  }

  const data = await response.json();
  console.log('Upload successful:', data);
  setisLoading(false)
  setimageData(data.image_data)
  setenableField(false)
  element.disabled = false
  
  
  // console.log(res.json(data))
}
const extractFrame = async (videoUrl) => {
  setisLoading(true)
 
  try{
    
    const response = await fetch(`http://localhost:3500/${videoUrl}`, {
      method: 'POST',
     
    });
    const data = await response.json();
   //  console.log(data)
   //  setimageData(data.image_data)
   //  const imageData ={
   //   data: data.image_data
   // }
   setisLoading(false)
 setimageData(data.image_data)
    console.log(data.image_data)
  
  }  
  catch(err){
   console.log("this is error", err)
  }
 
 };
// async function startAnalyzing(PlayerId){
//   setIsAnalyzing(true); // Start progress bar
//     setProgress(0); // Reset progress
//   console.log("in analyzing", PlayerId)
//   const ngrok = "https://3b8d-34-56-168-176.ngrok-free.app"
//   // Send the form data to the Flask backend
//   const response = await fetch(`${ngrok}/process_player`, {
//     method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         player_id: PlayerId,
      
//       }),
//   });
//  console.log(response)
//    // Check if the response is OK
//    if (!response.ok) {
//     const errorData = await response.text();
//     console.log("things under bad response")
//     console.error('Error from Flask backend:', errorData);
//     setIsAnalyzing(false); // Hide progress bar on error
//     return response.status(response.status).json({ error: errorData });
//   }
//    // Simulate progress updates
//    for (let i = 1; i <= 100; i++) {
//     await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate time
//     setProgress(i);
//   }

//   const data = await response.json();
//   setplayerData(data)
//   console.log('Upload successful:', data);
//   setimageData(null)
//   setIsAnalyzing(false);
  
// }





// ---------------------------------+++++++++++++++++++++++--------------------------
async function startAnalyzing(PlayerId) {
  setIsAnalyzing(true); // Start progress bar
  setProgress(0); // Reset progress
  console.log("in analyzing", PlayerId);
  const ngrok = "https://68e5-35-201-140-245.ngrok-free.app";

  // Initialize variables for progress simulation
  let progress = 0;
  let progressInterval;

  try {
    // Start the fetch request without awaiting it
    const fetchPromise = fetch(`${ngrok}/process_player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_id: PlayerId,
      }),
    });

    // Start simulating progress updates
    progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 1; // Increment progress by 1-5%
      if (progress >= 95) {
        progress = 95; // Cap progress at 95% until fetch completes
        clearInterval(progressInterval); // Optional: Stop incrementing at 95%
      }
      setProgress(progress);
    }, 500); // Update every 500 milliseconds

    // Await the fetch request
    const response = await fetchPromise;

    // Clear the progress simulation
    clearInterval(progressInterval);

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error from Flask backend:', errorData);
      setIsAnalyzing(false); // Hide progress bar on error
      setProgress(0); // Reset progress
      return; // Exit the function
    }

    // Fetch completed, set progress to 100%
    setProgress(100);

    // Process the response data
    const data = await response.json();
    setplayerData(data);

    console.log('Upload successful:', data);
    setimageData(null);
  } catch (error) {
    console.error('An error occurred:', error);
    setIsAnalyzing(false);
    setProgress(0);
  } finally {
    // Ensure that progress bar is hidden after completion
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 80000); // Optional delay to let users see the 100% progress
  }
}



const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 2, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.9 },
};

return (
  <>
    <div className="dashboard h-screen">
      <div className="Header">
        <Header
          home={home}
          setHome={setHome}
          setimageData={setimageData}
          setenableField={setenableField}
          setisLoading={setisLoading}
          setplayerData={setplayerData}
        />
      </div>
      <div className="main_Dashboard flex">
        <Sidebar
          startAnalyzing={startAnalyzing}
          enableField={enableField}
          setimageData={setimageData}
          setenableField={setenableField}
          applyDetectionAndTracking={applyDetectionAndTracking}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
           <>
           <div className='loader'>

              <LinearColor></LinearColor>
              <div className="fetching-frame-indicator">
              <h2>Fetching frame...</h2>
            </div>
           </div>
            </>
          ) : isAnalyzing ? (
            <motion.div
              key="analyzing"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="progress-bar-container"
            >
              <>
           <div className='loader'>

             
              <div className="fetching-frame-indicator">
              <h2>Analyzing Video...</h2>
            </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>{progress}%</p>
           </div>
            </>
            </motion.div>
          ) : !home ? (
            playerData ? (
              <motion.div
                key="playerData"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PlayerData playerData={playerData} />
              </motion.div>
            ) : image_data ? (
              <motion.div
                key="videoDisplay"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >

                // {console.log("image data:",image_data)}
                <VideoDisplay data={image_data} isframe={isframe}/>
               </motion.div>
            ) : (
              <motion.div
                key="uploadedVideos"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="uploaded-videos-container flex flex-wrap h-screen flex-grow w-full"
              >
                <h2>Uploaded Videos</h2>
                {videos.length === 0 ? (
                  <p>No videos uploaded yet.</p>
                ) : (
                  <ul className="flex flex-wrap">
                    {videos.map((video, index) => (
                      <li key={index}>
                        <VideoContainer
                          videoUrl={video.url}
                          videoId={video.id}
                          setuploadVideoData={setuploadVideoData}
                          setimageData={setimageData}
                          extractFrame={extractFrame}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )
          ) : (
            <motion.div
              key="cards"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="cards flex justify-evenly h-screen"
            >
              <Cards
                gradientColors={gradient[0]}
                title="Upload Video"
                SVG={svgElement[0]}
                setHome={setHome}
                setVideoUrl={setVideoUrl}
                videoUpdated={setIsupdate}
              />
              <Cards
                gradientColors={gradient[1]}
                title="Uploaded Videos"
                SVG={svgElement[1]}
                onclick={() => {
                  setimageData(null)
                  setHome(false)}}
              />
             
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </>
);
}
