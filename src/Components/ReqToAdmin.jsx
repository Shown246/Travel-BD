import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ReqToAdmin = () => {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {

    axios.post("https://ph-assignment12-server.vercel.app/reqToAdmin",{}, { withCredentials: true})
      .then(() => {
        setRequested(true);
        toast.success("Request Sent!");
      })
      .catch((error) => {
        console.error("There was an error making the request:", error);
        toast.error("Failed to send request");
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Request to be a Tour Guide</h1>
        {requested ? (
          <p className="text-green-500">Request Sent!</p>
        ) : (
          <button
            onClick={handleRequest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Request to be a Guide
          </button>
        )}
      </div>
    </div>
    </div>
  )
}

export default ReqToAdmin