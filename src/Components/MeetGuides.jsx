import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeetGuides = () => {
  const [guides, setGuides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('https://ph-assignment12-server.vercel.app/guides');
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/guideProfile/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Meet Our Tour Guides</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div key={guide._id} className="bg-white shadow-lg rounded-lg p-6">
            <img
              src={guide.img}
              alt={guide.name}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-bold">{guide.name}</h2>
              <p className="text-gray-600">{guide.email}</p>
              <button
                onClick={() => handleDetailsClick(guide._id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetGuides;
