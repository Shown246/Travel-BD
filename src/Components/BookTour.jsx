import { useEffect,useState } from "react";
import axios from "axios";

const BookTour = () => {
  const [bookings, setBookings] = useState([]);
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
  } , []);

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
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTour;
