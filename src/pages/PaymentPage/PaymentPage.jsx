import { useContext, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const PaymentPage = (props = {}) => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");

    const { camp } = props || {};

    console.log(camp.campId);

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: camp.campFees })
            .then(res => setClientSecret(res.data.clientSecret))
    }, [axiosSecure, camp])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const billingEmail = user?.email || "anonymous@example.com";
        const billingName = user?.displayName || "Anonymous User";

        // 1️⃣ Validate `clientSecret`
        if (!clientSecret) {
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: "Payment session expired. Please try again.",
            });
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
            billing_details: {
                email: billingEmail,
                name: billingName
            }
        });

        if (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Card Error",
                text: error.message,
            });
            return;
        }

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: billingEmail,
                        name: billingName
                    }
                }
            });

            if (confirmError) {
                console.log(confirmError);
                Swal.fire({
                    icon: "error",
                    title: "Payment Processing Error",
                    text: confirmError.message,
                });
                return;
            }

            // 3️⃣ Ensure Payment was successful before updating
            if (paymentIntent?.status === "succeeded") {
                await axiosSecure.patch(`/update-payment/${camp.campId}`, {
                    paymentId: paymentIntent.id
                });

                Swal.fire({
                    icon: "success",
                    title: "Payment Successful!",
                    text: `Transaction ID: ${paymentIntent.id}`,
                    confirmButtonText: "Ok"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard/registered-camps');
                    }
                });
            } else {
                throw new Error("Payment did not succeed.");
            }
        } catch (err) {
            console.log("Error processing payment:", err);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: err.message,
            });
        }
    };

    return (
        <div className="w-[90%] mx-auto h-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-14 xl:py-16">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl text-accent font-bold text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
                Complete Your Payment
            </h2>

            <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 z-10">
                <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold mb-4 text-center">Camp Details</h3>
                <div className="border p-4 rounded mb-4 space-y-1">
                    <p className="text-xs sm:text-sm xl:text-base"><strong>Camp Name:</strong> {camp.campName}</p>
                    <p className="text-xs sm:text-sm xl:text-base"><strong>Fees:</strong> ${camp.campFees}</p>
                    <p className="text-xs sm:text-sm xl:text-base"><strong>Location:</strong> {camp.campLocation}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Card Details</label>
                    <div className="border p-3 rounded bg-gray-100">
                        <CardElement className="p-2 bg-white" />
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-base sm:text-lg xl:text-xl font-semibold">Total: <span className="text-accent">${camp.campFees}</span></p>
                        <button
                            type="submit"
                            className="btn btn-accent text-white flex items-center gap-2"
                            disabled={!stripe || !clientSecret}
                        >
                            <FaCreditCard /> Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
