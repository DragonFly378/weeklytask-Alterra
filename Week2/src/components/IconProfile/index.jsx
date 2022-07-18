import { Avatar } from "@mui/material";
import React from "react";

import "./IconProfile.scss";

const IconProfile = ({ data }) => {
  return (
    <Avatar
      className="foto"
      alt={data?.username}
      src={data?.image}
      style={{ display: "inline-block" }}
    />
  );
};

export default IconProfile;
