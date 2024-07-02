import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  function handleScroll() {
    navigate("/allPackages");
  }
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative w-full min-h-[90vh]">
            <img
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              src="https://i.ibb.co/9Ncb7sb/feat-30d48d6e-7b84-4dfe-bf22-6306f8a2d403.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold mb-8">
              Bangladesh&apos;s Wonder
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Explore breathtaking beauty, rich culture, and exciting adventures
              </p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Let&apos;s see the Packages
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full min-h-[90vh]">
            <img
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              src="https://i.ibb.co/dPpF347/Geography-of-Bangladesh.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold mb-8 text-center">
              Plan Your Dream Trip
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Plan your perfect trip with hidden gems, iconic landmarks, and unforgettable memories.</p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Let&apos;s see the Packages
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full min-h-[90vh]">
            <img
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              src="https://i.ibb.co/d0x48kB/istockphoto-1056699672-1024x1024.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold text-center mb-8">
              Immerse in the landscapes
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Discover vibrant traditions, delicious cuisine, and the warmth of Bangladeshi hospitality. 
              </p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Let&apos;s see the Packages
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;