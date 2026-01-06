import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const AddCamp = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_HOSTING_KEY
        }`,
        formData
      );

      if (imgRes.data.success) {
        const campData = {
          ...data,
          image: imgRes.data.data.display_url,
          dateAndTime: startDate,
          participantCount: 0,
          organizerEmail: user.email,
        };
        const res = await axiosSecure.post("/camps", campData);
        if (res.data.success) {
          reset();
          Swal.fire({
            icon: "success",
            title: "Camp added successfully!",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to add camp",
      });
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-[calc(100vh-130px)] py-14 sm:py-20 md:py-28 bg-base-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="card w-[95%] sm:w-[90%] xl:w-full max-w-4xl bg-base-100 shadow-lg hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] py-10 px-4 sm:px-6 md:px-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-center mb-8 text-accent">
          Add a Camp
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Camp Name */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              {...register("campName", { required: true })}
              placeholder="Camp Name"
              className="input input-bordered w-full"
            />
          </motion.div>

          {/* Camp Fees */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="number"
              {...register("campFees", { required: true })}
              placeholder="Camp Fees"
              className="input input-bordered w-full"
            />
          </motion.div>

          {/* Healthcare Professional */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              {...register("healthcareProfessional", { required: true })}
              placeholder="Healthcare Professional"
              className="input input-bordered w-full"
            />
          </motion.div>

          {/* Date and Time */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full flex gap-4 items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                className="input input-bordered w-full"
                placeholderText="Select Date & Time"
              />
              <p className="text-gray-400 text-xs sm:text-base inline-flex gap-2">
                DD/MM/YYYY{" "}
                <span className="hidden sm:flex lg:hidden xl:flex">12:00</span>
              </p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="Location"
              className="input input-bordered w-full"
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <textarea
              {...register("description", { required: true })}
              placeholder="Description"
              className="textarea textarea-bordered w-full resize-none"
            ></textarea>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="col-span-2 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button type="submit" className="btn btn-accent w-full text-white">
              Add Camp
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddCamp;
