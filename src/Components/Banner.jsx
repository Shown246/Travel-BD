import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  function handleScroll() {
    navigate("/allBooks");
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
              src="https://i.ibb.co/dG5WjBQ/Banner2.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold mb-8">
              Explore Our Vast Collection
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Dive into a world of knowledge with our extensive collection of books covering a wide range of topics and genres.
              </p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Lets see the collection
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative w-full min-h-[90vh]">
            <img
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              src="https://i.ibb.co/kgNYn6b/Banner1.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold mb-8 text-center">
              Unlock the Power of Learning
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Unlock the power of learning with our comprehensive library, offering resources that cater to the academic and intellectual needs of our students and faculty.
              </p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Lets see the collection
              </button>
            </div>
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative w-full min-h-[90vh]">
            <img
              className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              src="https://i.ibb.co/Vj40T8J/Banner3.jpg"
              alt="Your image"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white lg:text-4xl text-xl font-bold text-center mb-8">
              Discover the Joy of Reading
              </h1>
              <p className="text-white lg:text-lg text-sm w-3/5 text-center mb-8">
              Experience the joy of reading with our diverse selection of books, carefully curated to inspire and educate readers of all ages.
              </p>
              <button
                className="btn hover:text-flamingo hover:bg-teal lg:text-lg text-white lg:font-semibold bg-genoa"
                onClick={handleScroll}
              >
                Lets see the collection
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;