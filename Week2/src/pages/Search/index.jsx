import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Footer from "../../components/Footer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallMadeIcon from "@mui/icons-material/CallMade";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HomeCard from "../../components/Card/HomeCard";
import { SidebarLeft, SidebarRight } from "../../components/Sidebar/index";
import Navigationbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";

import fgdApi from "../../api/fgdApi";
import Cookies from "js-cookie";

const Search = () => {
  const tokenCookies = Cookies.get("token");
  const fillter = [
    { name: "Terbaru", icon: AccessTimeIcon, link: "/", isActive: false },
    {
      name: "Trending",
      icon: CallMadeIcon,
      link: "/trending",
      isActive: true,
    },
    {
      name: "Kategori",
      icon: FormatListBulletedIcon,
      link: "/explore-topik",
      isActive: false,
    },
  ];

  const [listThread, setListThread] = useState([]);

  const handleLike = async (id) => {
    await fgdApi.likeThread(id, tokenCookies);
  };

  useEffect(() => {
    const getUser = async () => {
      const params = {};
      await fgdApi.getAllUser(params);
    };

    const getThread = async () => {
      let res = null;
      const params = {};
      res = await fgdApi.getThread(params);
      console.log(" ini listThread", res.data.content);
      setListThread(res.data.content);
    };

    getUser();
    getThread();
  }, []);

  const handlePageClick = (data) => {
    let curentPage = data.selected;

    const getThread = async () => {
      let res = null;
      const params = { curentPage };
      res = await fgdApi.getThread(params);
      // console.log(res.data);
      setListThread(res.data.content);
    };
    getThread();
  };

  console.log("ini list", listThread);

  // ini coba search

  const [inputSearch, setInputSearch] = useState({
    title: "",
  });

  const handleInputSearch = (value, key) => {
    const newInputs = { ...inputSearch };

    newInputs[key] = value;

    setInputSearch(newInputs);

    console.log(newInputs);
  };

  const [listThreadSearch, setListThreadSearch] = useState({});

  const getThreadByTitle = async (title) => {
    let res = null;
    res = await fgdApi.getThreadByTitle(title, tokenCookies);
    console.log(res.data);
    const data = res.data;
    setListThreadSearch(data);
  };

  const handleKeyDown = (event) => {
    // console.log("User pressed: ", event.key);

    // console.log(message);

    if (event.key === "Enter") {
      // 👇️ your logic here
      console.log("Enter key pressed ✅");

      getThreadByTitle(inputSearch.title);
    }
  };

  console.log(listThreadSearch);

  return (
    <>
      <Navigationbar
        value={inputSearch.title}
        handleInputSearch={handleInputSearch}
        handleKeyDown={handleKeyDown}
      />
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
                    borderRadius: "15px",
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
                  key={itemIdx}
                  data={item}
                  likeData={item.likes?.map((like, likeIdx) => like)}
                  handleLike={handleLike}
                />
              </Box>
            ))}
            <div>
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={listThread.length}
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

export default Search;
