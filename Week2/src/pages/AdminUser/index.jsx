import React, { useEffect, useState } from "react";
import "./AdminUser.scss";

import { SidebarLeft } from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Navigationbar from "../../components/Navbar";
import Table from "../../components/Table";
import fgdApi from "../../api/fgdApi";
import Pagination from "../../components/Pagination";
const AdminUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const getAllUser = async () => {
    let res = null;
    const params = {};
    res = await fgdApi.getAllUser(params);
    // console.log(res.data);
    setAllUser(res.data.content);
    setPageCount(res.data.totalPages);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handlePageClick = (data) => {
    let curentPage = data.selected;
    // console.log(curentPage);
    const getAllUser = async () => {
      let res = null;
      const params = { curentPage };
      res = await fgdApi.getAllUser(params);
      // console.log(res.data);
      setAllUser(res.data.content);
    };

    getAllUser();
  };
  // console.log(allUser);
  return (
    <>
      <Navigationbar />

      <div class="row">
        <div class="col-3">
          <SidebarLeft />
        </div>
        <div class="col-9">
          <div className="adminuser">
            <div className="container">
              <h3>User</h3>
              <Table data={allUser} />
            </div>
          </div>
          <div>
            <Pagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminUser;
