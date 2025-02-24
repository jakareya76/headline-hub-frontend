import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { useState, useEffect } from "react";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const SlideControl = () => {
  const swiper = useSwiper();

  return (
    <div className="absolute z-20 flex items-center justify-between w-full top-1/2 -translate-y-1/2 px-4">
      <button
        onClick={() => swiper.slidePrev()}
        className="p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <HiOutlineChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <HiOutlineChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

const Banner = ({ allNews }) => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (allNews && allNews.length > 0) {
      setFeaturedNews(allNews.slice(0, 6));
      setSecondaryNews(allNews.slice(6, 10));
      setisLoading(false);
    }
  }, [allNews]);

  return (
    <section className="container mx-auto px-4 mt-24 mb-12">
      {isLoading ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 max-w-full">
          {/* Featured News (Large Slider) */}
          <div className="relative md:col-span-2 md:row-span-2 h-[500px] md:h-auto rounded-xl overflow-hidden shadow-lg">
            <Swiper
              modules={[Navigation, Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="h-full"
              loop={true}
            >
              {featuredNews.map((news) => (
                <SwiperSlide key={news._id} className="h-full">
                  <div className="relative h-full group">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"></div>
                    <Link to={`/news/${news._id}`} className="block h-full">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold bg-blue-600 rounded-full">
                          Featured
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                          {news.title}
                        </h2>
                        <p className="line-clamp-2 text-sm text-gray-200 mb-4 max-w-lg">
                          {news.description?.substring(0, 120)}...
                        </p>
                        <span className="inline-block text-sm font-medium hover:underline transition-all">
                          Read more
                        </span>
                      </div>
                    </Link>
                  </div>
                  <SlideControl />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Secondary News Grid */}
          {secondaryNews.map((news, index) => (
            <Link
              to={`/news/${news._id}`}
              key={news._id}
              className="block h-[240px] md:h-auto overflow-hidden rounded-xl shadow-md group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/70 z-10"></div>
              <img
                src={news.image}
                alt={news.title}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-white">
                <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold bg-purple-600 rounded-full">
                  {index % 2 === 0 ? "Trending" : "Latest"}
                </span>
                <h3 className="text-sm md:text-base font-semibold leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors">
                  {news.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Banner;
