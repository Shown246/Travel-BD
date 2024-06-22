import Banner from "./Banner"
import Guide from "./Guide";
import SimpleGallery from "./SimpleGallery";
import TourTypes from "./TourTypes";
import TouristStorySection from "./TouristStorySection";

const Home = () => {
  return (
    <div className="container90 mt-20">
      <Banner/>
      <SimpleGallery/>
      <Guide/>
      <TourTypes/>
      <TouristStorySection/>
    </div>
  )
}

export default Home;