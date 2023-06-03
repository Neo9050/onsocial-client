import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./pages/Profile";

function App() {
	const user = localStorage.getItem("token");

	return (
    <>
		<Routes>
      
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/signup" exact element={<Signup />} />
			{user && <Route path="/profile" exact element={<Profile />} />}
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/profile" exact element={<Navigate replace to="/login" />}/>


		</Routes>
    </>
	);
}

export default App;

