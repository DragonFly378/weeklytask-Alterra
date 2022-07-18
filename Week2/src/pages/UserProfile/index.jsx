import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* React Bootstrap */
import { Tabs, Tab } from "react-bootstrap";

import Navigationbar from "../../components/Navbar";
import { SidebarLeft } from "../../components/Sidebar";
import Footer from "../../components/Footer";
import CardPost from "../../components/CardPost";
import HomeCard from "../../components/Card/HomeCard";

import fgdApi from "../../api/fgdApi";

import HeaderProfile from "../../components/HeaderProfile";

import "./UserProfile.scss";
import Cookies from "js-cookie";
import HeaderLite from "../../components/HeaderProfile/HeaderLite";

const UserProfile = () => {
  const { id } = useParams();

  // const tokenCookies = Cookies.get("token");
  const userId = Cookies.get("id");

  const profileData = [
    {
      title: "Pengikut",
      number: 5,
      key: "followers",
    },
    {
      title: "Mengikuti",
      number: 5,
      key: "following",
    },
    {
      title: "Thread",
      number: 20,
      key: "thread",
    },
  ];
  const [userAttribute, setUserAttribute] = useState({});

  const [selfAccount, setSelfAccount] = useState({});

  const [listThread, setListThread] = useState([]);

  // const handleLike = async (id) => {
  //   let res = null;
  //   res = await fgdApi.likeThread(id, tokenCookies);
  //   // console.log(res);
  // };
  const getUserById = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);

    const data = res.data;
    // console.log(data);
    setUserAttribute(data);
    // return res.data;
    // console.log(userAttribute);
  };

  const getSelfAccount = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);

    const data = res.data;
    // console.log(data);
    setSelfAccount(data);
    // return res.data;
    // console.log(selfAccount);
  };

  useEffect(() => {
    const getThreadByUserId = async (id) => {
      let res = null;

      res = await fgdApi.getThreadByUserId(id);
      const data = res?.data.content;
      setListThread(data);
      // console.log(data);
      // console.log(listThread);
    };

    getUserById(id);
    getThreadByUserId(id);
    getSelfAccount(userId);
  }, []);

  // const reload = async (id) => {
  //   let res = null;
  //   res = await fgdApi.getUserById(id);

  //   const data = res.data;
  //   console.log(data);
  //   setUserAttribute(data);
  //   // return res.data;
  //   console.log(userAttribute);
  // };

  return (
    <>
      <div className="user-profile-section">
        <Navigationbar />
        <section className="body-section ">
          <div className="row">
            <div className="sidebar-left col-3">
              <SidebarLeft />
            </div>
            <div className="content-section col-9 container-fluid">
              <div className="col-12">
                <HeaderProfile data={userAttribute} getUserById={getUserById} />
                <div className=" tab-section row  mb-5">
                  <Tabs
                    defaultActiveKey="thread"
                    id="uncontrolled-tab-example"
                    className="mb-3 data-number justify-content-center"
                  >
                    <Tab
                      eventKey={profileData[0].key}
                      title={
                        <>
                          {" "}
                          <p>{profileData[0].title}</p>
                          <p>{userAttribute.total_user_followers}</p>
                        </>
                      }
                    >
                      <div className="tab-item-wrapper ">
                        <div className="followers-tabs card-tabs ">
                          {userAttribute.user_followers?.map(
                            (item, itemIdx) => (
                              <div
                                className="row mb-4 justify-content-center"
                                key={itemIdx}
                              >
                                <HeaderLite
                                  getUserById={getSelfAccount}
                                  user={selfAccount}
                                  name={item.user_follower?.username}
                                  email={item.user_follower?.email}
                                  gambar={item.user_follower?.image}
                                  guestId={item.user_follower?.id}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey={profileData[1].key}
                      title={
                        <>
                          {" "}
                          <p>{profileData[1].title}</p>
                          <p>{userAttribute.total_user_following}</p>
                        </>
                      }
                    >
                      <div className="tab-item-wrapper">
                        <div className="following-tabs card-tabs ">
                          {userAttribute.user_following?.map(
                            (item, itemIdx) => (
                              <div
                                className="row mb-4 justify-content-center"
                                key={itemIdx}
                              >
                                <HeaderLite
                                  getUserById={getSelfAccount}
                                  user={selfAccount}
                                  name={item.user_followed?.username}
                                  email={item.user_followed?.email}
                                  gambar={item.user_followed?.image}
                                  guestId={item.user_followed?.id}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </Tab>

                    <Tab
                      eventKey={profileData[2].key}
                      title={
                        <>
                          {" "}
                          <p>{profileData[2].title}</p>
                          <p>{listThread?.length}</p>
                        </>
                      }
                    >
                      <div className="tab-item-wrapper">
                        {" "}
                        <div className="card-threads">
                          {listThread?.reverse().map((item, itemIdx) => (
                            <HomeCard
                              key={itemIdx}
                              data={item}
                              likeData={item.likes}
                            />
                          ))}
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;
