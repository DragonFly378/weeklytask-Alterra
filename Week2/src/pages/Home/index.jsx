import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallMadeIcon from "@mui/icons-material/CallMade";
import HomeCard from "../../components/Card/HomeCard";
import { SidebarLeft, SidebarRight } from "../../components/Sidebar/index";
import Navigationbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TuneIcon from "@mui/icons-material/Tune";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import fgdApi from "../../api/fgdApi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

const Home = () => {
  // const { token } = useSelector((state) => state.login);
  const tokenCookies = Cookies.get("token");
  // console.log(tokenCookies);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const fillter = [
    // {
    //   name: "Terbaru",
    //   icon: AccessTimeIcon,
    //   link: "/",
    //   isActive: true,
    // },
    // // {
    // //   name: "Trending",
    // //   icon: CallMadeIcon,
    // //   link: "/trending",
    // //   isActive: false,
    // // },
    {
      name: "Kategori",
      icon: TuneIcon,
      link: "/explore-topik",
      isActive: false,
    },
  ];

  const [listThread, setListThread] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  const getUser = async () => {
    let res = null;
    const params = {};
    res = await fgdApi.getAllUser(params);
    // console.log(res.data);
  };

  const getThread = async () => {
    let res = null;
    const params = {};
    res = await fgdApi.getThread(params);
    console.log(res.data);
    setListThread(res.data.content);
    setPageCount(res.data.totalPages);
  };

  const getSearchThread = async () => {
    let res = null;
    const params = {
      title: searchParams.get("title"),
    };
    try {
      res = await fgdApi.getSearchThread(params);
      setListThread(res.data.content);
      setPageCount(res.data.totalPages);
    } catch (error) {
      console.log(error);
      setListThread([]);
      setPageCount(1);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (searchParams.get("title")) {
      console.log("masuk");
      console.log(searchParams.get("title"));
      getSearchThread();
    } else {
      getThread();
    }
  }, [searchParams.get("title")]);

  const handlePageClick = (data) => {
    let curentPage = data.selected;
    console.log(curentPage);
    const getThread = async () => {
      let res = null;
      if (searchParams.get("title")) {
        const params = { curentPage, title: searchParams.get("title") };
        res = await fgdApi.getSearchThread(params);
      } else {
        const params = { curentPage };
        res = await fgdApi.getThread(params);
      }
      console.log(res.data);
      setListThread(res?.data.content);
    };
    getThread();
  };

  return (
    <>
      <Navigationbar listThread={listThread} setListThread={setListThread} />
      <Grid container minHeight="80vh" pt="2vh">
        <Grid item md={3}>
          <SidebarLeft />
        </Grid>
        <Grid item md={6} mt="9rem">
          <Box display="flex">
            {fillter.map((item, itemIdx) => (
              <Link key={itemIdx} to={item.link}>
                <Button
                  key={itemIdx}
                  href={item.link}
                  variant={item.isActive === true ? "contained" : "outlined"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    marginRight: "3vw",
                    color: item.isActive ? "white" : "#26B893",
                    bgcolor: item.isActive ? "#26B893" : "white",
                    "&:hover": {
                      color: item.isActive ? "white" : "#26B893",
                      bgcolor: item.isActive ? "#26B893" : "white",
                    },
                  }}
                >
                  <item.icon />
                  <span style={{ marginLeft: "1vw" }}>{item.name}</span>
                </Button>
              </Link>
            ))}
          </Box>
          <Box pt="3vh">
            {listThread?.map((item, itemIdx) => (
              <Box key={itemIdx} py="4vh">
                <HomeCard
                  key={item.id}
                  data={item}
                  likeData={item.likes}
                  getThread={getThread}
                  commentData={item.comments?.map(
                    (comment, commentIdx) => comment
                  )}
                  handlePageClick={handlePageClick}
                />
              </Box>
            ))}
            <div>
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </div>
          </Box>
        </Grid>

        <Grid item md={3} pl="2vw" mt="5rem">
          <SidebarRight />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Home;
