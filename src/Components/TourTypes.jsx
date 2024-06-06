// import { FaStar } from "react-icons/fa6";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const types = [
  {
    id: 1,
    name: "Adventure",
    description: "Activities like trekking, hiking, river rafting, and other thrilling experiences.",
    imageUrl: "https://picsum.photos/300/200?random=1"
  },
  {
    id: 2,
    name: "Cultural",
    description: "Tours focusing on the history, traditions, and cultural heritage of a place, including visits to museums, historical sites, and cultural events.",
    imageUrl: "https://picsum.photos/300/200?random=2"
  },
  {
    id: 3,
    name: "Nature & Wildlife",
    description: "Tours that include safaris, bird watching, exploring national parks, and experiencing natural landscapes.",
    imageUrl: "https://picsum.photos/300/200?random=3"
  },
  {
    id: 4,
    name: "City Life",
    description: "Exploring urban areas, including sightseeing of landmarks, architecture, and local attractions within a city.",
    imageUrl: "https://picsum.photos/300/200?random=4"
  },
  {
    id: 5,
    name: "Beach & Coastal",
    description: "Relaxing trips to beaches, islands, and coastal regions, often including water sports, sunbathing, and seaside activities.",
    imageUrl: "https://picsum.photos/300/200?random=5"
  },
  {
    id: 6,
    name: "Food & Culinary",
    description: "Focused on local cuisine, including food tastings, cooking classes, and visits to local markets and restaurants.",
    imageUrl: "https://picsum.photos/300/200?random=6"
  }
];



const TourTypes = () => {
  // const [categories, setCategories] = useState([]);
  // useEffect(() => {
  //   axios.get("https://ph-assignment11-server.vercel.app/categories")
  //   .then((response) => {
  //     setCategories(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // } ,[]);

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:my-16 my-8">
        {types.map((item, index) => (
          <Card card={item} key={index} />
        ))}
      </div>
    </div>
  );
};

const Card = (card) => {
  const navigate = useNavigate();
  const {name, image , _id} = card.card;
  return (
    <>
    <div className="rounded-lg hover:scale-110 transition ease-in-out delay-75 duration-300 overflow-hidden shadow-lg">
      <div
        className="relative bg-cover bg-center h-96 w-full"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(19, 19, 24, 0.5) 100%, rgba(19, 19, 24, 0) 100%), url(${image})` }}
      >
        <div className="flex flex-col items-center justify-around h-full">
          <p className="text-white text-2xl font-semibold pt-24">{name}</p>
        <button className="px-2 py-1 border-[1px] rounded-lg border-white hover:text-flamingo hover:bg-teal text-white bg-transparent"
          onClick={() => {
            navigate(`/categories/${_id}`);
          }}
        >View this Category</button>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default TourTypes;