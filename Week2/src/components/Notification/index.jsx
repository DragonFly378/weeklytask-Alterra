import React from "react";

import "./Notification.scss";

import Button from "../Button/Button";

const Notification = ({ data }) => {
  return (
    <>
      {data.type === "comment" ? (
        <div className="comment-notif">
          <div className="row">
            <div className="col-11">
              <div className="top-section">
                <div className="user-image-section">
                  <img
                    src="/assets/icon/manProfile.png"
                    alt="user-images"
                    className="user-image"
                  />
                </div>
                <div className="header-section">
                  <h2 className="header-text">
                    {data.username}
                    {data.action}
                  </h2>
                </div>
              </div>
              <div className="mid-section">
                <p className="desc-notif">{data.comment}</p>
              </div>
              <div className="bottom-section">
                <p className="date-notif">{data.commentTime}</p>
              </div>
            </div>
            <div className="col-1">
              <img
                src="/assets/icon/rubbish.png"
                alt="rubbish-images"
                className="delete-image"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="follow-notif">
          <div className="row">
            <div className="col-11">
              <div className="top-section">
                <div className="user-image-section">
                  <img
                    src="/assets/icon/manProfile.png"
                    alt="user-images"
                    className="user-image"
                  />
                </div>
                <div className="header-section">
                  <h2 className="header-text">
                    {data.username}
                    {data.action}
                  </h2>
                </div>
              </div>
              <div className="mid-section">
                <div className="desc-notif mt-2 mb-3">
                  <Button
                    title="Terima"
                    type="button"
                    className="btn-follow-terima"
                  />
                  <Button
                    title="Tolak"
                    type="button"
                    className="btn-follow-tolak"
                  />
                </div>
              </div>
              <div className="bottom-section">
                <p className="date-notif">{data.commentTime}</p>
              </div>
            </div>
            <div className="col-1">
              <img
                src="/assets/icon/rubbish.png"
                alt="rubbish-images"
                className="delete-image"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
