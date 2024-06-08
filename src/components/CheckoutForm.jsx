import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const getClientSecret = async () => {
      const res = await axiosSecure.post("/create-payment-intent", { price });
      setClientSecret(res.data.clientSecret);
    };

    getClientSecret();
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success("Payment Successfull");

        await axiosSecure.patch(`/make-user-premium/${user?.email}`);

        navigate("/");
      }
    }
  };

  return (
    <form className="my-10 space-y-4" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-500">{error}</p>
      <button
        className="w-full px-16 text-white bg-blue-500 rounded-lg shadow-md btn md:w-auto hover:bg-blue-600 disabled:opacity-50"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
