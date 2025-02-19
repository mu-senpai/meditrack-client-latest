import { motion } from "framer-motion";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";

const doctors = [
    { name: "Dr. James Anderson", specialty: "Cardiology", image: "/dr-james-anderson.webp" },
    { name: "Dr. Olivia Martinez", specialty: "Pediatrics", image: "/dr-olivia.webp" },
    { name: "Dr. Ethan Brown", specialty: "Orthopedics", image: "/dr-ethan.webp" },
    { name: "Dr. Liam Carter", specialty: "Neurology", image: "/dr-liam.webp" },
];

const MeetDoctors = () => {
    return (
        <section className="w-[90%] mx-auto pt-10 sm:pt-14 md:pt-18 xl:pt-20 2xl:pt-24">
            <SectionHeading
                title="Meet Our Founding Doctors"
                description="Dedicated to transforming healthcare, meet our founding doctors whom bring years of experience and expertise to MediTrack"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8 sm:mt-10 xl:mt-12">
                {doctors.map((doctor, index) => (
                    <motion.div
                        key={index}
                        className="bg-base-100 shadow-md hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] rounded-lg p-4 text-center transition-shadow duration-300 ease-in-out"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                    >
                        <img src={doctor.image} alt={doctor.name} className="w-[75%] mx-auto rounded-full mb-5" />
                        <h3 className="text-xl lg:text-2xl xl:text-xl 2xl:text-2xl font-semibold text-accent">{doctor.name}</h3>
                        <p className="text-base lg:text-lg xl:text-base 2xl:text-lg text-gray-400">{doctor.specialty}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MeetDoctors;