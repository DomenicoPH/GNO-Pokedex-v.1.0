import React from "react";
import style from "./PageIndex.module.css";

const PageIndex = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={style.container}>
      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          className={`page-number ${pageNumber === currentPage ? style.pageActive : style.page}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
};

export default PageIndex;
