import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get("https://ph-assignment11-server.vercel.app/featuredBooks").then((response) => {
      setBooks(response.data);
    });
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  screen.width > 640 ? settings.slidesToShow = 3 : settings.slidesToShow = 1;
  // Reload the page when the screen width changes
  window.onresize = () => {
    window.location.reload();
  };

  return (
    <div className="slider-container container90 my-16">
      <div className="mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Featured Books</h2>
      <p className="text-lg mb-8 text-center">
        Explore our selection of handpicked featured books from various genres.
      </p>
      {/* Add more components here */}
    </div>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book._id}>
            <div className="rounded-lg hover:scale-110 transition ease-in-out delay-75 duration-300 overflow-hidden shadow-lg mx-2">
              <div
                className="relative bg-cover bg-center h-96 w-full"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(19, 19, 24, 0.5) 100%, rgba(19, 19, 24, 0) 100%), url(${book.image})`,
                }}
              >
                <div className="flex flex-col items-center justify-around h-full">
                  <p className="text-white text-2xl font-semibold">
                    {book.book_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedBooks;
