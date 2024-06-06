import Banner from "./Banner"
import SubCards from "./SubCards"
import { useLoaderData } from "react-router-dom";
import Review from "./Review";
import Newsletter from "./Newsletter";
import FeaturedBooks from "./FeaturedBooks";

const Home = () => {
  const data = useLoaderData();
  return (
    <div className="container90 mt-20">
      <Banner/>
      <SubCards data={data}/>
      <FeaturedBooks/>
      <Review/>
      <Newsletter/>
    </div>
  )
}

export default Home