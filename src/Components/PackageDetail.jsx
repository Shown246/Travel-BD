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
import Confetti from "react-confetti";
import {useWindowSize} from 'react-use';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PackageGallery from "./PackageGallery";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PackageDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [packageData, setPackageData] = useState({});
  const [guideData, setGuideData] = useState([]);
  const [count, setCount] = useState(0);
  const {width, height} = useWindowSize();
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    axios
      .get(`https://ph-assignment12-server.vercel.app/packages/${id}`)
      .then((res) => {
        setPackageData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get("https://ph-assignment12-server.vercel.app/guides")
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
    if (!user) {
      toast.error("Please login to book a package");
      return;
    }
    if (user?.role === "Guide") {
      toast.error("Guides can't book a Tour");
      return;
    }
    axios
      .get(`https://ph-assignment12-server.vercel.app/guide/${selectGuide}`)
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
          .post("https://ph-assignment12-server.vercel.app/bookings", bookingData, {
            withCredentials: true,
          })
          .then((res) => {
            toast.success("Booking Successful");
            setCount(res?.data[0]?.count);
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
  useEffect(() => {
    if(count === 3) {
      setOpen(true);
    }
  }, [count]);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div className="container90 mt-16">
      <PackageGallery images={packageData.images} />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Congratulations!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You got a discount of 10% on your bookings.
          </Typography>
          <button className="bg-genoa text-white px-4 py-2 rounded-md" onClick={() =>{setOpen(false)}}>
            Apply
          </button>
        </Box>
      </Modal>
    </div>
      {count === 3 && <Confetti width={width-50} height={height+100} confettiSource={{
        w: 100,
        h: 100,
        x: width/2,
        y: 2/height ,
      }} />}
    </>
    
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
      <h2><span className="font-medium">Name: </span>{guide.name}</h2>
      <p><span className="font-medium">Contact No: </span>{guide.phnData}</p>
    </div>
  );
};

export default PackageDetail;
