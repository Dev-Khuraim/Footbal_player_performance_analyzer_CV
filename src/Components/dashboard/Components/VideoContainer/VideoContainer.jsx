import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { stringify } from 'postcss';
export default function VideoContainer({ videoUrl, videoId, setuploadVideoData, setimageData, extractFrame }) {
  const navigate = useNavigate();
  // const [imageData, setimageData]  = useState({}) 
  
 
  const handleDeleteVideo = async () => {
    console.log("here url is",videoUrl);
    try {
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
     
       // Encode URL if it contains special characters
      const response = await fetch(`http://localhost:3500/users/${email}/videos/${videoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete video');
      }

      console.log('Video deleted:', videoId);
      onDelete(videoId); // Call the onDelete prop to update the parent component
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return videoUrl ? (
    <div className='relative p-8 border rounded-md shadow-lg'>
      {/* Delete Button */}
      <button
        onClick={handleDeleteVideo}
        className='absolute top-0 right-0 p-2 text-gray-500 hover:text-red-700'
        style={{ fontSize: '24px', padding: '8px', lineHeight: '1' }}
        title="Delete Video"
      >
        &times;
      </button>

      <video controls className='w-64 h-64'>
        <source src={`http://localhost:3500/${videoUrl}`} type='video/avi' />
        Your browser does not support the video tag.
      </video>
      
      <button
        className='w-64 p-4 bg-gradient-to-r from-pink-100 to-blue-200 mt-2 rounded-md'
        onClick={()=>extractFrame(videoUrl)}
      >
        Extract Frame
      </button>
    </div>
  )  : (
    <div className='flex items-center justify-center h-screen'>
      <h2 className='text-gray-400'>No videos uploaded yet.</h2>
    </div>
  );
}
