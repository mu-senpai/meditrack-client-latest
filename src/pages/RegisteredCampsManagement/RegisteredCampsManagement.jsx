import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const RegisteredCampsManagement = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data = {}, isFetching, refetch } = useQuery({
        queryKey: ["registeredCamps", search, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/manage-registrations?email=${user.email}&search=${search}&page=${page}&limit=${limit}`);
            return res.data;
        },
    });

    const handleStatusUpdate = async (id, status, campId) => {
        try {
            await axiosSecure.patch(`/update-registration-status/${id}`, { status });
            refetch();

            const res = await axiosSecure.patch(`/increment-participant/${campId}`);

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: `Status updated to ${status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to update status",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to update status",
                text: error.message,
            });
        }
    };

    return (
        <div className="w-[90%] mx-auto py-8 sm:py-12 md:py-14 xl:py-16">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl xl:text-4xl text-accent font-bold text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
                Manage Registered Camps
            </motion.h2>

            {/* Search Input */}
            <div className="mb-6 flex justify-end">
                <input
                    type="text"
                    placeholder="Search camps..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            {
                isFetching ? (
                    <div className="w-full h-[40rem] flex items-center justify-center">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full border border-base-300">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th className="min-w-[250px]">Participant Name</th>
                                    <th className="min-w-[200px]">Participant Email</th>
                                    <th className="min-w-[250px]">Camp Name</th>
                                    <th className="min-w-[150px]">Camp Fees</th>
                                    <th className="min-w-[150px]">Payment Status</th>
                                    <th className="min-w-[150px]">Confirmation Status</th>
                                    <th className="min-w-[230px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.registrations?.map((registration, index) => (
                                    <motion.tr
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        key={registration._id}>
                                        <td>{index + 1}</td>
                                        <td>{registration.participantName}</td>
                                        <td>{registration.participantEmail}</td>
                                        <td>{registration.campName}</td>
                                        <td>${registration.campFees}</td>
                                        <td>{registration.paymentStatus}</td>
                                        <td>{registration.status}</td>
                                        <td className="flex gap-2">
                                            {
                                                registration.status === "Pending" &&
                                                <button
                                                    className="btn btn-sm btn-success text-white"
                                                    onClick={() => handleStatusUpdate(registration._id, "Approved", registration.campId)}
                                                    disabled={registration.paymentStatus === "Unpaid"}
                                                >
                                                    <FaCheck /> Approve
                                                </button>
                                            }
                                            <button
                                                className="btn btn-sm btn-error text-white"
                                                onClick={() => handleStatusUpdate(registration._id, "Rejected")}
                                                disabled={(registration.status === "Approved" && registration.paymentStatus === "Paid") || registration.status === "Rejected"}
                                            >
                                                <FaTimes /> {registration.status === "Rejected" ? "Rejected" : "Reject"}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }


            {/* Pagination */}
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

export default RegisteredCampsManagement;
