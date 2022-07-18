import React from "react";

import "./Users.scss";

import IconProfile from "../IconProfile";

const Users = ({ data }) => {
  return (
    <>
      <div className="col-1 user-pict">
        <IconProfile data={data} />
      </div>
      <div className="col-2 user-name-and-email">
        <h5 className="user-name">{data.username}</h5>
        <p className="user-email">{data.email}</p>
      </div>
    </>
  );
};

export default Users;
