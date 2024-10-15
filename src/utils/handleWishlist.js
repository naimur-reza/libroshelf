export const handleWishlist = (setIsWishlisted, bookData, id) => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const isBookInWishlist = wishlist.some((book) => book.id === id);

  if (isBookInWishlist) {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(false);
  } else {
    const updatedWishlist = [...wishlist, bookData];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsWishlisted(true);
  }
};
