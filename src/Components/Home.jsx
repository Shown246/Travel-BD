import Banner from "./Banner"
import Guide from "./Guide";
import SimpleGallery from "./SimpleGallery";
import TourTypes from "./TourTypes";
// import Demo from "./Demo";

const Home = () => {
  return (
    <div className="container90 mt-20">
      <Banner/>
      <SimpleGallery/>
      {/* <Demo/> */}
      <Guide/>
      <TourTypes/>
    </div>
  )
}

export default Home;