import { motion } from "framer-motion";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "User Login Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleGoogleLogin = () => {
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
          role: "user",
        };

        try {
          const res = await axiosPublic.post("/users", userInfo);
          if (res.data.insertedId > 0 || res.data?.message) {
            Swal.fire({
              icon: "success",
              title: "Logged in successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-[70rem] md:h-[50rem] 2xl:h-screen max-h-[70rem]">
      {/* Left Section */}
      <div className="md:w-1/2 w-full h-[40%] md:h-full bg-accent flex items-center justify-center p-6 relative">
        <motion.img
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          src="/doctor-bg.webp"
          alt="Doctor illustration"
          className="max-w-[80%] lg:max-w-[70%] h-full object-contain z-10"
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
      <div className="md:w-1/2 w-full h-[60%] md:h-full flex flex-col items-center justify-center p-6">
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-3/4 space-y-6"
        >
          <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent text-center">
            Login to MediTrack
          </h2>
          <div className="form-control">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-accent text-white w-full">
            Login
          </button>
          <div className="divider">OR</div>
          <button
            type="button"
            className="btn btn-outline btn-accent hover:text-white w-full"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to={`/auth/signup`} className="text-accent underline">
              Sign Up
            </Link>
          </p>
        </motion.form>
      </div>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default Login;
