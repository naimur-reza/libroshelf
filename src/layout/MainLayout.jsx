import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#10130e]">
      <Navbar />
      <div className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
