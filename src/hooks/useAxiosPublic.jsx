import axios from "axios";

export const useAxiosPublic = () => {
    const axiosInstance = axios.create({
        baseURL: "https://medi-track-server.vercel.app",
    });
    return axiosInstance;
};