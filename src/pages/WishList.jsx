import { useState } from "react";
import { Heart } from "lucide-react";
import WishlistCard from "../components/WishlistCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextReveal from "../components/Animation/TextReveal";

const WishlistPage = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const [wishlistItems, setWishlistItems] = useState(wishlist);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useGSAP(() => {
    gsap.from(".wishlist-card", {
      delay: 0.6,
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="min-h-screen   text-gray-200 pt-20 ">
      <div className="container mx-auto px-4 py-8">
        <TextReveal
          delay={0.5}
          text="Wishlist"
          color="text-white text-center mb-5"
          fontSize="text-5xl"
        />

        <hr className="border-gray-700/70 mb-5" />
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-xl">Your wishlist is empty</p>
            <p className="mt-2 text-gray-400">Start adding books you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-card">
                <WishlistCard
                  bookData={item}
                  removeFromWishlist={removeFromWishlist}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
