import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInOutWIthOpacity, scaleInOut, scaleSideInout } from "../animation";
import {
  BiFolderPlus,
  BiHeart,
  BiSolidFolderPlus,
  BiSolidHeart,
} from "react-icons/bi";
import useUser from "../hooks/useUser";
import { saveToCollection, saveToFavourits } from "../api";
import useTemplates from "../hooks/useTemplates";
import { useNavigate } from "react-router-dom";
const TemplateDesignPin = ({ data, index }) => {
  const navigate = useNavigate();
  const [isHoverred, setIsHoverred] = useState(false);

  const { data: user, refetch: userRefetch } = useUser();
  const { refetch: templateRefetch } = useTemplates();

  const handleRouteNavigation = () => {
    navigate(`/resumeDetail/${data?._id}`, { replace: true });
  };

  const addToCollection = async (event) => {
    event.stopPropagation();
    await saveToCollection(user, data);
    userRefetch();
  };

  const addToFavourits = async (event) => {
    event.stopPropagation();
    await saveToFavourits(user, data);
    templateRefetch();
  };

  return (
    <motion.div {...scaleInOut(index)} key={data?._id}>
      <div
        className="w-full rounded-md bg-gray-200 overflow-hidden relative h-[500px] 2xl:h[740px]"
        onMouseEnter={() => setIsHoverred(true)}
        onMouseLeave={() => setIsHoverred(false)}
      >
        <img
          className="w-full h-full object-cover"
          src={data?.imageUrl}
          alt=""
        />
        <AnimatePresence>
          {isHoverred && (
            <motion.div
              {...FadeInOutWIthOpacity}
              onClick={handleRouteNavigation}
              className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
            >
              <div className="flex flex-col items-end justify-start w-full gap-8">
                <InnerBoxCard
                  lable={
                    user?.collection?.includes(data?._id)
                      ? "Added to Collection"
                      : "Add to Collection"
                  }
                  Icon={
                    user?.collection?.includes(data?._id)
                      ? BiSolidFolderPlus
                      : BiFolderPlus
                  }
                  onhandle={addToCollection}
                />
                <InnerBoxCard
                  lable={
                    data?.favourits?.includes(user?.uid)
                      ? "Added to Favourits"
                      : "Add to Favourits"
                  }
                  Icon={
                    data?.favourits?.includes(user?.uid)
                      ? BiSolidHeart
                      : BiHeart
                  }
                  onhandle={addToFavourits}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TemplateDesignPin;

const InnerBoxCard = ({ lable, Icon, onhandle }) => {
  const [isHoverred, setIsHoverred] = useState(false);
  return (
    <div
      onClick={onhandle}
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative"
      onMouseEnter={() => setIsHoverred(true)}
      onMouseLeave={() => setIsHoverred(false)}
    >
      <Icon className="text-txtPrimary text-base" />
      <AnimatePresence>
        {isHoverred && (
          <motion.div
            {...scaleSideInout}
            className="px-3 py-2 rounded-md bg-gray-200 absolute -left-36 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45"
          >
            <p className="text-sm text-txtPrimary whitespace-nowrap">{lable}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
