import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-3 md:space-x-4 mt-6 md:mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-xs md:text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors shadow-sm"
      >
        <FaChevronLeft className="mr-1.5 md:mr-2 text-[10px] md:text-xs" />{" "}
        Previous
      </button>
      <span className="text-gray-700 text-xs md:text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-xs md:text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors shadow-sm"
      >
        Next{" "}
        <FaChevronRight className="ml-1.5 md:ml-2 text-[10px] md:text-xs" />
      </button>
    </div>
  );
};

export default Pagination;
