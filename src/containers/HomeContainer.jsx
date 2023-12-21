import React from "react";
import { awardLeft, awardRight } from "../assets";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

const HomeContainer = () => {
  return (
    <div className="flex justify-start items-center w-full h-screen flex-col px-12 py-12">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="w-full h-full gap-8 flex col-span-1 lg:col-span-1 flex-col justify-start items-start">
          <div className="flex flex-row gap-3">
            <div className="flex flex-row gap-0 mx-2 my-3 justify-start items-end">
              <img
                className="h-10 w-10 text-txtPrimary"
                src={awardLeft}
                alt=""
              />
              <p className="text-base font-bold text-txtPrimary">
                Awesome Resumes
              </p>
              <img
                className="h-10 w-10 text-txtPrimary"
                src={awardRight}
                alt=""
              />
            </div>
            <div className="flex flex-row gap-0 mx-2 my-3 justify-start items-end">
              <img
                className="h-10 w-10 text-txtPrimary"
                src={awardLeft}
                alt=""
              />
              <p className="text-base font-bold text-txtPrimary">
                Live Updates
              </p>
              <img
                className="h-10 w-10 text-txtPrimary"
                src={awardRight}
                alt=""
              />
            </div>
          </div>
          <p className="text-txtPrimary lg:text-9xl text-5xl font-extrabold px-3 py-4">
            Unleash your Full Potential
          </p>
          <p className="text-txtPrimary text-3xl lg:text-4xl font-extrabold  px-3 py-4">
            Create your resume with our unique templates and live interaction
          </p>
          <Link
            className="lg:w-1/2 w-full px-4 gap-3 py-3 h-20 rounded-md flex group items-center justify-center bg-gray-400 hover:bg-gray-500 group"
            to={"/dashboard"}
          >
            <p className="gap-2 text-white text-xl font-semibold flex flex-row group-hover:scale-105 ">
              Get Started - It's free
              <MdArrowOutward className="text-3xl" />
            </p>
          </Link>
        </div>
        <div
          className="w-full h-full gap-8 flex col-span-1 lg:col-span-1 flex-col justify-start items-start"
          style={{
            background:
              "url(https://plus.unsplash.com/premium_photo-1676210736121-3994f53bb493?q=80&w=1898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "fill",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HomeContainer;
