// src/VideoDisplay.js
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './VideoDisplay.css'; // Import the CSS for styling
import { useLocation } from 'react-router-dom';
import frame from '../../../../assets/extractedframe.jpg'
const VideoDisplay = ({data, isframe}) => {
  // const location = useLocation();
  // const { data } = location.state || {};
  console.log("this is image data:", data)
  const [message, setMessage] = useState('');
  const [teamAColor, setTeamAColor] = useState('#ff0000'); // Default to red
  const [teamBColor, setTeamBColor] = useState('#0000ff'); // Default to blue
  const [showTeamAColorPicker, setShowTeamAColorPicker] = useState(false);
  const [showTeamBColorPicker, setShowTeamBColorPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data to send to the backend
    // const data = {
    //   message,
    //   teamAColor,
    //   teamBColor,
    //   // imageData, // Include the image data if needed
    // };

    // Example: Sending data to the backend via fetch
    // fetch('http://<YOUR_BACKEND_URL>/process', { // Replace with your actual backend URL
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Success:', data);
    //     // Handle success (e.g., display a success message)
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     // Handle error (e.g., display an error message)
    //   });
  };

  return (
    <div className="video-display-container">
      <h2>Extracted Frame</h2>
      <div className="image-container">
        {
          !isframe ? <img src={frame} alt="Extracted Frame" /> :  <img src={`data:image/jpeg;base64,${data}`} alt="Analyzed Video" />
        }
        {/* <img src={`data:image/jpeg;base64,${data}`} alt="Analyzed Video" />  */}
        <img src={frame} alt="Analyzed Video" /> 
      </div>
     
    </div>
  );
};

export default VideoDisplay;
