import { useEffect,useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const BookTour = () => {
  const [bookings, setBookings] = useState([]);
  const [refetch, setRefetch] = useState(false);
  let count = 1;
  useEffect(() => {
    axios
      .get("http://localhost:5000/bookings",
      { withCredentials: true }
      )
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } , [refetch]);

  const cancelBooking = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will not be able to recover this booking!",
      icon: "warning",
      button: "Yes, cancel it!",
      dangerMode: true,
    })
    .then((willCancel) => {
      if (willCancel) {
        axios.delete(`http://localhost:5000/cancelBooking/${id}`, { withCredentials: true })
        .then(() => {
          swal("Booking has been cancelled!", {
            icon: "info",
          });
          setRefetch(!refetch);
        })
        .catch((err) => {
          console.log(err);
          swal("Failed to cancel booking!", {
            icon: "error",
          });
        });
      } else {
        swal("Booking is safe!");
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Package</th>
              <th>Tour Guide</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{count++}</td>
                <td>{booking.packageName}</td>
                <td>{booking.guideName}</td>
                <td>{booking.startDate.slice(0,10)}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    className="bg-flamingo disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-red-100 hover:text-flamingo text-white font-medium py-1 px-2 rounded"
                    disabled = {(booking.status === "In Review") ? false : true}
                    onClick={() => {cancelBooking(booking._id)}}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="bg-genoa disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-light-green-400 text-white font-medium py-1 px-2 rounded"
                    disabled = {booking.status === "Accepted" ? false : true}
                  >
                    Pay Now
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTour;
