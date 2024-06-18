import { useState } from "react";
// import axios from "axios";

const ReqToAdmin = () => {
  const [requested, setRequested] = useState(false);

  const handleRequest = () => {
    // Assume the user's email is available in the context or props
        setRequested(true);

    // axios.post("http://localhost:5000/requestGuide", { email: userEmail })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error making the request:", error);
    //   });
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