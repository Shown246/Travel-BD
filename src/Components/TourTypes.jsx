import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

const fetchTypes = async () => {
  const response = await axios.get('https://ph-assignment12-server.vercel.app/types');
  return response.data;
};

const TourTypes = () => {
  const { status, data, error } = useQuery({
    queryKey: [],
    queryFn: fetchTypes,
  });
  if (status === 'pending') {
    return <div className="mx-auto flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center my-8">Tour Types</h1>
        <p className="text-center text-lg text-gray-600">Choose your desired tour type</p>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:my-16 my-8">
        {data.map((item, index) => (
          <Card card={item} key={index} />
        ))}
      </div>
    </div>
  );
};

const Card = (card) => {
  const navigate = useNavigate();
  const { name, imageUrl, _id } = card.card;
  return (
    <>
      <button
        onClick={() => {
          navigate(`/categories/${_id}`);
        }}
        className="rounded-lg hover:scale-110 transition ease-in-out delay-75 duration-300 overflow-hidden shadow-lg"
      >
        <div
          className="relative bg-cover bg-center h-96 w-full"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(19, 19, 24, 0.5) 100%, rgba(19, 19, 24, 0) 100%), url(${imageUrl}`,
          }}
        >
          <div className="flex flex-col items-center justify-around h-full">
            <p className="text-white text-2xl font-semibold pt-24">{name}</p>
            <button className="px-2 py-1 border-[1px] rounded-lg border-white hover:text-flamingo hover:bg-teal text-white bg-transparent">
              View Packages
            </button>
          </div>
        </div>
      </button>
    </>
  );
};

export default TourTypes;
