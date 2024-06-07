import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

const SubscriptionPage = () => {
  return (
    <div className="w-full h-screen">
      <h2 className="my-10 text-xl font-semibold text-center">Get Premium</h2>
      <div>
        <div className="h-[350px] text-white bg-gray-800 shadow-xl card w-96">
          <div className="card-body">
            <h2 className="card-title">Premium Plan (50$)</h2>
            <ul className="my-5 ml-5 space-y-3 list-disc">
              <li>Life Time Access</li>
              <li>Unlimited Articles Read</li>
              <li>Comment Access</li>
              <li>Add Articles</li>
              <li>Get Premium Access</li>
            </ul>
            <Link to="/payment" className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
