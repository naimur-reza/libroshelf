export const fetchBooksAPI = async (search, filter, currentPage) => {
  const url = `https://gutendex.com/books?search=${search}&topic=${filter}&page=${currentPage}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};
