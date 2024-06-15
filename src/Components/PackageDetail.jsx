/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
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

  const items = packageData.tour_plan;
  console.log(items);

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
        <Typography>{item.day}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{item.details}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default PackageDetail;
