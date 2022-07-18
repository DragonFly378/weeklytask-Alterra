import React, { useState, useEffect } from "react";
import Navigationbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SidebarLeft, SidebarRight } from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import gold from "../../assets/icon/ranking-gold.png";
import man from "../../assets/icon/manProfile.png";
import love from "../../assets/icon/love.png";
import hair from "../../assets/icon/hair.png";
import fgdApi from "../../api/fgdApi";
import "./Ranking.scss";
const Ranking = () => {
  const [allRanking, setAllRanking] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getAllRanking = async () => {
    let res = null;
    const params = {};
    res = await fgdApi.getRanking(params);
    // console.log(res.data);
    setAllRanking(res.data.content);
    setPageCount(res.data.totalPages);
  };

  useEffect(() => {
    getAllRanking();
  }, []);

  const handlePageClick = (data) => {
    let curentPage = data.selected;
    // console.log(curentPage);
    const getAllUser = async () => {
      let res = null;
      const params = { curentPage };
      res = await fgdApi.getRanking(params);
      // console.log(res.data);
      setAllRanking(res.data.content);
    };

    getAllUser();
  };
  // console.log(allRanking);

  function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {
      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round((number * decPlaces) / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
      }
    }

    return number;
  }
  return (
    <>
      <Navigationbar />
      <div className="row">
        <div className="col-3">
          <SidebarLeft />
        </div>
        <div className="col-9">
          <div className="content">
            <h3>
              Ranking User{" "}
              <i>
                <img src={gold} alt="" width={30} />
              </i>
            </h3>
            <div className="ranking">
              {allRanking.map((item, index) => {
                return (
                  <div className="ranking-item" key={index}>
                    <div className="index">{index + 1}</div>
                    <div className="image">
                      <img
                        src={item.image}
                        alt=""
                        width={40}
                        className="image"
                      />
                    </div>
                    <div className="username">
                      <p>{item.username}</p>
                    </div>
                    <div className="follow">
                      {item.total_user_followers} Pengikut
                    </div>
                    <div className="follow">
                      {item.total_user_following} Mengikuti
                    </div>
                    <div className="total_like">
                      <i>
                        <img src={love} alt="" width={20} />
                      </i>{" "}
                      {abbrNum(item.total_like_thread, 0)}
                    </div>
                    <div className="total_thread">
                      <i>
                        <img src={hair} alt="" width={20} />
                      </i>
                      {abbrNum(item.total_threads, 0)}
                    </div>
                  </div>
                );
              })}
            </div>
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

export default Ranking;
