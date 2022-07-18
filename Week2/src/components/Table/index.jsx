import React from "react";
import "./Table.scss";
import Plus from "../../assets/icon/table-icon.png";
import Plus1 from "../../assets/icon/status-active.png";

const Table = (props) => {
  // console.log(props.data)
  return (
    <table class="table">
      <thead class="table-light">
        <tr>
          <th scope="col">Nama</th>
          <th scope="col">Email</th>
          <th scope="col">Jenis Kelamin</th>
          <th scope="col">Thread</th>
          <th scope="col">Action</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((user, index) => {
          return (
            <tr>
              <td>
                <div className="d-flex">
                  <img
                    src={user.image}
                    width={35}
                    className="rounded-circle ms-4 me-2"
                    alt=""
                  />{" "}
                  <div>{user.username}</div>
                </div>
              </td>
              <td className="text-email">{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.total_threads}</td>

              <td>
                <img src={Plus} width={35} alt="" />
              </td>
              <td>
                <img src={Plus1} width={60} alt="" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
