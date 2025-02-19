import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUserMd, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CampCard(props = {}) {
    const { camp } = props || {};

    return (
        <motion.div
            className="card w-full bg-base-100 rounded-lg shadow-md hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{opacity: 0, y: -30}}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4 }}
        >
            <figure>
                <img src={camp.image} alt={camp.campName} className="rounded-t-lg" />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-accent text-xl text-nowrap overflow-clip overflow-ellipsis font-bold">
                    {camp.campName}
                </h2>
                <div className="flex items-center gap-2 text-sm mt-4">
                    <FaCalendarAlt className="text-accent" />
                    <span className="text-gray-400">{new Date(camp.dateAndTime).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <FaMapMarkerAlt className="text-accent" />
                    <span className="text-gray-400">{camp.location.split(", ").slice(1).join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <FaUserMd className="text-accent" />
                    <span className="text-gray-400">{camp.healthcareProfessional}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                    <FaUsers className="text-accent" />
                    <span className="text-gray-400">{camp.participantCount} {camp.participantCount > 1 ? "Participants" : "Participant"}</span>
                </div>
                <div className="card-actions mt-6">
                    <Link className="w-full" to={`/camp-details/${camp._id}`}>
                        <motion.button
                            className="btn btn-accent text-white w-full"
                            whileTap={{ scale: 0.95 }}
                        >
                            View Details
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
