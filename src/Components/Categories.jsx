import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Rating from "react-rating";

const Categories = () => {
  const data = useLoaderData();
  const categoryName = data.name;
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`https://ph-assignment11-server.vercel.app/categoryName?name=${categoryName}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryName]);

  return (
    <div className="container90">
      {category.length === 0 ? (
        <div className="text-center text-2xl font-semibold lg:mt-24 mt-8">
          No Books Found in this Category
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:mt-16 mt-8">
          {category.map((item) => (
            <Card card={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
};

const Card = ({ card }) => {
  const navigate = useNavigate();
  const { _id, image, book_name, author_name, category_name, rating } = card;
  return (
    <div className="rounded-lg shadow-lg shadow-tarawera overflow-hidden">
      <img src={image} alt={book_name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-semibold mb-2">{book_name}</h3>
        <p className="mb-2">
          <Rating
            emptySymbol={<img src="/star-empty-small.png" className="icon" />}
            fullSymbol={<img src="/star-full-small.png" className="icon" />}
            initialRating={rating}
            readonly
          />
        </p>
        <p className="mb-2">Author Name: {author_name}</p>
        <p className="mb-2">Category: {category_name}</p>
        <div className="flex justify-around">
          <button className="px-4 py-1 rounded-lg hover:text-genoa hover:bg-teal text-white bg-genoa lg:text-lg text-xs w-full" onClick={() => {navigate(`/details/${_id}`);}} 
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
};
export default Categories;
