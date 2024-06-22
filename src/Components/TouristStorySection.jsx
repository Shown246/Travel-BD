import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TouristStorySection = () => {
  const navigate = useNavigate();
 const [stories, setStories] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/stories')
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStoryClick = (id) => {
    navigate(`/story/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Tourist Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories.map((story, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => handleStoryClick(story._id)}
          > 
            {/* Posted by: */}
            <h1 className=" mb-2"><span className='font-semibold'>Posted by: </span>{story.name}</h1>
            <h3 className=" mb-2"><span className='font-medium'>Date: </span>{story.date}</h3>
            <p className="text-gray-700">{story.story}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/all-stories')}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          All Stories
        </button>
      </div>
    </div>
  );
};

export default TouristStorySection;
