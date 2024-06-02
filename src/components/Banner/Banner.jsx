import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SlideControl from "./SlideControl";

import "swiper/css/navigation";

const Banner = ({ allNews }) => {
  return (
    <div>
      <div className="grid gap-2 md:grid-rows-2 md:grid-cols-4">
        <div className="relative col-span-2 row-span-2 overflow-hidden">
          <Swiper modules={[Navigation]}>
            {allNews.slice(0, 6).map((news) => {
              return (
                <SwiperSlide key={news._id}>
                  <div className="relative">
                    <img
                      src={news.image}
                      alt="news-img"
                      className="w-full h-full duration-300 cursor-pointer hover:scale-110"
                    />

                    <h2 className="absolute bottom-0 z-20 w-full p-5 font-semibold text-white bg-[#0202029a]">
                      {news.title}
                    </h2>
                    <SlideControl />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {allNews.slice(6, 10).map((news) => {
          return (
            <div key={news._id} className="relative overflow-hidden">
              <img
                src={news?.image}
                alt="news-img"
                className="duration-300 cursor-pointer hover:scale-125"
              />
              <h2 className="absolute bottom-0 z-20 w-full p-2 font-semibold text-white bg-[#0202029a]">
                {news.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
