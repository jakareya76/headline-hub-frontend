import CountUp from "react-countup";

const Statistic = () => {
  return (
    <div className="py-16 my-20 bg-blue-500 rounded-xl">
      <div className="flex flex-wrap items-center gap-5 justify-evenly">
        <div className="text-center text-white border-2 rounded-full flex items-center justify-center flex-col w-[180px] h-[180px]">
          <h2 className="text-xl font-semibold">Users</h2>
          <CountUp start={100} end={431} className="text-5xl" />
        </div>
        <div className="text-center text-white border-2 rounded-full flex items-center justify-center flex-col w-[180px] h-[180px]">
          <h2 className="text-xl font-semibold">Normal Users</h2>
          <CountUp start={100} end={379} className="text-5xl" />
        </div>
        <div className="text-center text-white border-2 rounded-full flex items-center justify-center flex-col w-[180px] h-[180px]">
          <h2 className="text-xl font-semibold">Premium Users</h2>
          <CountUp start={100} end={175} className="text-5xl" />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
