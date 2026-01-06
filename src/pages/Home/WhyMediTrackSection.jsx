import { motion } from "framer-motion";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
// Importing React Icons
import { FiClipboard, FiGlobe, FiShield } from "react-icons/fi";

const WhyMediTrackSection = () => {
  return (
    <section className="w-[90%] min-[1920px]:max-w-[108rem] mx-auto pt-10 sm:pt-14 md:pt-18 xl:pt-20 2xl:pt-24">
      {/* Section Header */}
      <SectionHeading
        title="Why Choose MediTrack?"
        description="Seamless medical camp management ensuring accessibility and efficiency worldwide healthcare services."
      />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8 sm:mt-10 xl:mt-12">
        {/* Feature 1 */}
        <motion.div
          className="bg-base-100 p-6 text-center transition-shadow duration-300 shadow-md rounded-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <FiClipboard className="text-accent w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold text-accent mb-2 xl:mb-3">
            Easy Management
          </h3>
          <p className="text-xs/normal sm:text-sm/normal xl:text-base/normal text-gray-400">
            Organize and manage medical camps efficiently with our user-friendly
            dashboard.
          </p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="bg-base-100 shadow-md rounded-lg p-6 text-center transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <FiShield className="text-accent w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold text-accent mb-2 xl:mb-3">
            Secure & Reliable
          </h3>
          <p className="text-xs/normal sm:text-sm/normal xl:text-base/normal text-gray-400">
            Your data is protected with top-level security for a safe
            experience.
          </p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="bg-base-100 md:col-span-2 xl:col-span-1 shadow-md rounded-lg p-6 text-center transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <FiGlobe className="text-accent w-16 h-16 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold text-accent mb-2 xl:mb-3">
            Global Reach
          </h3>
          <p className="text-xs/normal sm:text-sm/normal xl:text-base/normal text-gray-400">
            Connect with healthcare professionals worldwide and expand your
            impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyMediTrackSection;
