import { useState } from "react";
import { Heart } from "lucide-react";
import WishlistCard from "../components/WishlistCard";

const WishlistPage = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const [wishlistItems, setWishlistItems] = useState(wishlist);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen   text-gray-200 ">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold mb-8 text-center">
          My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-xl">Your wishlist is empty</p>
            <p className="mt-2 text-gray-400">Start adding books you love!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard
                bookData={item}
                key={item.id}
                removeFromWishlist={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
