import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import RegistrationModal from "./RegistrationModal";

const CampDetails = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();

  const { data: camp = {}, isLoading } = useQuery({
    queryKey: ["campDetails", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/camp-details/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <motion.div
      className="w-[90%] xl:w-[85%] min-[1920px]:max-w-[102rem] mx-auto pt-36 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Details Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Image Section */}
        <motion.img
          src={camp.image}
          alt={camp.campName}
          className="w-full lg:w-1/2 rounded-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Info Section */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-accent mb-6">
            {camp.campName}
          </h2>
          <ul className="space-y-4 text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg text-gray-400">
            <li className="flex items-center gap-3">
              <FaCalendarAlt className="text-accent" />
              <span>
                <strong>Date:</strong>{" "}
                {new Date(camp.dateAndTime).toLocaleString()}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-accent" />
              <span>
                <strong>Location:</strong> {camp.location}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaDollarSign className="text-accent" />
              <span>
                <strong>Camp Fees:</strong> ${camp.campFees}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUserMd className="text-accent" />
              <span>
                <strong>Healthcare Professional:</strong>{" "}
                {camp.healthcareProfessional}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaUsers className="text-accent" />
              <span>
                <strong>Participants:</strong> {camp.participantCount} people
              </span>
            </li>
          </ul>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-2 sm:mb-3 lg:mb-2 xl:mb-3 2xl:mb-4">
              Description:
            </h2>
            <p className="text-sm sm:text-base lg:text-sm xl:text-base 2xl:text-lg text-gray-400 leading-6">
              {camp.description}
            </p>
          </div>

          {/* Join Camp Button */}
          <motion.div className="mt-8" whileTap={{ scale: 0.95 }}>
            <button
              className="btn btn-accent text-white w-full text-lg"
              onClick={() =>
                document.getElementById("registration-modal").showModal()
              }
            >
              Join Camp
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Registration Modal */}
      <RegistrationModal camp={camp} />
    </motion.div>
  );
};

export default CampDetails;
