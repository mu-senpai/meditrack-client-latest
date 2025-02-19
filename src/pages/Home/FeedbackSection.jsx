import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";

const FeedbackSection = () => {
    const axiosPublic = useAxiosPublic();
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axiosPublic.get("/feedback")
            .then(res => setFeedbacks(res.data))
            .catch(error => console.error("Error fetching feedbacks:", error));
    }, [axiosPublic]);

    return (
        <div className="w-full relative bg-cover lg:bg-fixed bg-center h-[55rem] md:h-[45rem] xl:h-[50rem] flex items-center justify-center"
            style={{ backgroundImage: "url('/Feedback.webp')" }}>

            <div className="absolute inset-0 bg-black/60"></div>

            <motion.div
                className="w-[90%] max-w-5xl text-center relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* <h2 className="text-4xl font-bold text-white mb-6">What Our Users Say</h2> */}
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-accent mb-2 md:mb-4 xl:mb-5">What Our Participants Say</h2>
                <p className="text-white text-xs md:text-sm xl:text-base mb-6 md:mb-8 xl:mb-10">Hear from those who have experienced our medical camps firsthand</p>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    key={feedbacks.length}
                    className="rounded-lg shadow-lg"
                >
                    {feedbacks.map((feedback) => (
                        <SwiperSlide key={feedback._id}>
                            <motion.div
                                className="bg-base-100 p-8 rounded-lg shadow-xl w-full md:w-3/4 h-[25rem] sm:h-[20rem] xl:h-[18rem] flex flex-col justify-between mx-auto"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <img src={feedback.photo} alt={feedback.name}
                                        className="w-14 h-14 rounded-full border-2 border-accent object-cover" />
                                    <div className="text-left">
                                        <h3 className="text-base sm:text-xl font-semibold">{feedback.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{feedback.campName}</p>
                                    </div>
                                </div>
                                <p className="text-lg italic">"{feedback.feedback}"</p>
                                <div className="flex justify-center mt-4">
                                    {[...Array(feedback.rating)].map((_, index) => (
                                        <span key={index} className="text-yellow-400 text-3xl">★</span>
                                    ))}
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
};

export default FeedbackSection;
