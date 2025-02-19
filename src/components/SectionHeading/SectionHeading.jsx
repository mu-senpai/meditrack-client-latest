import { motion } from "framer-motion";

export const SectionHeading = (props = {}) => {

    const { title, description } = props || {};

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-accent mb-2 md:mb-4 xl:mb-5">{title}</h2>
            <p className="text-gray-400 text-xs md:text-sm xl:text-base">{description}</p>
        </motion.div>
    );
};