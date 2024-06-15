import { useParams } from "react-router-dom";

const PackageDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>PackageDetail</div>
  )
}

export default PackageDetail