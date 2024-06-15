import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const PackageCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const {_id, title, type, duration, price, images } = props;
  const [wishlist, setWishlist] = useState(false);
  const navigate = useNavigate();

  const goToPackageDetails = () => {
    navigate(`/packageDetails/${_id}`);
  }

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  }
  return (
    <>
      <div className="max-w-md rounded overflow-hidden shadow-xl">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={images[0]} alt={title} />
        <button onClick={toggleWishlist} className="absolute top-2 right-2 text-2xl text-red-500">
          {wishlist ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="flex gap-16">
                <p className="text-gray-700 text-base">{type}</p>
                <p className="text-genoa">{duration}</p>
              </div>
      </div>
      <div className="px-6 pt-4 pb-2 space-x-16">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: {price}</span>
        <button onClick={goToPackageDetails} className="inline-block bg-genoa text-white font-medium text-sm px-4 py-2 rounded-lg shadow-lg hover:bg-flamingo hover:text-white  transition duration-300 ease-in-out">
          View Package
        </button>
      </div>
    </div>
    </>
  )
}


export default PackageCard;