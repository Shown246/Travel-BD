/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
// import SimpleGallery from "./SimpleGallery";
import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PackageDetail = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState({});
  const [guideData, setGuideData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/packages/${id}`)
      .then((res) => {
        setPackageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/guides")
      .then((res) => {
        setGuideData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(guideData);
  const items = packageData.tour_plan;

  return (
    <div className="container90 mt-16">
      {/* <SimpleGallery images={packageData.images || []} /> */}
      <div className="mt-8">
        <h1 className="text-3xl font-semibold">{packageData.name}</h1>
        <p className="mt-4 text-lg">{packageData.description}</p>
        <p className="mt-4 text-lg">Price: {packageData.price}</p>
      </div>
      {items &&
        items.map((item, index) => <TourPlan item={item} key={index} />)}
      <div className="mt-6">
        <h1>Tour Guides</h1>
        {/* List of guides */}
        {guideData.map((guide, index) => (
          <Guide key={index} guide={guide} />
        ))}
      </div>
    </div>
  );
};

const TourPlan = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <Accordion expanded={expanded} onChange={handleExpansion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className="bg-genoa text-white p-2 rounded-md">{item.day}</Typography>
      </AccordionSummary>
      <AccordionDetails className="bg-amber-100">
        <Typography>{item.details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const Guide = ({ guide }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/guideProfile/${id}`);
  }
  return (
    <div onClick={() => {handleClick(guide._id)}} className="mt-4 flex gap-8 cursor-pointer">
      <h2>{guide.name}</h2>
      <p>{guide.phnData}</p>
    </div>
  );
};

export default PackageDetail;
