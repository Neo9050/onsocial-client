import React, { useEffect, useState } from "react";
import axios from "axios";


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState({}); // State to manage showing/hiding comment input for each post

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(storedToken);
  }, []);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}` // Add the token to the Authorization header
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const ImageDisplay = ({ base64Image }) => {
    return (
      <img
        src={base64Image}
        alt="Pic"
        className="shadow-lg border-4 border-gray-200"
        width={1000}
      />
    );
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://sumeshserver2222.onrender.com/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await axios.post(
        `https://sumeshserver2222.onrender.com/api/posts/${postId}/like`,
        null,
        axiosConfig
      );
      if (response.data.success) {
        fetchPosts(); // Fetch the updated post list after successful like
      } else {
        console.log("Failed to like post:", response.data.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const postComment = async (postId) => {
    try {
      const response = await axios.post(
        `https://sumeshserver2222.onrender.com/api/posts/${postId}/comments`,
        { text: text },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        fetchPosts();
        setText("");
        setShowCommentInput((prevState) => ({
          ...prevState,
          [postId]: false // Hide the comment input for the specific post after posting
        }));
      } else {
        console.log("Failed to post comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="mb-4 border border-gray-300 rounded p-4">
          <div className="border-b border-gray-400 pb-2 mb-4">
            <p className="text-gray-800 text-lg font-bold">{post.text}</p>
          </div>

          {post.image && <ImageDisplay base64Image={post.image} />}

          <br />
          <button
            onClick={() => likePost(post._id)}
            className="mt-2 py-1 px-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors flex items-center"
          >
            <span>👍</span>
            <span className="ml-1 text-gray-600">{post.likes.length}</span>
          </button>

          <div className="mt-4 flex space-x-2">
            {!showCommentInput[post._id] && (
              <button
                onClick={() =>
                  setShowCommentInput((prevState) => ({
                    ...prevState,
                    [post._id]: true // Show the comment input for the specific post
                  }))
                }
                className="py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors flex items-center"
              >
                Post Comment
              </button>
            )}
            {showCommentInput[post._id] && (
              <>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Add your comment..."
                />
                <button
                  onClick={() => postComment(post._id)}
                  className="py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-colors"
                >
                  Submit
                </button>
              </>
            )}
          </div>

          {showCommentInput[post._id] && (
            <>
              <h3 className="mt-4 text-lg font-bold">Comments</h3>
              {post.comments.map((comment) => (
                <div key={comment._id} className="ml-4 mt-2">
                  <p className="font-bold text-gray-800">{comment.username}:</p>
                  <p className="ml-2 text-gray-600">{comment.text}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;

