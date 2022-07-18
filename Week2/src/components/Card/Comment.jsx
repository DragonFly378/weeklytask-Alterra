import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CostumeButton from "../Button/CostumeButton";

import fgdApi from "../../api/fgdApi";

export default function Comment({ comment }) {
  const greyColor = { color: "#9E9E9E" };

  // console.log("ini di comment", comment);

  const [userAttribute, setUserAttribute] = useState({});

  const getUserById = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);

    const data = res.data;
    // console.log(data);
    setUserAttribute(data);
    // return res.data;
    // console.log("ini data user di comment", userAttribute);
  };

  useEffect(() => {
    getUserById(comment.user.id);
  }, []);

  return (
    <Box borderRadius="20px" py="3vh" px="2vw" ml="40px">
      <Grid container>
        <Grid item>
          <Avatar
            alt={userAttribute.username}
            src={userAttribute.image}
            style={{ width: "30px", height: "30px" }}
          />
        </Grid>
        <Grid item xs pl="1vw">
          <Grid container>
            <Grid item xs>
              <Box display="flex">
                <Box>
                  <div style={{ fontSize: "18px" }}>
                    {userAttribute.username}
                  </div>
                </Box>
                {/* {comment.isVerified && (
                  <img src="assets/icon/verified.png" height="20vh" />
                )} */}
              </Box>
              <div style={{ marginTop: "1vh", fontSize: "14px" }}>
                {comment.comment}
              </div>
            </Grid>
            <Grid item style={greyColor}>
              <div> {comment.created_at.substr(11, 5)} </div>
            </Grid>
          </Grid>
          <Grid container mt="1vh">
            <Grid item xs>
              <CostumeButton> Reply </CostumeButton>
              <CostumeButton> Share </CostumeButton>
              <CostumeButton> Report </CostumeButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
