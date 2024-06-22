import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import PackageCard from "./PackageCard";

const PackageTypes = () => {
  const { id } = useParams();
  const fetchPackageTypes = async (key) => {
    const id = key.queryKey[0];
    const response = await axios.get(`https://ph-assignment12-server.vercel.app/types/${id}`
    );
    return response.data;
  };
  const { data, error, status } = useQuery({
    queryKey: [id],
    queryFn: fetchPackageTypes,
  });
  if (status === 'pending') {
    return <div className="mx-auto flex justify-center items-center"><span className="loading loading-bars loading-lg"></span></div>
  }
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return(
    <div className="container90 my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <PackageCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PackageTypes;
