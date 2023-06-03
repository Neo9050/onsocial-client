import React from "react";
import Navbar from "../components/Common/Navbar";
import Post from "../components/Post/Post";
import PostList from "../components/Post/PostList";

const Home = () => {
  

  return (
    <>
      <div className="max-w-2xl mx-auto relative">
		<Navbar />
        <p className="mt-5">
		{" "}
          <a
            className="text-blue-600 hover:underline"
			href="/settings"
            target="_blank"
            rel="noopener noreferrer"
          >
            On Social pvt Ltd.
          </a>
          .
        </p>
        <br></br>
        <hr></hr>
        <Post/>
        <PostList/>
      </div>
    </>
  );
};

export default Home;



