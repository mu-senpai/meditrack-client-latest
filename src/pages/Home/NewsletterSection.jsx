import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            Swal.fire({
                icon: 'success',
                title: 'Thank you for subscribing to our newsletter!',
            });
            setEmail("");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Please enter a valid email address.',
            });
        }
    };

    return (
        <section className="w-full pt-10 pb-6 sm:pt-14 sm:pb-9 md:pt-18 md:pb-14 xl:pt-20 xl:pb-18 2xl:pt-24 2xl:pb-22"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='200' preserveAspectRatio='none' viewBox='0 0 1920 200'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1061%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c187 C 96%2c167.6 288%2c92.8 480%2c90 C 672%2c87.2 768%2c176.8 960%2c173 C 1152%2c169.2 1248%2c69.6 1440%2c71 C 1632%2c72.4 1824%2c158.2 1920%2c180L1920 200L0 200z' fill='rgba(0%2c 211%2c 187%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1061'%3e%3crect width='1920' height='200' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'contain'
        }}
        >
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-[90%] mx-auto rounded-lg bg-[#00d3bb]/[0.3] backdrop-blur-md shadow-md border border-[#00d3bb] p-4 sm:p-5 xl:p-6">
                <section
                    className="w-full bg-[#e3f8f6] border border-[#00d3bb] text-[#00d3bb] p-8 rounded-xl text-center"
                >
                    <div className="container mx-auto max-w-xl">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="mb-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="w-12 h-12 mx-auto"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8"
                                    />
                                </svg>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                            >
                                Subscribe to newsletter
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                                className="text-sm sm:text-base lg:text-lg mb-6"
                            >
                                Stay up to date! Get all the latest posts delivered straight to your
                                inbox.
                            </motion.p>
                            <motion.form
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                                onSubmit={handleSubmit}
                                className="flex flex-col md:flex-row gap-4 w-full"
                            >
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="input input-sm sm:input-md input-bordered border-[#00d3bb] bg-[#f8f8f8] text-black w-full md:w-[80%]"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className="font-bold btn btn-sm sm:btn-md border-none bg-accent text-white w-full md:w-auto"
                                    type="submit"
                                >
                                    Subscribe
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </section>
            </motion.section>
        </section>
    );
};

export default NewsletterSection;
