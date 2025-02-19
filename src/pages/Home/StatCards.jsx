import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import CountUp from "react-countup";
import { FiUserCheck, FiHeart } from "react-icons/fi";

const StatCards = () => {

    const [countStart, setCountStart] = useState(false);
    const axiosPublic = useAxiosPublic();

    const {
        data,
    } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/stat-cards`
            );
            return res.data;
        },
    });

    return (
        <section className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center pt-10 sm:pt-14 md:pt-18 xl:pt-20 2xl:pt-24">
            <motion.div
                className="p-6 bg-accent text-white shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                onViewportEnter={() => setCountStart(true)}
            >
                <FiHeart className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl mb-3" />
                <h3 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
                    {countStart ? <CountUp start={0} end={data?.totalCamps} duration={3} separator="," /> : <span>0</span>}
                </h3>
                <p className="text-sm sm:text-base xl:text-xl 2xl:text-2xl">Active Camps</p>
            </motion.div>
            <motion.div
                className="p-6 bg-accent text-white shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.01 }}
                onViewportLeave={() => setCountStart(false)}
            >
                <FiUserCheck className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl mb-3" />
                <h3 className="text-2xl sm:text-3xl xl:text-4xl 2xl:text-5xl font-bold">
                    {countStart ? <CountUp start={0} end={data?.totalParticipantCount} duration={3} separator="," /> : <span>0</span>}
                </h3>
                <p className="text-sm sm:text-base xl:text-xl 2xl:text-2xl">Participants in Active Camps</p>
            </motion.div>
        </section>
    );
};

export default StatCards;