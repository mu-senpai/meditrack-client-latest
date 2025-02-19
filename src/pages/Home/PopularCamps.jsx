import { motion } from "framer-motion";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import CampCard from "../../components/CampCard/CampCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const PopularCamps = () => {
    const axiosPublic = useAxiosPublic();
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const currentScreenWidth = window.innerWidth;

    const { data: popularCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["popularCamps"],
        queryFn: async () => {
            const res = await axiosPublic.get("/popular-camps");
            const allCamps = res.data;

            if (screenSize >= 1024 && screenSize < 1280) {
                return allCamps.slice(0, 3);
            }

            return allCamps;
        },
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
            refetch();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [refetch, currentScreenWidth]);

    if (isLoading) {
        return (
            <div className="w-full h-[40rem] flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <motion.div
            className="w-[90%] mx-auto py-10 sm:py-14 md:py-18 xl:py-20 2xl:py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SectionHeading
                title="Our Popular Camps"
                description="Explore our most popular camps that have transformed thousands of lives"
            />

            {popularCamps.length > 0 ? (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8 sm:my-10 md:my-14 xl:my-16">
                    {popularCamps.map((camp) => (
                        <div key={camp._id}>
                            <CampCard camp={camp} />
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="text-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p>No popular camps available at the moment.</p>
                </motion.div>
            )}
            <div className="flex justify-center">
                <Link to={`/available-camps`}>
                    <motion.button
                        className="btn btn-ghost border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 text-lg font-semibold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        See All Camps
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default PopularCamps;
