import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data = {}, isFetching, refetch } = useQuery({
        queryKey: ["paymentHistory", search, selectedDate, page],
        queryFn: async () => {

            let formattedDate = "";
            if (selectedDate) {
                const dateObj = new Date(selectedDate);
                formattedDate = dateObj.toISOString().split("T")[0]; 
            }

            const res = await axiosSecure.get(
                `/client/payment-history/${user.email}?search=${search}&date=${formattedDate}&page=${page}&limit=${limit}`
            );
            return res.data;
        },
    });

    useEffect(() => {
        refetch();
    }, [page, refetch]);

    const paidCamps = data?.camps ? data.camps.filter((camp) => camp.paymentStatus === "Paid") : [];

    return (
        <div className="w-[90%] mx-auto py-8 sm:py-12 md:py-14 xl:py-16">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl xl:text-4xl text-accent font-bold text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
                Payment History
            </motion.h2>

            <div className="w-full flex flex-wrap justify-between items-center gap-4 lg:gap-0 mb-6">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); 
                    }}
                    className="input input-bordered w-full lg:w-[69%]"
                />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setPage(1);
                    }}
                    className="input input-bordered w-full lg:w-[29%]"
                />
            </div>

            {isFetching ? (
                <div className="w-full h-[40rem] flex items-center justify-center">
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-base-300">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Camp Name</th>
                                <th>Payment Time</th>
                                <th>Payment ID</th>
                                <th>Payment Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paidCamps.map((camp, index) => (
                                <motion.tr
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    key={camp._id}>
                                    <td>{index + 1}</td>
                                    <td>{camp.campName}</td>
                                    <td>{new Date(camp.paymentTime).toLocaleString()}</td>
                                    <td>{camp.paymentId}</td>
                                    <td>${camp.campFees}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: data?.totalPages || 1 }).map((_, index) => (
                    <button
                        key={index}
                        className={`btn ${page === index + 1 ? "btn-accent text-white" : "btn-outline"} mx-1`}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistory;
