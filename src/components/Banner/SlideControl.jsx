import { useSwiper } from "swiper/react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const SlideControl = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute z-50 flex items-center justify-center gap-5 right-5 bottom-20">
      <button
        onClick={() => swiper.slidePrev()}
        className="p-2 text-red-500 bg-white rounded-full hover:bg-red-500 hover:text-white"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="p-2 text-red-500 bg-white rounded-full hover:bg-red-500 hover:text-white"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default SlideControl;
