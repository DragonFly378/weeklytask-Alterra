import { Avatar } from "@mui/material";
import React from "react";
// import Icon from "../../assets/images/icon-profile.png";
import Button from "../Button/Button";
import fgdApi from "../../api/fgdApi";
import Cookies from "js-cookie";

const HeaderLite = ({ name, email, gambar, user, guestId, getUserById }) => {
  const tokenCookies = Cookies.get("token");
  const userId = Cookies.get("id");
  // console.log(user);

  const followHandleClick = async (e, guestUserId) => {
    e.preventDefault();
    await fgdApi.followUser(guestUserId, tokenCookies);
    // console.log(res.data);
    getUserById(userId);
  };
  return (
    <>
      <div className="col-md-8  ">
        <div className="d-flex ">
          <div className="photo-user col-md-1">
            <Avatar alt={name} src={gambar} />
          </div>
          <div className="name-email col-md-5 ms-3">
            <p className="name">{name}</p>
            <p className="mail">{email}</p>
          </div>
          <div className="editBtn col-md-3 ms-auto">
            {user.user_following?.filter(
              (is_follow) => is_follow.user_followed?.id == guestId
            ).length > 0 ? (
              <Button
                type="button"
                className="btn btnIkuti"
                title="✓ mengikuti"
                onClick={(e) => {
                  followHandleClick(e, guestId);
                }}
              />
            ) : (
              <Button
                type="button"
                className="btn btnIkuti"
                title="+ Ikuti"
                onClick={(e) => {
                  followHandleClick(e, guestId);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderLite;
