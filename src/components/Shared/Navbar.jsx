import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 border-b border-gray-700/80 flex items-center px-8 justify-between text-gray-200">
      <div className="flex items-center gap-2">
        <BookOpen size={24} className="text-rose-500" />
        <h1 className="text-xl font-bold"> LibroShelf </h1>
      </div>
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
