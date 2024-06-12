import Banner from "./Banner"
import Guide from "./Guide";
import TourTypes from "./TourTypes";

const Home = () => {
  return (
    <div className="container90 mt-20">
      <Banner/>
      <Guide/>
      <TourTypes/>
    </div>
  )
}

export default Home;