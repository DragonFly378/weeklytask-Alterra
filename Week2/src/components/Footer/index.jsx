import React from "react";
import logo from "../../assets/images/logoFooter.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="section-footer mt-5 ">
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-lg-6 m-auto">
                  <div className="d-flex justify-content-center">
                    <a className="logo me-3 col-lg-6 " href="#">
                      <img src={logo} alt="logo" />
                    </a>{" "}
                    <div className="copy mt-3 col-lg-6 ">
                      Copyright UI/UX Designer 2022 || Muhammad Yogi
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-5 konten m-auto">
                  <div className="d-flex justify-content-center">
                    <Link className=" col-lg-2 col-2" to="/#">
                      Home
                    </Link>
                    <Link className="me-3 col-lg-2 col-2" to="/#">
                      Trending
                    </Link>
                    <Link className="me-3 col-lg-2 col-2" to="/#">
                      Notifikasi
                    </Link>
                    <Link className="me-3 col-lg-3 col-2" to="/#">
                      Explore Topik
                    </Link>
                    <Link className="col-lg-2 col-2" to="/#">
                      Terbaru
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
