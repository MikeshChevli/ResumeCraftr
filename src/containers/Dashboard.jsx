/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { Filter, MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates.js";
import { AnimatePresence } from "framer-motion";
import { NoData } from "../assets/index.js";

const Dashboard = () => {
  const {
    data: templates,
    isError: tempError,
    isLoading: tempIsLoading,
    refetch: temp_refetch,
  } = useTemplates();

  if (tempIsLoading) {
    return <MainSpinner />;
  }

  return (
    <div className="w-full h-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      <Filter />
      {tempError ? (
        <Fragment>
          <p className="text-2xl text-txtPrimary font-semibold">
            Something went wrong! Please try again later
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            {templates && templates.length > 0 ? (
              <Fragment>
                <AnimatePresence>
                  {templates?.map((template, index) => (
                    <TemplateDesignPin
                      key={template._id}
                      data={template}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
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
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
