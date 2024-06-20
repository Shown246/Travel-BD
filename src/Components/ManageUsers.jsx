import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const roleOptions = [
  { value: "Admin", label: "Admin" },
  { value: "Guide", label: "Guide" },
  { value: "Tourist", label: "Tourist" },
];

const ManageUsers = () => {
  let count = 1;
  const [users, setUsers] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [disabledIndex, setDisabledIndex] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users?roleFilter=${roleFilter}`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refetch, roleFilter]);

  const userOptions = users.flatMap((user) => [
    { value: user.name, label: user.name },
    { value: user.email, label: user.email },
  ]);

  const handleMakeGuide = (index, id, role) => {
    if (role === "Tourist") {
      axios
        .patch(
          `http://localhost:5000/makeGuide/${id}`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          setRefetch(!refetch);
          toast.success("User is now a Guide");
          setDisabledIndex([...disabledIndex, index]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleMakeAdmin = (index, id, role) => {
    if (role !== "Admin") {
      axios
        .patch(
          `http://localhost:5000/makeAdmin/${id}`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          setRefetch(!refetch);
          toast.success("User is now an Admin");
          setDisabledIndex([...disabledIndex, index]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleRoleFilter = (option) => {
    // setRoleFilter(option?.value);
    if (option) {
      setRoleFilter(option.value);
    } else {
      setRoleFilter("");
    }
  };
  return (
    <div>
      <div className="flex w-full">
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          closeMenuOnSelect={true}
          isClearable={true}
          components={animatedComponents}
          options={roleOptions}
          onChange={(option) => handleRoleFilter(option)}
        />
        <Select
          className="basic-single w-full"
          classNamePrefix="select"
          isClearable={true}
          isSearchable={true}
          name="color"
          options={userOptions}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={index}>
                <td>{count++}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.req == "true" ? "Wants to be a Guide" : ""}</td>
                <td>
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        handleMakeGuide(index, user._id, user.role);
                      }}
                      className="bg-genoa disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-200 hover:text-genoa text-white font-medium py-1 px-2 rounded"
                      disabled={
                        disabledIndex.includes(index) ||
                        user.role === "Admin" ||
                        user.role === "Guide"
                      }
                    >
                      Make Tourist Guide
                    </button>
                    <button
                      onClick={() => {
                        handleMakeAdmin(index, user._id, user.role);
                      }}
                      className="bg-genoa disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-200 hover:text-genoa text-white font-medium py-1 px-2 rounded"
                      disabled={
                        disabledIndex.includes(index) || user.role === "Admin"
                      }
                    >
                      Make ADMIN
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
