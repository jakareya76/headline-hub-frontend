import { FaTimes } from "react-icons/fa";

const Plans = () => {
  return (
    <div className="pb-20">
      <h2 className="text-3xl font-semibold text-center">Choose A Plan</h2>
      <div className="flex flex-wrap items-center justify-center gap-8 mt-10">
        <div className="h-[350px] text-white bg-gray-800 shadow-xl card w-96">
          <div className="justify-between card-body">
            <h2 className="card-title">Basic Plan (Free)</h2>
            <ul className="my-5 ml-5 space-y-3 list-disc">
              <li>Life Time Access</li>
              <li>Unlimited Articles Read</li>
              <li>Comment Access</li>
              <div className="flex items-center gap-3">
                <li>Add Articles</li>
                <FaTimes color="red" className="mt-1" />
              </div>
              <div className="flex items-center gap-3">
                <li>Get Premium Access</li>
                <FaTimes color="red" className="mt-1" />
              </div>
            </ul>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
        <div className="h-[350px] text-white bg-gray-800 shadow-xl card w-96">
          <div className="justify-between card-body">
            <h2 className="card-title">Normal Plan (15$)</h2>
            <ul className="my-5 ml-5 space-y-3 list-disc">
              <li>Life Time Access</li>
              <li>Unlimited Articles Read</li>
              <li>Comment Access</li>
              <li>Add Articles</li>
              <div className="flex items-center gap-3">
                <li>Get Premium Access</li>
                <FaTimes color="red" className="mt-1" />
              </div>
            </ul>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
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
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
