import { Outlet } from "react-router-dom";
import GuideSide from "./GuideSide";
import { useContext } from "react";
import { AuthContext } from "../AuthContextProvider";
import TouristSide from "./TouristSide";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return user.role === "Guide" ? (
    <div className="flex">
      <GuideSide />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  ) : (
    <div className="flex">
      <TouristSide />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
