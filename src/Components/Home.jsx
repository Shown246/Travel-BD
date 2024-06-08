import Banner from "./Banner"
import FeaturedBooks from "./FeaturedBooks";
import Guide from "./Guide";
import TourTypes from "./TourTypes";

const Home = () => {
  return (
    <div className="container90 mt-20">
      <Banner/>
      <Guide/>
      <TourTypes/>
      <FeaturedBooks/>
    </div>
  )
}

export default Home;