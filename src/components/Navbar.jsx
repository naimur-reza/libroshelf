const Navbar = () => {
  return (
    <div className="h-16 border-b border-gray-700/80 flex items-center px-8 justify-between text-gray-200">
      <h1 className="text-xl font-bold"> LibroShelf </h1>

      <ul className="flex items-center space-x-14 font-medium">
        <li>Home</li>
        <li>My Wishlist</li>
      </ul>
    </div>
  );
};

export default Navbar;
