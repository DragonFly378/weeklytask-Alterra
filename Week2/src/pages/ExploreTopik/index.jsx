import React, { useState, useEffect } from "react";
import Navigationbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SidebarLeft, SidebarRight } from "../../components/Sidebar";
import HomeCard from "../../components/Card/HomeCard";
import "./ExploreTopik.scss";
// import Button from "../../components/Button/Button";
import Box from "@mui/material/Box";
// import fgdApi from "../../api/fgdApi";
import categoryApi from "../../api/categoryApi";
// import Cookies from "js-cookie";

// import Swal from "sweetalert2";

function ExploreTopik() {
  const [data, setData] = useState([]);
  const [listThread, setListThread] = useState([]);
  const [category, setCategory] = useState({
    menu: [],
    categoryYangDipilih: "",
  });

  // const tokenCookies = Cookies.get("token");

  const getCategory = async () => {
    let res = null;
    const params = {};
    res = await categoryApi.getCategory(params);
    setData(res?.data);
  };

  const getThreadFirst = async () => {
    let res = null;
    const params = category.categoryYangDipilih;
    res = await categoryApi.getThread(params);
    // console.log(res.data);
    setListThread(res?.data.content);
  };
  // const getUser = async () => {
  //   let res = null;
  //   const params = {};
  //   res = await fgdApi.getAllUser(params);
  //   console.log(res.data);
  // };

  useEffect(() => {
    // console.log(data);

    // getUser();
    getCategory();
    getThreadFirst();
    // console.log(listThread);
  }, []);

  const handleCategory = (value) => {
    setCategory({
      menu: [],
      categoryYangDipilih: value,
    });

    const getThread = async () => {
      let res = null;
      res = await categoryApi.getThread(value);
      // console.log(res.data);
      setListThread(res?.data.content);
    };
    getThread();
    //
  };

  // const handleLike = async (id) => {
  //   let res = null;
  //   res = await fgdApi.likeThread(id, tokenCookies);
  //   // console.log(res);
  // };

  return (
    <>
      <Navigationbar />
      <div className="row">
        <div className="col-3">
          <SidebarLeft />
        </div>
        <div className="col-6">
          <div className="explore">
            <div className="explore-button">
              {data &&
                data.map((val, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        val.category_name === category.categoryYangDipilih
                          ? "button-active"
                          : "button"
                      }
                      onClick={() => {
                        handleCategory(val.category_name);
                      }}
                    >
                      {val.category_name}
                    </button>
                  );
                })}
            </div>
            <div className="explore-thread">
              {listThread &&
                listThread.map((item, itemIdx) => (
                  <Box key={itemIdx} py="4vh">
                    <HomeCard
                      key={itemIdx}
                      data={item}
                      likeData={item.likes}
                      getThread={getThreadFirst}
                    />
                  </Box>
                ))}
            </div>
          </div>
        </div>
        <div className="col-3">
          <SidebarRight />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExploreTopik;
