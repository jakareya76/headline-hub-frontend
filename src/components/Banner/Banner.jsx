import { Swiper, SwiperSlide } from "swiper/react";
import SlideOne from "./SlideOne";
import SlideTow from "./SlideTow";
import SlideThree from "./SlideThree";

const Banner = () => {
  return (
    <div className="container mx-auto">
      <Swiper>
        <SwiperSlide>
          <SlideOne />
        </SwiperSlide>
        <SwiperSlide>
          <SlideTow />
        </SwiperSlide>
        <SwiperSlide>
          <SlideThree />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
