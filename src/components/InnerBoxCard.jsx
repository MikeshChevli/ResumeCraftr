import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const InnerBoxCard = ({ label, Icon, onHandle }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onClick={onHandle}
      className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon className="text-txtPrimary text-base" />
      <AnimatePresence>
        <motion.div className="px-3 py-2 rounded-md bg-gray-200 absolute -left-36 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45">
          <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InnerBoxCard;
