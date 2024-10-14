import Books from "../components/Books";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-custom-bg">
      <Navbar />
      <Books />
    </div>
  );
};

export default Home;
