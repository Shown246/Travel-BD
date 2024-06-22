import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Wishlist = () => {

  const [wishlist, setWishlist] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  // const [state, setState] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/wishlist", { withCredentials: true })
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = () => {
    console.log(id);
    axios.delete(`http://localhost:5000/wishlist/${id}`, { withCredentials: true })
    .then(() => {
      axios
        .get("http://localhost:5000/wishlist", { withCredentials: true })
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  };

  const navigate = useNavigate();

  const goToPackageDetails = (_id) => {
    navigate(`/packageDetails/${_id}`);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentItems = wishlist.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(wishlist.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let count2 = offset + 1;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package Name</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((item) => (
              <tr key={item._id}>
                <td>{count2++}</td>
                <td>{item.packageName}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => {
                      setId(item.packageId);
                      setOpenModal(true);
                    }}
                    className="px-4 py-2 rounded-md bg-flamingo text-white hover:bg-gray-400 hover:text-flamingo"
                  >
                    Delete
                  </button>
                  <Modal
                    show={openModal}
                    size="md"
                    onClose={() => setOpenModal(false)}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            className="bg-flamingo text-white"
                            onClick={() => {
                              handleDelete();
                              setOpenModal(false);
                            }}
                          >
                            {"Yes, I'm sure"}
                          </Button>
                          <Button
                            className="bg-gray-200 text-gray-800 dark:text-gray-200"
                            onClick={() => setOpenModal(false)}
                          >
                            No, cancel
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
                <td>
                  <button onClick={() => {goToPackageDetails(item.packageId)}} className="px-4 py-2 rounded-md bg-genoa text-white hover:bg-gray-400 hover:text-genoa">
                    Visit Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      </div>
    </div>
  );
};

export default Wishlist;
