import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
import './Styles.css'
import VideoContainer from './VideoContainer/VideoContainer';
import { videoContext } from '../../context/context';
const Cards = ({ gradientColors, title, SVG='', setHome='', setVideoUrl='', onclick=null, videoUpdated=null}) => {
    const gradientStyle = {
        background: `linear-gradient(${gradientColors.deg}, ${gradientColors.colors.join(', ')})`
      };
      const [videoFile, setVideoFile] = useState("khuriam");
      const fileInputRef = useRef(null);
      const [message, setMessage] = useState('');
      const handleClick = () => {
        fileInputRef.current.click(); 
      };
      const handleFileChange = async (event) => {
       const file = event.target.files[0]
        setVideoFile(file);
       
        const formData = new FormData();  
        formData.append('video', file);
       
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3500/uploadVideo', {
        method: 'POST',
        headers:{
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      // console.log("this is response",response)
      const result = await response.json();

      if (response.ok) {  
        videoUpdated(prev=>!prev)
        setMessage('Video uploaded successfully!');
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('An error occurred while uploading the video.');
    }
       
       
        // setHome(false)
      };
  
    return (
       

      <div className="card" style={gradientStyle}>
        <h2 className="card-title">{title}</h2>
        <input type="file"  ref={fileInputRef} onChange={handleFileChange} className='hidden'/>
        <button onClick={onclick?onclick: handleClick}>
          {SVG}
</button>
      {/* {videoUrl && <VideoContainer videoUrl={videoUrl} />} */}
      </div>
       
    );
  };
  
  Cards.propTypes = {
    gradientColors: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  };
  
  export default Cards;
 
