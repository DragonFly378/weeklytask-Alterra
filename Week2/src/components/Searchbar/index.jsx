import React, { useState } from "react";
import "./Searchbar.scss";

import iconSearch from "../../assets/icon/iconSearch.png";
import { createSearchParams, useNavigate } from "react-router-dom";
import { setIn } from "formik";

const Searchbar = () => {
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate({
        pathname: "/",
        search: createSearchParams({
          title: input,
        }).toString(),
      });
    }
  };
  return (
    <div className="input-search">
      <input
        type="text"
        className="form-control input-field"
        id="search"
        placeholder="Cari Topik Diskusi Disini Yuk"
        autoComplete="off"
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}
      />
      <img src={iconSearch} alt="icon search" className="icon-search" />
    </div>
  );
};

export default Searchbar;
