import { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = () => {
  let count = 1;
  const [wishlist, setWishlist] = useState([]);
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
            {wishlist.map((item) => (
              <tr key={item._id}>
                <td>{count++}</td>
                <td>{item.packageName}</td>
                <td>{item.price}</td>
                <td>
                  <button className="px-4 py-2 rounded-md bg-flamingo text-white hover:bg-gray-400 hover:text-flamingo">Delete</button>
                </td>
                <td>
                  <button className="px-4 py-2 rounded-md bg-genoa text-white hover:bg-gray-400 hover:text-genoa">Visit Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
