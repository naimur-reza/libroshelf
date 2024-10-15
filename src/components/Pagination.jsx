/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, onPrevClick, onNextClick }) => {
  return (
    <div className="flex items-center gap-8 justify-center mt-10">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => {
          onPrevClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm text-slate-200 hover:bg-slate-800 hover:text-white disabled:opacity-50"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Page Info */}
      <p className="text-gray-300">
        Page <strong className="text-gray-200">{currentPage}</strong> of&nbsp;
        <strong className="text-gray-200">{totalPages}</strong>
      </p>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          onNextClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="rounded-md border border-slate-300 p-2.5 text-center text-sm text-slate-200 hover:bg-slate-800 hover:text-white disabled:opacity-50"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
