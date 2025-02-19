import { motion } from "framer-motion";

const FeaturesSection = () => {
    return (
        <section className="w-[90%] box-border lg:h-[1000px] flex flex-col gap-4 md:gap-12 lg:gap-0 lg:flex-row lg:items-start lg:justify-between mx-auto pt-10 sm:pt-14 md:pt-18 xl:pt-20 2xl:pt-24">
            {/* Doctor Image Section */}
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:h-full lg:w-[48%]">
                <img src="/female-doctor.webp" className="w-full lg:h-full object-cover object-top rounded-2xl shadow-lg" alt="Female doctor" />
            </motion.div>

            {/* Features Section */}
            <div className="w-full lg:h-full flex flex-col items-center lg:items-start lg:justify-between lg:w-[48%] mt-8 md:mt-0">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 lg:mb-8">
                    <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-accent mb-3 md:mb-4 lg:mb-5 text-center lg:text-left">
                        Our Features
                    </h2>
                    <p className=" text-gray-400 text-xs md:text-sm xl:text-base text-center lg:text-left">
                        We offer a comprehensive platform for managing medical camps. With MediTrack, you can efficiently organize, track, and manage everything from participant registration to real-time camp updates.
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <div className="flex flex-grow flex-col gap-6 lg:gap-0 lg:justify-between">
                    {/* Camp Creation and Management */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 xl:p-7 bg-base-100 shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg md:text-xl xl:text-2xl text-accent font-semibold mb-2 xl:mb-3">Camp Creation and Management</h3>
                        <p className="text-xs md:text-sm xl:text-[0.9375rem] 2xl:text-base text-gray-400">
                            We provide dashboard to create and manage medical camps effortlessly. Add essential camp details such as date, time, location, and healthcare professionals to ensure smooth camp operations.
                        </p>
                    </motion.div>

                    {/* Participant Registration and Management */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 2xl:p-7 bg-base-100 shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg md:text-xl xl:text-2xl text-accent font-semibold mb-3">Easy Participant Registration</h3>
                        <p className="text-xs md:text-sm xl:text-[0.9375rem] 2xl:text-base text-gray-400">
                            We provide a streamlined registration process, allowing participants to easily sign up for camps. Track their personal information, medical history, and payment status to ensure smooth participant management.
                        </p>
                    </motion.div>

                    {/* Real-time Camp Data */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 2xl:p-7 bg-base-100 shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg md:text-xl xl:text-2xl text-accent font-semibold mb-3">Real-time Camp Data</h3>
                        <p className="text-xs md:text-sm xl:text-[0.9375rem] 2xl:text-base text-gray-400">
                            We provide real-time updates on camp progress. Monitor registrations, track participant numbers, and make timely decisions based on the latest data to keep your camp running smoothly.
                        </p>
                    </motion.div>

                    {/* Feedback and Ratings */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4 }}
                        className="p-6 2xl:p-7 bg-base-100 shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] transition-shadow duration-300 ease-in-out">
                        <h3 className="text-lg md:text-xl xl:text-2xl text-accent font-semibold mb-3">Feedback and Ratings Collection</h3>
                        <p className="text-xs md:text-sm xl:text-[0.9375rem] 2xl:text-base text-gray-400">
                            We provide a feedback collection system to help you gather valuable insights from participants. Use ratings and feedback to continuously improve camp operations and healthcare delivery.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;