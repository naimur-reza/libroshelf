import { BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const Navbar = () => {
  const navItemRef1 = useRef(null);
  const navItemRef2 = useRef(null);
  const logoRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      y: -10,
      duration: 1,
      opacity: 0,
      delay: 0.5,
    });

    tl.from(navItemRef1.current, {
      opacity: 0,
      stagger: 0.1,
    });
    tl.from(navItemRef2.current, {
      opacity: 0,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="h-16 border-b border-gray-700/80 flex items-center px-8 justify-between text-gray-200 bg-[#292927]/60 backdrop-blur-sm fixed top-0 w-full z-10">
      <div ref={logoRef} className="flex items-center gap-2 ">
        <BookOpen size={24} className="text-orange-300" />
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-orange-400" : "text-white"
          }
          to="/"
        >
          <h1 className="text-xl font-extrabold">
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-500 to-red-500">
              LibroShelf
            </span>
          </h1>
        </NavLink>
      </div>
      <ul className="flex items-center space-x-5 lg:space-x-14 font-medium">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-orange-400" : "text-white"
          }
          ref={navItemRef1}
          to="/"
        >
          <li className="hover:text-orange-200 transition-all ">Home</li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-orange-400" : "text-white"
          }
          ref={navItemRef2}
          to="/wishlist"
        >
          <li className="hover:text-orange-200 transition-all">My Wishlist</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
