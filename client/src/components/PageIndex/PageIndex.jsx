import React from "react";
import style from "./PageIndex.module.css";

const PageIndex = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={style.container}>
      {/* Botón Anterior */}
      <div
        className={`page-number ${currentPage === 1 ? style.pageDisabled : style.page}`}
        onClick={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        {"<"}
      </div>

      {/* Números de página */}
      {pageNumbers.map((pageNumber) => (
        <div
          key={pageNumber}
          className={`page-number ${pageNumber === currentPage ? style.pageActive : style.page}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}

      {/* Botón Siguiente */}
      <div
        className={`page-number ${currentPage === totalPages ? style.pageDisabled : style.page}`}
        onClick={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        {">"}
      </div>
    </div>
  );
};

export default PageIndex;
