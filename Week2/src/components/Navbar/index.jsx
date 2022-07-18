import React, { useState, useEffect } from "react";
import "./Navbar.scss";

import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logoNavbar.svg";

import IconProfile from "../IconProfile";

import Cookies from "js-cookie";

import Searchbar from "../Searchbar";
import Button from "../Button/Button";
import { NavDropdown } from "react-bootstrap";
import fgdApi from "../../api/fgdApi";

const Navbar = ({ value, handleInputSearch, handleKeyDown }) => {
  const navigate = useNavigate();

  const userId = Cookies.get("id");
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState(null);

  const getUserById = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);
    // console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogin(!isLogin);
    }

    getUserById(userId);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top customNav shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand navBrand" to="/">
          <img src={logo} alt="logo" className="navLogo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarNav">
          {isLogin ? (
            <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Searchbar />
                </li>
                <li className="nav-item">
                  <Link to="/buat-thread">
                    <Button
                      title="Buat Thread"
                      background="white"
                      type="button"
                      className="btn-create-new-thread"
                      iconKiri="iconCreate"
                    />
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                  <NavDropdown
                    title={<IconProfile data={data} />}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      My Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => {
                        Cookies.remove("token");
                        Cookies.remove("id");
                        Cookies.remove("roles");

                        navigate("/login");
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
              </ul>
            </>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/login">
                  <Button
                    title="Masuk"
                    type="button"
                    className="btn-nav-masuk"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  <Button
                    title="Daftar"
                    type="button"
                    className="btn-nav-daftar"
                  />
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
