import React from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bottom-0 flex items-center justify-between border-t border-gray-300">
      <div className=" flex items-center justify-center gap-3 py-3">
        <img src={Logo} className="w-8 h-auto object-contain" alt="" />
        <p>ResumeCraftr</p>
      </div>
      <div className=" flex items-center justify-center gap-3 py-6">
        <Link to={"/"} className="text-blue-700">
          Home
        </Link>
        <Link to={"/"} className="text-blue-700">
          Contact
        </Link>
        <Link to={"/"} className="text-blue-700 whitespace-nowrap">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
