
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineDelete } from 'react-icons/ai';

import Navbar from '../components/Common/Navbar';
const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Call fetchPosts only if the token and userId are available
    if (storedToken && userId) {
      fetchPosts(userId);
    }

    console.log("store", storedToken);
    
  }, [userId]);

  useEffect(() => {
    // Extract the user ID from the token and set it to the state
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      setUserId(decodedToken._id);
    }
  }, [token]);

  const decodeToken = (token) => {
    // Manually decode the token to extract the necessary information
    // Replace this with your own logic to decode the token
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      try {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    return null;
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const ImageDisplay = ({ base64Image }) => {
    return <img src={base64Image} alt="Pic" width={500}/>;
  };

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`https://sumeshserver2222.onrender.com/api/posts/user/${userId}`, axiosConfig);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `https://sumeshserver2222.onrender.com/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchPosts(userId); // Call fetchPosts after deleting the post
      } else {
        console.log("Failed to delete post:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="bg-white p-4 shadow flex flex-col items-center">
      
  <h2 className="text-2xl font-bold mb-4">My Posts</h2>
  {posts.map((post) => (
    <div key={post._id} className="mb-4">
      <p className="text-gray-800 mb-2 border-b border-gray-300 font-bold pb-2">{post.text}</p>
      {post.image && (
        <div className="relative">
          <ImageDisplay base64Image={post.image} />
          <div className="mt-2">
            <button
              onClick={() => deletePost(post._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              <AiOutlineDelete/>
            </button>
          </div>
        </div>
      )}
    </div>
  ))}
</div>
</>


  );
};


export default Profile;



