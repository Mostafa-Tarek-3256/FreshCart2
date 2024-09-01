import React, { useContext, useState } from 'react';
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="z-50 border-gray-200 bg-gray-200 fixed top-0 right-0 left-0">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} width="160 px" className="h-8" alt="Logo" />
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navbar Menu */}
        <div className={`flex-grow ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-center`}>
          <ul className={`flex gap-6 ${isMenuOpen ? 'flex-col' : 'flex-row'}`}>
            {userLogin ? (
              <>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/Cart"}>Cart</Link></li>
                <li><Link to={"/WishList"}>WishList</Link></li>
                <li><Link to={"/Categories"}>Categories</Link></li>
                {/* <li><Link to={"/Brands"}>Brands</Link></li> */}
              </>
            ) : (
              <div className='flex flex-col md:flex-row gap-6'>
                <li><Link to={"/Login"} className="text-sm">Login</Link></li>
                <li><Link to={"/Register"} className="text-sm">Register</Link></li>
              </div>
            )}
          </ul>
        </div>

        <div className='flex items-center space-x-6 rtl:space-x-reverse'>
          <div className='icons flex gap-5'>
            <FontAwesomeIcon className='text-black' icon={faFacebook} />
            <FontAwesomeIcon className='text-black' icon={faFacebookMessenger} />
            <FontAwesomeIcon className='text-black' icon={faYoutube} />
          </div>
          {userLogin && <Link onClick={signout} className="text-sm">Sign Out</Link>}
        </div>
      </div>
    </nav>
  );
}
