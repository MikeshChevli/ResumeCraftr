import React, { Fragment, useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { AnimatePresence } from "framer-motion";
import { MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";
import { NoData } from "../assets";
import { useQuery } from "react-query";
import { getSavedResumes } from "../api";

const UserProfile = () => {
  const { data: user } = useUser();
  const [activeTab, setActiveTab] = useState("collection");
  const { data: templates, isLoading: tempIsLoading } = useTemplates();
  const navigate = useNavigate();
  const { data: savedResumes } = useQuery(["savedResumes"], () =>
    getSavedResumes(user?.uid)
  );
  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tempIsLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full flex items-center justify-start py-12">
      <div className="w-full h-72 bg-blue-50">
        <img
          src="https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="w-full h-full object-fill"
        />
        <div className="flex justify-center items-center flex-col gap-4">
          {user?.photoURL ? (
            <Fragment>
              <img
                src={user.photoURL}
                className="rounded-full w-30 h-30 border-2 border-white -mt-10 shadow-md object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
                alt=""
              />
            </Fragment>
          ) : (
            <Fragment>
              <div className="w-12 h-12 flex items-center justify-center rounded-md cursor-pointer relative bg-blue-700 shadow-sm">
                <p className="text-lg text-white capitalize">
                  {user?.email[0]}
                </p>
              </div>
            </Fragment>
          )}
          <p className="text-2xl font-bold capitalize text-center text-txtDark">
            {user?.displayName}
          </p>
        </div>
        <div className="flex items-center justify-center mt-12">
          <div
            onClick={() => setActiveTab("collection")}
            className={`px-4 py-2 rounded-md justify-center items-center flex gap-2 group cursor-pointer`}
          >
            <p
              className={`px-4 py-1 text-base text-txtPrimary group-hover:text-blue-500 rounded-full ${
                activeTab === "collection" && "text-blue-500 shadow-md bg-white"
              }`}
            >
              collections
            </p>
          </div>
          <div
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-md justify-center items-center flex gap-2 group cursor-pointer`}
          >
            <p
              className={`px-4 py-1 text-base text-txtPrimary group-hover:text-blue-500 rounded-full ${
                activeTab === "resume" && "text-blue-500 shadow-md bg-white"
              }`}
            >
              My Resume
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
          <AnimatePresence>
            {activeTab === "collection" && (
              <Fragment>
                {user?.collection.length > 0 && user?.collection ? (
                  <Fragment>
                    {templates && templates.length > 0 && (
                      <Fragment>
                        <AnimatePresence>
                          {templates
                            ?.filter((temp) =>
                              user?.collection?.includes(temp?._id)
                            )
                            .map((template, index) => (
                              <TemplateDesignPin
                                key={template._id}
                                data={template}
                                index={index}
                              />
                            ))}
                        </AnimatePresence>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto object-contain"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>
                )}
              </Fragment>
            )}
            {activeTab === "resume" && (
              <Fragment>
                {savedResumes?.length > 0 ? (
                  <Fragment>
                    {savedResumes && savedResumes.length > 0 && (
                      <Fragment>
                        <AnimatePresence>
                          {savedResumes.map((template, index) => (
                            <TemplateDesignPin
                              key={template._id}
                              data={template}
                              index={index}
                            />
                          ))}
                        </AnimatePresence>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <div className="col-span-12 w-full flex flex-col items-center justify-center gap-3">
                    <img
                      src={NoData}
                      className="w-32 h-auto object-contain"
                      alt=""
                    />
                    <p>No Data</p>
                  </div>
                )}
              </Fragment>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
