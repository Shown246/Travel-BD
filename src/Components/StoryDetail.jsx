import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import { FaShare, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../AuthContextProvider";
import { toast } from "react-toastify";
const url =
  "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fshare%2FUSYv3t9EFJXQtT5Q%2F&amp;src=sdkpreparse";

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`https://ph-assignment12-server.vercel.app/story/${id}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleStoryClick = () => {
    console.log("clicked");
    if (!user) {
      toast.error("Please login to view the story");
      return;
    }
  };

  if (!story) {
    return (
      <div className="text-center text-xl font-semibold">Story not found</div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="">
      <h1 className=" mb-2"><span className='font-semibold'>Posted by: </span>{story.name}</h1>
            <h3 className=" mb-2"><span className='font-medium'>Date: </span>{story.date}</h3>
        <p className="text-gray-700 text-lg mb-4">{story.story}</p>
        {user ? (
          <button onClick={handleStoryClick}>
            <FacebookShareButton url={url} quote={story.story}>
              <div className="flex bg-blue-700 w-fit text-white gap-4 p-2 rounded-lg">
                <FaShare size={27} />
                <FaFacebook size={27} />
              </div>
              <span className="ml-2 text-lg font-semibold">
                Share on Facebook
              </span>
            </FacebookShareButton>
          </button>
          
        ) : (
          <button onClick={handleStoryClick}>
            <div className="flex bg-blue-700 w-fit text-white gap-4 p-2 rounded-lg">
              <FaShare size={27} />
              <FaFacebook size={27} />
            </div>
        </button>
          
        )}
      </div>
    </div>
  );
};

export default StoryDetail;
