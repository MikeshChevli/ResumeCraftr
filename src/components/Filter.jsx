import React, { useState } from "react";
import { MdLayersClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { FiltersData } from "../utils/Helpers";
import useFilters from "../hooks/useFilters";
import { useQueryClient } from "react-query";
import { slideUpDownWithScale } from "../animation";

const Filter = () => {
  const [isClearHover, setIsClearHover] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { data: filterData, isLoading, isError } = useFilters();

  const queryClient = useQueryClient();

  const handleFilterValue = (value) => {
    queryClient.setQueryData("globleFilters", {
      ...queryClient.getQueryData("globleFilters"),
      searchTerm: value,
    });
  };

  const clearFilter = () => {
    queryClient.setQueryData("globleFilters", {
      ...queryClient.getQueryData("globleFilters"),
      searchTerm: "",
    });
  };

  return (
    <div className="w-full flex items-center justify-start py-2">
      <div
        className="border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative "
        onMouseEnter={() => setIsClearHover(true)}
        onMouseLeave={() => setIsClearHover(false)}
        onClick={clearFilter}
      >
        <MdLayersClear className="text-xl" />

        <AnimatePresence>
          {isClearHover && (
            <motion.div
              {...slideUpDownWithScale}
              className="absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1"
            >
              <p className="whitespace-nowrap text-xs">Clear all</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex items-center justify-start overflow-x-scroll gap-2 scrollbar-none">
        {FiltersData &&
          FiltersData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleFilterValue(item.value)}
              className={`border border-gray-300 rounded-md px-4 py-2 cursor-pointer group hover:shadow-md
              ${
                filterData?.searchTerm === item.value && "bg-gray-300 shadow-md"
              }
              `}
            >
              <p className="text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap">
                {item.label}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
