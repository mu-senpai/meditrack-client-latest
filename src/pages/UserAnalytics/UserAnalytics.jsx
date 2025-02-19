import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid, ResponsiveContainer
} from "recharts";

const UserAnalytics = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [campData, setCampData] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/registered-camps/${user.email}`)
                .then(res => setCampData(res.data))
                .catch(error => console.error("Error fetching registered camps:", error));
        }
    }, [user, axiosSecure]);

    // Process data for charts
    const totalRegisteredCamps = campData.length;
    const feesData = campData.map(camp => ({ name: camp.campName, fees: parseFloat(camp.campFees) }));
    const paymentData = [
        { name: "Paid", value: campData.filter(c => c.paymentStatus === "Paid").length },
        { name: "Unpaid", value: campData.filter(c => c.paymentStatus === "Unpaid").length }
    ];

    const monthlyRegistrations = campData.reduce((acc, camp) => {
        const month = new Date(camp.registrationTime).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const monthlyData = Object.keys(monthlyRegistrations).map(month => ({
        name: month,
        registrations: monthlyRegistrations[month]
    }));

    const colors = ["#4CAF50", "#F44336"];

    return (
        <div className="w-full p-6 bg-base-100 min-h-screen py-8 sm:py-12 md:py-14 xl:py-16">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl xl:text-4xl font-bold text-accent text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">Analytics Dashboard</motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {/* Bar Chart - Total Registered Camps */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-base-100 z-10 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">Total Camps Registered</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={[{ name: "Registered", count: totalRegisteredCamps }]}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4C51BF" />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Pie Chart - Camp Fees Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-base-100 z-10 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">Camp Fees Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={feesData} dataKey="fees" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#3182CE" label />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Donut Chart - Payment Status */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-base-100 z-10 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-center mb-4">Payment Status Breakdown</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={paymentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                                {paymentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Line Chart - Registrations Over Time */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-base-100 z-10 hover:shadow-[0_4px_15px_rgba(0,211,187,0.5)] shadow-lg rounded-xl p-6 col-span-1 md:col-span-2 xl:col-span-3">
                    <h3 className="text-lg font-semibold text-center mb-4">Registrations Over Time</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="registrations" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default UserAnalytics;
