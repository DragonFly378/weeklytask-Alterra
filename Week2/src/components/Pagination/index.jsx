import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss"


const Pagination = (props) => {
  
  return (
    <>
      <ReactPaginate
        previousLabel={"sebelumnya"}
        nextLabel={"selanjutnya"}
        pageCount={props.pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={props.handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"page-item active"}
        activeLinkClassName={"page-link active"}
        className="pagination"
      />
    </>
  );
};

export default Pagination;
