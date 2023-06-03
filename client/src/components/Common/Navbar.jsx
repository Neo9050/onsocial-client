
import React, { useState } from "react";

const Navbar = () => {
  const [isToggleOpen, setToggleOpen] = useState(false);

  const handleToggleToggle = () => {
    setToggleOpen(!isToggleOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
  <nav className="bg-blue-300 border-b border-gray-200">
  <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2">
    <a href="/settings" className="flex items-center">
      <span className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors">onSocial</span>
    </a>
    <button
      data-collapse-toggle="mobile-menu"
      type="button"
      className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center"
      aria-controls="mobile-menu"
      aria-expanded="false"
    >
      {/* Mobile Menu Icon */}
    </button>
    <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
      <ul className="flex-col md:flex-row flex items-center md:space-x-4 mt-4 md:mt-0 md:text-lg md:font-semibold">
        <li>
          <a
            href="/"
            className="text-blue-700 hover:text-blue-900 focus:text-blue-900 focus:outline-none"
            aria-current="page"
          >
            Home
          </a>
        </li>
        <li className="relative">
          <button
            id="ToggleNavbarLink"
            onClick={handleToggleToggle}
            data-Toggle-toggle="ToggleNavbar"
            className="text-gray-700 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          >
            Toggle
          </button>
          {/* Toggle menu */}
          <div
            id="ToggleNavbar"
            className={`absolute bg-white text-base z-10 divide-y divide-gray-100 rounded shadow my-4 w-44 ${
              isToggleOpen ? "block" : "hidden"
            }`}
          >
            <ul className="py-1" aria-labelledby="ToggleNavbarLink">
              <li>
                <a
                  href="/settings"
                  className="hover:bg-gray-100 text-gray-700 block px-4 py-2"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/profile"
                  className="hover:bg-gray-100 text-gray-700 block px-4 py-2"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="hover:bg-gray-100 text-gray-700 block px-4 py-2"
                >
                </a>
              </li>
            </ul>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="hover:bg-gray-100 text-gray-700 block px-4 py-2"
              >
                Logout
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>



       
     
    </>
  );
};

export default Navbar;


// import React from "react";

// const Home = () => {
// 	const handleLogout = () => {
// 		localStorage.removeItem("token");
// 		window.location.reload();
// 	};

// 	return (
// 		<div >
// 			<nav >
// 				<h1>fakebook</h1>
// 				<button  onClick={handleLogout}>
// 					Logout
// 				</button>
// 			</nav>
// 		</div>
// 	);
// };

// export default Home;

