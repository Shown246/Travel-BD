import Banner from "./Banner"
import FeaturedBooks from "./FeaturedBooks";
import Guide from "./Guide";

const Home = () => {
  return (
    <div className="container90 mt-20">
      <Banner/>
      <Guide/>
      <FeaturedBooks/>
    </div>
  )
}

export default Home