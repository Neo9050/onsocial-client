import React,{ useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
	const [data, setData] = useState({
		
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://sumeshserver2222.onrender.com/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (

		<div className="bg-blue-100 flex items-center justify-center h-screen">
			<div className="container h-screen-75 bg-white w-full lg:w-4/5 border border-gray-300 rounded flex flex-wrap">
			<div className="w-full lg:w-1/2 flex items-center justify-center">
  <div className="max-w-md bg-theme-blue p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back</h1>
    <Link to="/login">
      <button type="button" className="w-full bg-white text-theme-blue py-2 px-4 rounded hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
        Log In
      </button>
    </Link>
  </div>
</div>
				<div className="w-full lg:w-1/2 " >
					<div className="form-wrapper  flex items-center justify-center h-full">
						<div className="w-full ">
					 <form  onSubmit={handleSubmit}>
						<div className="form-caption  text-gray-700 text-center ">
							<h1 className="block text-sm">Sign Up</h1>
						    <h1 className=" block text-4xl font-semibold">Create Account</h1>

						</div>

						<div className="form-element">
						<label className=" ml-36 mt-8 block w-full lg:w-2/4">
							<span className="text-gray-700">Full-Name</span>
						<input className="w-full p-2 border border-gray-300 focus:outline-none active:outline-none focus:border-gray active:border-gray-500"
							type="text"
							placeholder=" Name"
							name="name"
							onChange={handleChange}
							value={data.name}
							required
							
						/>
						</label>

						<label className="mt-4 ml-36 block w-full lg:w-2/4">
						<span className="text-gray-700">Email</span>
						
						<input
						    className="w-full p-2 border border-gray-300 focus:outline-none active:outline-none focus:border-gray active:border-gray-500"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
						
						/>
						</label>

						<label className=" ml-36 mt-4 block w-full lg:w-2/4">
						<span className="text-gray-700">Password</span>
						<input
						    className="w-full p-2 border border-gray-300 focus:outline-none active:outline-none focus:border-gray active:border-gray-500"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
						
						/>
						</label>
						</div>
						{error && <div className={""}>{error}</div>}
						<div className=" ml-36 form-element w-full lg:w-1/2">
						<button type="submit"  className="  mt-12 w-full bg-theme-blue border border-theme-blue  p-2 hover:bg-theme-blue-dark focus:outline-none transition-all active:outline-none focus:bg-theme-blue-dark active:border-gray-500">
							Sign Up
						</button>
						</div>
					</form>
					
					</div>
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Signup;
