/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { Filter, MainSpinner, TemplateDesignPin } from "../components";
import useTemplates from "../hooks/useTemplates.js";
import { AnimatePresence } from "framer-motion";

const HomeContainer = () => {
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
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
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
              <Fragment>
                <p className="text-2xl text-txtPrimary font-semibold">
                  No templates found! Please try again later.
                  <br />
                  If the problem persists, please contact us at
                  <br />
                  <a href="mailto:XXXXXXXXXXXXXXXXXXXXXXX">
                    XXXXXXXXXXXXXXXXXXXXXXX
                  </a>
                  <br />
                  or
                  <br />
                  <a href="tel:0000000000000">+91 9876543210</a>
                  <br />
                  for any help.
                  <br />
                  <br />
                  Thank you for using Resume Craftr!
                  <br />
                  <br />
                  Happy Resume Crafting
                  <br />
                  <br />
                  <p className="text-sm text-txtPrimary font-semibold">
                    Made with ❤️ by
                    <br />
                    <a
                      href="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                      className="text-txtPrimary font-semibold"
                    >
                      Mikesh-dev
                    </a>
                    <br />
                  </p>
                </p>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default HomeContainer;
