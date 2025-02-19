import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [captchaInput, setCaptchaInput] = useState("");

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = async (data) => {

        if (!validateCaptcha(captchaInput)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Captcha",
                text: "Please enter the correct captcha.",
            });
            return;
        }

        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData);
            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                createUser(data.email, data.password)
                    .then((result) => {
                        const userUID = result.user.uid;
                        updateUserProfile(data.name, imageUrl)
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    photoURL: imageUrl,
                                    phone: data.phone,
                                    uid: userUID,
                                    createdAt: new Date().toISOString(),
                                    role: 'user'
                                };

                                axiosPublic.put('/users', userInfo)
                                    .then((res) => {
                                        if (res.data.upsertedCount || res.data.modifiedCount) {
                                            reset();
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate(from, { replace: true });
                                        }
                                    });
                            })
                            .catch((error) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: error.message,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            });
                    });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    const handleGoogleSignup = () => {
        googleSignIn()
            .then(async (result) => {
                const user = result.user;
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phone: user.phoneNumber || "N/A",
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                    role: 'user'
                };

                try {
                    const res = await axiosPublic.post('/users', userInfo);
                    if (res.data.insertedId > 0 || res.data?.message) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged in successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, { replace: true });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <div className="flex flex-col md:flex-row h-[90rem] md:h-[70rem]">
            <div className="md:w-1/2 w-full h-[30%] md:h-full bg-accent flex items-center justify-center p-6 relative">
                <motion.img
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    src="/doctor-bg.webp"
                    alt="Doctor illustration"
                    className="max-w-[80%] lg:max-w-[60%] h-full object-contain z-10"
                />
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 right-0 h-[50%] object-contain"
                    src="/aid-bg.webp"
                />
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 w-full h-[70%] md:h-full flex flex-col items-center justify-center p-6">
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full md:w-3/4 space-y-6"
                >
                    <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent text-center">
                        Create an Account
                    </h2>
                    <div className="form-control">
                        <label className="label">Name</label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p className="text-red-600 mt-2">Name is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p className="text-red-600 mt-2">Email is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">Phone</label>
                        <input
                            type="text"
                            {...register("phone", { required: true })}
                            placeholder="Enter your phone number"
                            className="input input-bordered w-full"
                        />
                        {errors.phone && <p className="text-red-600 mt-2">Phone number is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">Photo</label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.image && <p className="text-red-600 mt-2">Photo is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"  {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 20,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} placeholder="Enter your password" className="input input-bordered w-full" />
                        {errors.password?.type === 'required' && <p className="text-red-600 mt-2">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600 mt-2">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600 mt-2">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600 mt-2">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">Captcha</label>
                        <LoadCanvasTemplate />
                        <input
                            type="text"
                            placeholder="Enter Captcha"
                            className="input input-bordered w-full mt-2"
                            onChange={(e) => setCaptchaInput(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-accent text-white w-full">
                        Create Account
                    </button>
                    <div className="divider">OR</div>
                    <button
                        type="button"
                        className="btn btn-outline btn-accent hover:text-white w-full"
                        onClick={handleGoogleSignup}
                    >
                        Login with Google
                    </button>
                    <p className="text-center mt-4">
                        Already registered?{" "}
                        <Link to={`/auth/login`} className="text-accent underline">
                            Log In
                        </Link>
                    </p>
                </motion.form>
            </div>
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default SignUp;
