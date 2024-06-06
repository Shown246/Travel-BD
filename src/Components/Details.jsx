import { useParams } from "react-router-dom";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import axios from "axios";
import Rating from "react-rating";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";

const Details = () => {
  const id = useParams().id;
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState({});
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    axios
      .get(`https://ph-assignment11-server.vercel.app/book/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [changed, id]);
  const [openModal, setOpenModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const addMonths = (date, months) => {
    const copy = new Date(date);
    copy.setMonth(copy.getMonth() + months);
    return copy;
  };
  const handleQuantity = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
    const formattedStartDate = startDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedEndDate = endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const borrowed = {
      image: book.image,
      book_id: book._id,
      book_name: book.book_name,
      category_name: book.category_name,
      borrowed_date: formattedStartDate,
      return_date: formattedEndDate,
      email: user.email,
      name: user.displayName,
    };
    axios
      .post("https://ph-assignment11-server.vercel.app/borrow", borrowed)
      .then((res) => {
        console.log(res.data);
        axios
          .patch(`https://ph-assignment11-server.vercel.app/decrease/${id}`)
          .then(() => {
            setChanged(!changed);
          })
          .catch((error) => {
            console.log(error);
          });
        swal(
          "Borrowed Successfully",
          "You have successfully borrowed this book",
          "success"
        );
        setEndDate(null);
      })
      .catch((error) => {
        swal("Error", `${error.response.data.error}`, "error");
      });
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-4xl mx-auto  p-8 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={book.image}
              alt={book.book_name}
              className="w-full h-auto mb-8 rounded-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">{book.book_name}</h2>
            <p className="text-lg font-semibold mb-4">{book.category_name}</p>
            <p className="text-lg mb-4">
              <span className="font-semibold text-lg">Author: </span>{" "}
              {book.author_name}
            </p>
            <p className=" mb-4">{book.short_description}</p>
            <p className="text-lg mb-4">
              <Rating
                emptySymbol={<img src="/star-empty.png" className="icon" />}
                fullSymbol={<img src="/star-full.png" className="icon" />}
                initialRating={book.rating}
                readonly
              />
            </p>
            <p className="text-lg mb-4">
              <span className="font-semibold text-lg">Quantity: </span>
              {book.quantity}
            </p>
            <p className="text-lg mb-4">
              {book.contents}
            </p>
            <button
              disabled={book.quantity === 0}
              className="px-4 py-2 bg-tarawera text-white rounded-md hover:bg-flamingo disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
              onClick={(e) => {
                handleQuantity(e);
              }}
            >
              Borrow
            </button>
          </div>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <p>
                  Email: <span className="font-semibold">{user.email}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <p>
                  Name:{" "}
                  <span className="font-semibold">{user.displayName}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <p className="font-semibold">Select return date: </p>
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 1)}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  showDisabledMonthNavigation
                />
              </div>
            </div>
            <button
              onClick={onCloseModal}
              className="px-4 py-2 bg-tarawera text-white rounded-md hover:bg-flamingo"
            >
              Submit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Details;
