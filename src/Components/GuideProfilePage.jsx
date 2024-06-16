import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GuideProfilePage = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5000/guide/${id}`)
      .then((res) => {
        setGuide(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  
  return (
    <div className="container90">
      <div className="flex items-center p-16">
        <img src={guide.img} className="h-40 object-cover" />
        <div>
          <p className="ml-4 text-2xl font-medium">{guide.name}</p>
          <p className="ml-4 text-2xl font-medium">{guide.email}</p>
        </div>
      </div>
      <div className="pl-16">
        <div className="flex gap-16 mb-8">
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Educational Qualification
                  </label>
                  <p className="text-lg w-60 p-2">{guide.eduData}</p>
                </div>
              </div>
          </div>
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Skills
                  </label>
                  <p className="text-lg w-60 p-2">{guide.sklData}</p>
                </div>
              </div>
          </div>
        </div>
        <div className="flex gap-16 mb-8">
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Work Experience
                  </label>
                  <p className="text-lg w-60 p-2">{guide.expData}</p>
                </div>
              </div>
          </div>
          <div>
          <div className="flex items-end">
                <div>
                  <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <p className="text-lg w-60 p-2">{guide.phnData}</p>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default GuideProfilePage