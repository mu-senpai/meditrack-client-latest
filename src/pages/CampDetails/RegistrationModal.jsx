import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function RegistrationModal(props = {}) {
    const { user } = useContext(AuthContext);
    const { camp } = props || {};
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            refetch();
            return res.data;
        },
        enabled: !!user?.email,
    });

    const onSubmit = (data) => {
        data.campId = camp._id;
        data.status = "Pending";
        data.paymentStatus = "Unpaid";
        data.feedback = null;
        data.registrationTime = new Date().toISOString();
        data.paymentTime = null;
        data.paymentId = null;
        data.organizerEmail = camp.organizerEmail;

        const handleRegistration = async (registrationData) => {
            try {
                const response = await axiosSecure.post('/register-camp', registrationData);
                if (response.data.success) {
                    reset();
                    Swal.fire({
                        icon: 'success',
                        title: 'Registration successful!',
                    });
                }
            } catch (error) {
                console.error('Registration failed:', error);
            }
        };
        handleRegistration(data);

        document.getElementById("registration-modal").close();
    };

    return (
        <dialog
            id="registration-modal"
            className="modal modal-bottom sm:modal-middle"
        >
            <div
                className="modal-box bg-base-100 p-6 rounded-lg shadow-lg"
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <h2 className="text-2xl font-bold text-accent mb-4">
                        Register for {camp.campName}
                    </h2>

                    {/* Read-Only Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label text-sm">Camp Name</label>
                            <input
                                type="text"
                                {...register("campName", { required: true })}
                                value={camp.campName}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">Fees</label>
                            <input
                                type="text"
                                {...register("campFees", { required: true })}
                                value={camp.campFees}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">Location</label>
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                value={camp.location}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">
                                Healthcare Professional
                            </label>
                            <input
                                type="text"
                                value={camp.healthcareProfessional}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">Participant&apos;s Name</label>
                            <input
                                type="text"
                                {...register("participantName", { required: true })}
                                value={userData.name}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label text-sm">Participant&apos;s Email</label>
                            <input
                                type="text"
                                {...register("participantEmail", { required: true })}
                                value={userData.email}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>


                    {/* Editable Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="label text-sm">Age</label>
                            <input
                                type="number"
                                {...register("age", { required: true })}
                                placeholder="Enter your age"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">Phone Number</label>
                            <input
                                type="text"
                                defaultValue={userData.phone}
                                {...register("phone", { required: true })}
                                placeholder="Enter your phone number"
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-sm">Gender</label>
                            <select
                                {...register("gender", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="label text-sm">
                                Emergency Contact
                            </label>
                            <input
                                type="text"
                                {...register("emergencyContact", { required: true })}
                                placeholder="Enter emergency contact"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="modal-action mt-6 flex justify-end gap-4">
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-outline"
                            onClick={() =>
                                document.getElementById("registration-modal").close()
                            }
                        >
                            Close
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.95 }}
                            disabled={userData?.role === "admin"}
                            className="btn btn-accent text-white"
                        >
                            Register
                        </motion.button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
