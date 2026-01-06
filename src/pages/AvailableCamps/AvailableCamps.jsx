import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import CampCard from "../../components/CampCard/CampCard";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";

const AvailableCamps = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("participantCount");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState("lg:grid-cols-3"); // Default is 3 columns for larger screens
  const limit = 10;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["camps", search, sortBy, order, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/camps?search=${search}&sortBy=${sortBy}&order=${order}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    setSearch(e.target.value);
    refetch();
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    refetch();
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  const toggleLayout = () => {
    setLayout((prevLayout) =>
      prevLayout === "xl:grid-cols-4" ? "xl:grid-cols-3" : "xl:grid-cols-4"
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-accent relative">
        <div className="w-[90%] min-[1920px]:max-w-[108rem] mx-auto pt-36 pb-24 text-center lg:text-left text-white z-10">
          <motion.p
            className="text-lg mb-2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Home / Available Camps
          </motion.p>
          <motion.h2
            className="text-4xl font-bold"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Available Camps
          </motion.h2>
        </div>
        <div className="h-full absolute top-0 right-0 z-0">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full"
            src="/aid-bg.webp"
          />
        </div>
      </div>

      {/* Search & Sorting Controls */}
      <motion.div
        className="w-[90%] min-[1920px]:max-w-[108rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pt-10 sm:pt-14 md:pt-16 xl:pt-20"
        layout
      >
        <input
          type="text"
          placeholder="Search camps..."
          value={search}
          onChange={handleSearch}
          className="w-full input input-bordered transition-all duration-200"
        />
        <select
          value={sortBy}
          onChange={handleSort}
          className="w-full select select-bordered md:max-w-xs transition-all duration-200"
        >
          <option value="participantCount">Most Registered</option>
          <option value="campFees">Camp Fees</option>
          <option value="campName">Alphabetical Order</option>
        </select>
        <select
          value={order}
          onChange={handleOrder}
          className="w-full select select-bordered md:max-w-xs transition-all duration-200"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </motion.div>

      {/* Layout Toggle Button for Large Screens */}
      <div className="w-[90%] min-[1920px]:max-w-[108rem] mx-auto flex justify-end pt-4">
        <button
          className="hidden xl:block btn btn-outline hover:text-white btn-accent"
          onClick={toggleLayout}
        >
          Toggle Layout
        </button>
      </div>

      {/* Camps Section */}
      <motion.div
        className="w-[90%] min-[1920px]:max-w-[108rem] mx-auto py-14"
        layout
      >
        {isFetching ? (
          <div className="w-full h-[40rem] flex items-center justify-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : data?.camps?.length > 0 ? (
          <motion.div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${layout} gap-8`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layout
          >
            {data.camps.map((camp) => (
              <motion.div
                key={camp._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CampCard camp={camp} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>No camps available at the moment.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        className="flex justify-center gap-2 pb-10 sm:pb-14 md:pb-16 xl:pb-20"
        layout
      >
        {[...Array(data?.totalPages)].map((_, index) => (
          <motion.button
            key={index}
            className={`btn ${
              page === index + 1 ? "btn-accent btn-white" : "btn-outline"
            } mx-1`}
            onClick={() => handlePageChange(index + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default AvailableCamps;
