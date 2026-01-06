import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BannerCarousel() {
  const slides = [
    {
      backgroundImage: "/Banner-1.webp",
      tagline: "Making Healthcare Accessible for All",
      description:
        "Over 10,000 lives transformed through 500+ medical camps worldwide.",
    },
    {
      backgroundImage: "/Banner-2.webp",
      tagline: "Join the Movement for Better Health",
      description:
        "Providing care in 30+ countries with millions of smiles delivered.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[90vh] max-h-[800px] overflow-hidden">
      {/* Slide Content */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-4 md:px-8 lg:px-12">
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    {slide.tagline}
                  </motion.h2>
                  <motion.p
                    className="text-lg md:text-xl lg:text-2xl mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    {slide.description}
                  </motion.p>
                  <Link to={`/available-camps`}>
                    <motion.button
                      className="btn btn-accent text-white px-6 py-3 text-lg font-semibold"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      Explore Camps
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Circle Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-gray-400"
            } transition-colors duration-300`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
