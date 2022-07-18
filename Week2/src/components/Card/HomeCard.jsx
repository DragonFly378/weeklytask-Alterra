import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHoriztIcon from "@mui/icons-material/MoreHoriz";
import Stack from "@mui/material/Stack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comment from "./Comment";
import TextField from "@mui/material/TextField";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import Checkbox from "@mui/material/Checkbox";

import ReportIcon from "@mui/icons-material/Report";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import fgdApi from "../../api/fgdApi";

import Swal from "sweetalert2";
import { Toast } from "../Toast/Toast";

export default function HomeCard({
  data,
  likeData,
  getThread,
  handlePageClick,
  getUserById,
}) {
  // const location = useLocation();

  // const path = location.pathname;

  const userId = Cookies.get("id");

  const userRoles = Cookies.get("roles");

  const tokenCookies = Cookies.get("token");

  const [openComment, setOpenComment] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const ITEM_HEIGHT = 48;

  // const dataComment = [
  //   {
  //     username: "Albert Flores",
  //     isVerified: true,
  //     content: "Pixel Buds Pro : Apakah Mampu Melawan AirPods Pro ?",
  //     timePost: "12 hours ago",
  //     profile: "/assets/icon/manProfile.png",
  //     children: [
  //       {
  //         username: "Flores",
  //         isVerified: false,
  //         content: "Pixel Buds Pro : Apakah Mampu Melawan AirPods Pro ?",
  //         timePost: "12 hours ago",
  //         profile: "/assets/icon/manProfile.png",
  //       },
  //       {
  //         username: "Albert",
  //         isVerified: true,
  //         content: "Pixel Buds Pro : Apakah Mampu Melawan AirPods Pro ?",
  //         timePost: "12 hours ago",
  //         profile: "/assets/icon/manProfile.png",
  //       },
  //     ],
  //   },
  // ];

  const deleteUserThread = async (id) => {
    try {
      await fgdApi.deleteThread(id, tokenCookies);
      // console.log(res);
      getThread(userId);

      Swal.fire({
        title: "Deleted",
        text: "Thread berhasil dihapus",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error.response.data.data,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleLike = async (id) => {
    await fgdApi.likeThread(id, tokenCookies);
  };

  const handleSave = async (id) => {
    let res = null;
    res = await fgdApi.saveThread(id, tokenCookies);
    console.log(res.data);
    Toast.fire({
      icon: "success",
      title: res.data?.is_save ? "Thread disimpan" : "Thread batal disimpan",
      iconColor: res.data?.is_save ? "" : "red",
    });
    getUserById(userId);
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah kamu Ingin Mengahapus Trhead ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#26B893",
      cancelButtonColor: "#73777B",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserThread(id);
      } else {
        Swal.fire({
          title: "Canceled",
          text: "Thread batal dihapus",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const reportUserThread = async (id, reported) => {
    const data = {
      thread_id: id,
      report: reported,
    };

    try {
      await fgdApi.reportThread(data, tokenCookies);
      // console.log(res.message);

      Swal.fire({
        title: "Reported",
        text: "Berhasil report thread",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error.response.data.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleReport = (id, reported) => {
    Swal.fire({
      title: "Yakin report thread ini?",
      text: "Thread akan dimasukkan kedalam list report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26B893",
      cancelButtonColor: "#73777B",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        reportUserThread(id, reported);
      } else {
        Swal.fire("Batal", "Thread batal direport", "error");
      }
    });
  };

  const [listComment, setListComment] = useState({});

  const getCommentByIdThread = async (id) => {
    let res = null;
    res = await fgdApi.getCommentByIdThread(id);

    const data = res.data;
    // console.log("ini id thread", id);
    // console.log("ini ini", data);
    setListComment(data);
    // return res.data;
    // console.log("ini data comment by id", listComment);
  };

  useEffect(() => {
    getCommentByIdThread(data.id);
  }, [handlePageClick]);

  const [inputs, setInputs] = useState({
    comment: "",
  });

  const handleInput = (value, key) => {
    const newInputs = { ...inputs };

    newInputs[key] = value;

    setInputs(newInputs);

    // console.log(newInputs);
  };

  const handleSumbitComment = async (id, e) => {
    e.preventDefault();

    let res = null;
    const userComment = {
      thread_id: id,
      comment: inputs.comment,
    };

    if (userComment.comment !== "") {
      res = await fgdApi.postComment(userComment, tokenCookies);
      console.log(res);
    } else {
      console.log("isi komentar dulu");
    }

    setInputs({
      comment: "",
    });

    getCommentByIdThread(data.id);
  };

  return (
    <>
      <Box
        // borderRadius="5px"
        py="2rem"
        px="2vw"
        sx={{ borderBottom: 1, borderColor: "grey.500" }}
        /*boxShadow={1}*/
      >
        <Grid container>
          <Grid item>
            {/* <Avatar alt={data.username} src={data.profile} /> */}{" "}
            <Link
              to={
                userId == data.user?.id ? "/profile" : `/user/${data.user?.id}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Avatar alt={data.username} src={data.user?.image} />
            </Link>
          </Grid>
          <Grid item xs pl="1vw">
            <Grid container>
              <Grid item xs>
                <Box display="flex">
                  <Link
                    to={
                      userId == data.user?.id
                        ? "/profile"
                        : `/user/${data.user?.id}`
                    }
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box>
                      <h5>{data.user?.username}</h5>
                      <Box mt="-10px">
                        <Typography variant="caption">
                          {data.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Box>
                <h4 style={{ marginTop: "1rem" }}>{data.title}</h4>
                <Typography variant="caption">
                  {data.created_at.substr(11, 5)}
                </Typography>
              </Grid>
              <Grid item>
                {userId == data.user?.id ? (
                  <div className="three-dots-menu">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      // onClick={handleClick}
                    >
                      <MoreHoriztIcon
                        fontSize="large"
                        style={{ color: "#26B893" }}
                      />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          // maxHeight: ITEM_HEIGHT * 4.5,
                          minWidth: "10ch",
                        },
                      }}
                    >
                      {" "}
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(data.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item>
                {userRoles === "MODERATOR" ? (
                  <div className="reports-menu">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <ReportOutlinedIcon
                        fontSize="large"
                        style={{ color: "#FC1F1F" }}
                      />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          // maxHeight: ITEM_HEIGHT * 4.5,
                          minWidth: "10ch",
                        },
                      }}
                    >
                      <MenuItem
                        disabled={true}
                        style={{
                          color: "#2C3131",
                          fontWeight: "bold",
                          fontSize: "1.25rem",
                        }}
                      >
                        Pilih Laporan Anda
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleReport(data.id, "Berkata Kasar")}
                      >
                        Berkata Kasar
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleReport(data.id, "Mengandung Sara")}
                      >
                        Mengandung Sara
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleReport(data.id, "Mengandung Hoax")}
                      >
                        Mengandung Hoax
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleReport(data.id, "Mengandung Keributan")
                        }
                      >
                        Mengandung Keributan
                      </MenuItem>
                    </Menu>
                  </div>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
            <Grid style={{ marginTop: "0.5rem" }} container>
              <Grid item xs>
                <Stack spacing={2} direction="row">
                  <Checkbox
                    onClick={() => handleLike(data.id)}
                    icon={
                      <FavoriteBorderIcon
                        style={{
                          color: "#26B893",
                        }}
                      />
                    }
                    checkedIcon={
                      <FavoriteIcon
                        style={{
                          color: "#26B893",
                        }}
                      />
                    }
                    defaultChecked={
                      likeData.filter((like) => like.user_id == userId).length >
                      0
                        ? true
                        : false
                    }
                  />

                  <IconButton
                    aria-label="comment"
                    onClick={() => setOpenComment(!openComment)}
                  >
                    <ChatBubbleOutlineOutlinedIcon
                      style={{
                        color: "#26B893",
                      }}
                    />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={2} direction="row">
                  <IconButton aria-label="view">
                    <VisibilityOutlinedIcon
                      style={{
                        color: "#26B893",
                      }}
                    />
                    <Typography variant="caption" sx={{ ml: "1vw" }}>
                      {/* {data.view} */}120
                    </Typography>
                  </IconButton>

                  <Checkbox
                    onClick={() => handleSave(data.id)}
                    icon={
                      <BookmarkBorderIcon
                        style={{
                          color: "#26B893",
                        }}
                      />
                    }
                    checkedIcon={
                      <BookmarkIcon
                        style={{
                          color: "#26B893",
                        }}
                      />
                    }
                    defaultChecked={
                      data.save?.filter(
                        (savedUser) => savedUser.user?.id == userId
                      ).length > 0
                        ? true
                        : false
                    }
                  />

                  <IconButton aria-label="share">
                    <ShareOutlinedIcon
                      style={{
                        color: "#26B893",
                      }}
                    />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openComment && (
        <>
          {listComment.map((comment, commentIdx) => (
            <div className="comment-section" key={commentIdx}>
              <Comment comment={comment} key={commentIdx} />
              {/* {comment.map((data) => (
                <Box ml="2vw">
                  <Comment data={data} />
                </Box>
              ))} */}
            </div>
          ))}
          <Box display="flex" px="2vw">
            <Avatar alt={data.username} src={data.profile} />
            {/* <input
              type="text"
              name="comment"
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            /> */}
            <TextField
              name="comment"
              fullWidth
              label=" "
              variant="filled"
              sx={{ ml: "1vw" }}
              value={inputs.comment}
              onChange={(e) => handleInput(e.target.value, e.target.name)}
            />
            <IconButton
              name="button-comment"
              size="large"
              sx={{ ml: "1vw" }}
              onClick={(e) => handleSumbitComment(data.id, e)}
            >
              <ArrowCircleRightIcon
                fontSize="large"
                style={{ color: "#4E9BB9" }}
              />
            </IconButton>
          </Box>
        </>
      )}
    </>
  );
}
