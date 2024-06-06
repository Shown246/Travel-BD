// import { FaStar } from "react-icons/fa6";
// import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubCards = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://ph-assignment11-server.vercel.app/categories")
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  } ,[]);

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:my-16 my-8">
        {categories.map((item, index) => (
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

export default SubCards;
