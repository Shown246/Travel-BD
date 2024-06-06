import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';

const PackageCard = ({ photo, tourType, tripTitle, price }) => {
  const [wishlist, setWishlist] = useState(false);

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  }
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={photo} alt={tripTitle} />
        <button onClick={toggleWishlist} className="absolute top-2 right-2 text-2xl text-red-500">
          {wishlist ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{tripTitle}</div>
        <p className="text-gray-700 text-base">{tourType}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: {price}</span>
        <button className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
          View Package
        </button>
      </div>
    </div>
    </>
  )
}

PackageCard.propTypes = {
  photo: PropTypes.string.isRequired,
  tourType: PropTypes.string.isRequired,
  tripTitle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default PackageCard