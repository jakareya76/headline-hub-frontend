import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const Payment = () => {
  const { price } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm price={price} />
    </Elements>
  );
};

export default Payment;
