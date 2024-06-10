import { Outlet } from "react-router-dom";
import GuideSide from "./GuideSide";

const Dashboard = () => {
  return (
    <div className="flex">
      <GuideSide />
      <div className="ml-64">
      <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
