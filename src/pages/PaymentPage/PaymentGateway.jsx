import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from './PaymentPage';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const PaymentGateway = () => {

    const location = useLocation();
    const { campName, campFees, campLocation, campId } = location?.state || {};
    const campData = {
        campName,
        campFees,
        campLocation,
        campId
    }

    return (
        <Elements stripe={stripePromise}>
            <PaymentPage camp={campData}></PaymentPage>
        </Elements>
    );
};

export default PaymentGateway;