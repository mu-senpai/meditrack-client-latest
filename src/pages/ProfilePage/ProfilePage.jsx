import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ProfilePage = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user, updateUserProfile } = useContext(AuthContext);

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    console.log(userData);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
            const imgRes = await axios.post(imageHostingAPI, formData);
            if (imgRes.data.success) {
                const updatedUser = {
                    email: userData.email,
                    name: data.name || userData.name,
                    photoURL: imgRes.data.data.display_url || userData.photoURL,
                    phone: data.phone || userData.phone,
                };

                await axiosSecure.patch("/users/profile", updatedUser);

                updateUserProfile(data.name, imgRes.data.data.display_url)
                    .then(() => {
                        refetch();
                        reset();
                        document.getElementById("profile-edit-modal").close()
                        Swal.fire({
                            icon: "success",
                            title: "Profile updated successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                    .catch((error) => {
                        console.error("Failed to update profile:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Failed to update profile",
                            text: error.message,
                        });
                    });

            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to update profile",
                text: error.message,
            });
        }
    };

    if (isLoading)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen bg-base-200">
            <motion.div
                className="max-w-md w-[90%] sm:w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="card bg-base-100 shadow-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] p-6 text-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                        <div className="avatar">
                            <div className="w-36 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                                <img
                                    src={userData?.photoURL || "https://via.placeholder.com/150"}
                                    alt="User Avatar"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-accent mt-4">
                            {userData?.name || "User Name"}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {userData?.role === "admin" ? "Organizer" : "Participant"}
                        </p>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-6 space-y-4">
                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-sm font-medium text-gray-400">Email</span>
                            <span className="text-sm text-gray-400">
                                {userData?.email || "Email not available"}
                            </span>
                        </motion.div>
                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-sm font-medium text-gray-400">Phone</span>
                            <span className="text-sm text-gray-400">
                                {userData?.phone || "Phone not available"}
                            </span>
                        </motion.div>
                        <button
                            className="btn btn-accent text-white w-full"
                            onClick={() => document.getElementById("profile-edit-modal").showModal()}
                        >
                            Edit Profile
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Edit Modal */}
            <dialog
                id="profile-edit-modal"
                className="modal"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box bg-base-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-accent mb-4">Edit Profile</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={userData?.name}
                            {...register("name")}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={userData?.phone}
                            {...register("phone")}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            {...register("image")}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-accent text-white">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() =>
                                document.getElementById("profile-edit-modal").close()
                            }
                        >
                            Close
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ProfilePage;
