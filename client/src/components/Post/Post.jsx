import React, { useState, useEffect } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import axios from 'axios';
import { Image, CloudinaryContext } from 'cloudinary-react';



const CreatePostForm = () => {
  const [text, setText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        text: text,
        image: imageURL,
      };

      await axios.post('https://sumeshserver2222.onrender.com/api/posts', postData, axiosConfig);
      setText('');
      setImageURL('sjdflkjsdlfk');
      alert('Post created successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error creating post');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dzvapfiu'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dyz7kumjz/image/upload',
        formData
      );

      setImageURL(response.data.url);
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your post text"
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
        <label className="block">
          <span className="text-gray-700">
            <AiFillCamera />
          </span>
          <input
            type="file"
            accept="images/*"
            onChange={handleFileUpload}
          />
        </label>
        {imageURL && (
          <img src={imageURL} alt="Uploaded" style={{ width: '300px' }} />
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors"
        >
          Post
        </button>
      </form>
    </div>
  );
};


export default CreatePostForm;






