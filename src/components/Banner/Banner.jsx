import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SlideControl from "./SlideControl";

import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Banner = ({ allNews }) => {
  return (
    <section>
      <div className="grid gap-2 md:grid-rows-2 md:grid-cols-4">
        <div className="relative col-span-2 row-span-2 overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {allNews.slice(0, 6).map((news) => {
              return (
                <SwiperSlide key={news._id}>
                  <div className="relative">
                    <Link to={`/news/${news._id}`}>
                      <img
                        src={news.image}
                        alt="news-img"
                        className="w-full h-full duration-300 cursor-pointer hover:scale-110"
                      />
                    </Link>
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
            <Link to={`/news/${news._id}`} key={news._id}>
              <div className="relative overflow-hidden">
                <img
                  src={news?.image}
                  alt="news-img"
                  className="duration-300 cursor-pointer hover:scale-125"
                />
                <h2 className="absolute bottom-0 z-20 w-full p-2 font-semibold text-white bg-[#0202029a]">
                  {news.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
