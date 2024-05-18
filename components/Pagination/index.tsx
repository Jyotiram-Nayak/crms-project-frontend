import React, { useState } from "react";

interface PaginationProps {
  value: { [key: string]: any };
  setValue: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const Pagination: React.FC<PaginationProps> = ({ value, setValue }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 1);
      setValue({ ...value, page: newPage });
      return newPage;
    });
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + 1;
      setValue({ ...value, page: newPage });
      return newPage;
    });
  };

  return (
    <>
      <div className="flex justify-between mt-5">
        <select
          className="bg-white rounded-lg border border-stroke bg-transparent pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          name="course"
          id="course"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10 dark:border-strokedark dark:bg-boxdark">
            <li onClick={handlePreviousClick}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white  dark:bg-boxdark dark:hover:bg-meta-4 border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  dark:bg-boxdark dark:hover:bg-meta-4 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {currentPage}
              </a>
            </li>
            <li onClick={handleNextClick}>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white  dark:bg-boxdark dark:hover:bg-meta-4 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
