import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 border-b border-gray-700/80 flex items-center px-8 justify-between text-gray-200">
      <h1 className="text-xl font-bold"> LibroShelf </h1>

      <ul className="flex items-center space-x-14 font-medium">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/wishlist">
          <li>My Wishlist</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
