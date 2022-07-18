import { useState, useEffect } from "react";
import "./Sidebar.scss";
import image from "../../assets/icon-sidebar/team-logo.png";
import Plus from "../../assets/icon-sidebar/Plus.png";
import Plus1 from "../../assets/icon-sidebar/Plus (1).png";
import user from "../../assets/icon-sidebar/user-saran.png";
import ArrowUp from "../../assets/icon-sidebar/ArrowUp.png";
// import man4 from "../../assets/icon-sidebar/man4.png";

import { data } from "./SidebarData";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import fgdApi from "../../api/fgdApi";
import { Avatar } from "@mui/material";

export const SidebarLeft = () => {
  return (
    <div className="sidebar-left">
      <ul>
        <p className="menu">MENU</p>
        {data.left.map((val, index) => {
          const token = Cookies.get("token");

          token
            ? (data.left[4].link = "/profile")
            : (data.left[4].link = "/login");

          return (
            <Link to={val.link} key={index}>
              <li
                key={index}
                className={
                  window.location.pathname === val.link ? "li-active" : null
                }
              >
                <div className="icon">
                  {window.location.pathname === val.link ? val.icon2 : val.icon}
                </div>

                <div className="text">{val.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>

      <div className="sidebar-group">
        <div className="sidebar-bg-color">
          <img src={image} alt="" width={200} className="sidebar-image" />
          <button className="rounded">
            <img src={ArrowUp} alt="" /> Mari Berdiskusi
          </button>
        </div>
      </div>
    </div>
  );
};

export const SidebarRight = () => {
  const [allUser, setAllUser] = useState([]);

  const token = Cookies.get("token");

  const id = Cookies.get("id");

  const getAllUser = async () => {
    let res = null;
    const params = {};
    res = await fgdApi.getAllUser(params);
    // console.log(res.data);
    setAllUser(res.data.content);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const followHandleClick = async (e, guestUserId) => {
    e.preventDefault();
    // console.log(guestUserId);
    await fgdApi.followUser(guestUserId, token);
    // console.log(res.data);
    getAllUser();
  };

  // console.log(allUser);
  return (
    <div className="sidebar-right">
      <div className="saran-group">
        <p className="saran">SARAN</p>
        <img src={user} alt="" height={40} />
      </div>
      <ul>
        {allUser.map((val, index) => {
          return (
            <li className="" key={index}>
              <Link to={`user/${val.id}`}>
                <div className="icon">
                  <Avatar alt={val.username} src={val.image} />
                </div>
              </Link>
              <Link to={`user/${val.id}`}>
                <p className="name">{val.username}</p>
              </Link>
              {val.user_followers?.filter(
                (is_follow) => is_follow.user_follower.id == id
              ).length > 0 ? (
                <button
                  className="button"
                  onClick={(e) => {
                    followHandleClick(e, val.id);
                  }}
                >
                  <img src={Plus1} alt="" width={18} />
                  mengikuti
                </button>
              ) : (
                <button
                  className="button"
                  onClick={(e) => {
                    followHandleClick(e, val.id);
                  }}
                >
                  <img src={Plus} alt="" width={18} />
                  ikuti
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
