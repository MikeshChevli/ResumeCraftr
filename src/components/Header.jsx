import { useQueryClient } from "react-query";
import React, { Fragment, useState } from "react";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import { HiOutlineLogout } from "react-icons/hi";
import { FadeInOutWIthOpacity, SlideDownMenu } from "../animation";
import { auth } from "../config/firebase.config";
import { adminId } from "../utils/Helpers";
import useFilters from "../hooks/useFilters";

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, isError } = useUser();
  const { data: filterData } = useFilters();

  const [isMenu, setIsMenu] = useState(false);

  const queryClient = useQueryClient();

  const handleLogOut = async () => {
    await auth.signOut().then(() => {
      queryClient.setQueryData("user", null);
    });
  };

  const handleSearchTerm = (event) => {
    const searchTerm = event.target.value;

    queryClient.setQueryData("globleFilters", {
      ...queryClient.getQueryData("globleFilters"),
      searchTerm: searchTerm,
    });
  };

  const clearFilter = () => {
    queryClient.setQueryData("globleFilters", {
      ...queryClient.getQueryData("globleFilters"),
      searchTerm: "",
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 sticky lg:px-8 border-b border-gray-300 bg-bgPrimary z-50 gap-4 top-0">
      <Link to={"/"}>
        <img src={Logo} className="w-10 h-auto object-contain" alt="" />
      </Link>
      <div className="flex-1 border border-gray-300 px-4 py-1 rounded-md bg-gray-200 flex items-center justify-between">
        <input
          type="text"
          value={filterData?.searchTerm ? filterData.searchTerm : ""}
          placeholder="Search here... "
          className="flex-1 bg-transparent h-10 text-base font-semibold outline-none border-none"
          onChange={handleSearchTerm}
        />
        <AnimatePresence>
          {filterData?.searchTerm.length > 0 && (
            <motion.div
              onClick={clearFilter}
              {...FadeInOutWIthOpacity}
              className="w-8 h8 flex items-center justify-center bg-gray-300 rounded-md cursor-pointer active:scale-95 duration-150"
            >
              <p className="text-2xl text-black">x</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#498fcd" size={80} />
        ) : (
          <Fragment>
            {data ? (
              <motion.div
                {...FadeInOutWIthOpacity}
                className="relative"
                onClick={() => setIsMenu(!isMenu)}
              >
                {data?.photoURL ? (
                  <div className="w-12 h-12 flex items-center justify-center rounded-md relative cursor-pointer">
                    <img
                      src={data.photoURL}
                      className="rounded-md w-full h-full object-cover border-2 border-white shadow-md"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer relative bg-blue-700 shadow-sm">
                    <p className="text-lg text-white capitalize">
                      {data?.email[0]}
                    </p>
                  </div>
                )}
                <AnimatePresence>
                  {isMenu && (
                    <motion.div
                      {...SlideDownMenu}
                      className="absolute top-12 px-4 py-3 right-0 gap-3 w-64 p-12 rounded-md flex flex-col items-center justify-center bg-white shadow-md"
                      onMouseLeave={() => setIsMenu(false)}
                    >
                      {data?.photoURL ? (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full relative cursor-pointer">
                          <img
                            src={data.photoURL}
                            className="rounded-full w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full cursor-pointer relative bg-blue-700 shadow-sm">
                          <p className="text-lg text-white capitalize">
                            {data?.email[0]}
                          </p>
                        </div>
                      )}
                      {data?.displayName && (
                        <p className="text-3xl text-txtDark">
                          {data.displayName}
                        </p>
                      )}
                      <div className="w-full flex flex-col items-start gap-8 pt-6">
                        <Link
                          className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                          to={`/profile/${data?.uid}`}
                        >
                          My Account
                        </Link>
                        {adminId.includes(data?.uid) && (
                          <Link
                            className="text-txtLight hover:text-txtDark text-base whitespace-nowrap"
                            to={"/template/create"}
                          >
                            Add New Template
                          </Link>
                        )}
                      </div>

                      <div
                        className="px-2 py-2 border-t w-full flex items-center justify-between border-gray-300 group cursor-pointer"
                        onClick={handleLogOut}
                      >
                        <p className="text-txtLight group-hover:text-txtDark">
                          sign Out
                        </p>
                        <HiOutlineLogout className="text-txtLight group-hover:text-txtDark" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button
                  className="px-4 py-2 rounded-md border border-gray-300 bg-gray-200 hover:shadow-md active:scale-95 duration-150"
                  type="button"
                  {...FadeInOutWIthOpacity}
                >
                  Login
                </motion.button>
              </Link>
            )}
          </Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
