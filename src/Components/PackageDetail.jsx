/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
// import SimpleGallery from "./SimpleGallery";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../AuthContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const PackageDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
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
  const items = packageData.tour_plan;
  const [startDate, setStartDate] = useState(new Date());
  const [selectGuide, setSelectGuide] = useState("");

  const handleRole = (event) => {
    setSelectGuide(event.target.value);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if(!user) {
      toast.error("Please login to book a package");
      return;
    }
    if(user?.role === "Guide") {
      toast.error("Guides can't book a Tour");
      return;
    }
    axios
      .get(`http://localhost:5000/guide/${selectGuide}`)
      .then((res) => {
        const guideName = res.data.name;
        const guideEmail = res.data.email;
        const bookingData = {
          touristName: user?.displayName,
          touristEmail: user?.email,
          packageName: packageData.title,
          price: packageData.price,
          guideName: guideName,
          guideEmail: guideEmail,
          status: "In Review",
          startDate: startDate,
        };
        axios
          .post("http://localhost:5000/bookings", bookingData, {
            withCredentials: true,
          })
          .then(() => {
            toast.success("Booking Successful");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Booking Failed");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to get guide details");
      });
  };

  return (
    <div className="container90 mt-16">
      {/* <SimpleGallery images={packageData.images || []} /> */}
      <div className="mt-8">
        <h1 className="text-3xl font-semibold">{packageData.name}</h1>
        <p className="mt-4 text-lg">{packageData.description}</p>
      </div>
      {items &&
        items.map((item, index) => <TourPlan item={item} key={index} />)}
      <div className="mt-6">
        <h1>Tour Guides</h1>
        {guideData.map((guide, index) => (
          <Guide key={index} guide={guide} />
        ))}
      </div>

      <div className="mt-6">
        <form onSubmit={handleBooking}>
          <div className="flex gap-56">
            <div>
              <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                Name
              </label>
              <p>{user?.displayName}</p>
              <label className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                Email
              </label>
              <p>{user?.email}</p>
            </div>
            <img src={user?.photoURL} className="w-24" />
          </div>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Price:</span> {packageData.price}
          </p>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <div>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">
                Select a Guide
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={selectGuide}
                label="Guide"
                required
                onChange={handleRole}
              >
                {guideData.map((guide, index) => (
                  <MenuItem key={index} value={guide._id}>
                    {guide.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button
            type="submit"
            className="bg-genoa text-white hover:bg-flamingo  p-2 rounded-md mt-4"
          >
            Book Now
          </button>
        </form>
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
        <Typography className="bg-genoa text-white p-2 rounded-md">
          {item.day}
        </Typography>
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
  };
  return (
    <div
      onClick={() => {
        handleClick(guide._id);
      }}
      className="mt-4 flex gap-8 cursor-pointer"
    >
      <h2>{guide.name}</h2>
      <p>{guide.phnData}</p>
    </div>
  );
};

export default PackageDetail;
