import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getTemplateDetails, saveToCollection, saveToFavourits } from "../api";
import { MainSpinner, TemplateDesignPin } from "../components";
import { FaHouse } from "react-icons/fa6";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderPlus,
  BiSolidHeart,
} from "react-icons/bi";
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInOutWIthOpacity } from "../animation";

const TemplateDesignPinDetails = () => {
  const { templateId } = useParams();
  const [isHover, setIsHover] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { data, isError, isLoading, refetch } = useQuery(
    ["timemplate", templateId],
    () => getTemplateDetails(templateId)
  );

  const { data: user, refetch: userRefetch } = useUser();
  const {
    data: templates,
    refetch: templateRefetch,
    // eslint-disable-next-line no-unused-vars
    isLoading: isTemplatesLoading,
  } = useTemplates();

  const addToCollection = async (event) => {
    event.stopPropagation();
    await saveToCollection(user, data);
    userRefetch();
  };

  const addToFavourits = async (event) => {
    event.stopPropagation();
    await saveToFavourits(user, data);
    templateRefetch();
    refetch();
  };

  if (isLoading) return <MainSpinner />;

  if (isError) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">
          Error While fetching data...Please try again later
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-start px-4 py-6">
      <div className="w-full flex items-center pb-6 gap-2">
        <Link
          className="flex items-center justify-center gap-2 text-txtPrimary"
          to={"/"}
        >
          <FaHouse /> Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">
          <img
            className="w-full h-auto object-contain rounded-md"
            src={data?.imageUrl}
            alt=""
          />
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-lg text-txtPrimary font-semibold">
                {data?.name}
              </p>
              {data?.favourits?.length > 0 && (
                <div className="flex items-center justify-center gap-1">
                  <BiSolidHeart className="text-base text-red-500" />
                  <p className="text-base text-txtPrimary font-semibold">
                    {data?.favourits?.length} likes
                  </p>
                </div>
              )}
            </div>
            {user && (
              <div className="flex items-center justify-center gap-3">
                {user?.collection?.includes(data?._id) ? (
                  <Fragment>
                    <div
                      onClick={addToCollection}
                      className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidFolderPlus className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary font-semibold whitespace-nowrap">
                        Remove from collection
                      </p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div
                      onClick={addToCollection}
                      className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiFolderPlus className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary font-semibold whitespace-nowrap">
                        Add to collection
                      </p>
                    </div>
                  </Fragment>
                )}

                {data?.favourits?.includes(user?.uid) ? (
                  <Fragment>
                    <div
                      onClick={addToFavourits}
                      className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiSolidHeart className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary font-semibold whitespace-nowrap">
                        Remove from favourits
                      </p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div
                      onClick={addToFavourits}
                      className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                      <BiHeart className="text-base text-txtPrimary" />
                      <p className="text-sm text-txtPrimary font-semibold whitespace-nowrap">
                        Add to favourits
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4 w-full px-3 flex flex-col items-start justify-start gap-4">
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="w-full h-72 bg-blue-200 items-center rounded-md overflow-hidden relative"
            style={{
              background: `url(https://images.unsplash.com/photo-1695634621295-8f83685a35bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
              backgroundSize: "contain",
              backgroundPositionX: "center",
              backgroundRepeat: "no-repeat",
              objectFit: "fill",
            }}
          >
            <AnimatePresence>
              {isHover && (
                <motion.div
                  {...FadeInOutWIthOpacity}
                  className="flex absolute inset-0 items-center justify-center bg-[rgba(0,0,0,0.4)]"
                >
                  <Link
                    to={"/"}
                    className="px-4 py-2 rounded-md border border-gray-50 text-white hover:scale-105 cursor-pointer"
                  >
                    Discover More
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {user && (
            <Link
              className="w-full px-4 py-3 rounded-md flex group items-center justify-center bg-emerald-500 hover:bg-emerald-600 group"
              to={`/resume/${data?.name}?templateId=${templateId}`}
            >
              <p className="text-white font-semibold group-hover:scale-105 text-lg">
                Edit this Template
              </p>
            </Link>
          )}

          <div className="w-full flex items-center justify-start flex-wrap gap-2">
            {data?.tags?.map((tag, index) => (
              <p
                key={index}
                className="text-sm border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap text-txtPrimary font-semibold
                hover:bg-gray-300 cursor-pointer"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
      {templates?.filter((temp) => temp._id !== data?._id)?.length > 0 && (
        <div className="w-full py-6 flex flex-col items-start justify-start gap-4">
          <p className="text-lg text-txtPrimary font-semibold">
            You might also like
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <Fragment>
              <AnimatePresence>
                {templates
                  ?.filter((temp) => temp._id !== data?._id)
                  .map((template, index) => (
                    <TemplateDesignPin
                      key={template._id}
                      data={template}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </Fragment>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesignPinDetails;
