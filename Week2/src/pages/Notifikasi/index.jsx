import React from "react";

import "./Notifikasi.scss";

import Navigationbar from "../../components/Navbar";
import { SidebarLeft } from "../../components/Sidebar";
import Notification from "../../components/Notification";
import Footer from "../../components/Footer";
import Button from "../../components/Button/Button";

const Notifikasi = () => {
  const listNotifType = [
    {
      title: "Semua",
      class: "btn-notif btn-notif-semua",
    },
    {
      title: "Belum Dibaca",
      class: "btn-notif btn-notif-belum-dibaca",
    },
    {
      title: "Baca Semuanya",
      class: "btn-notif btn-notif-baca-semua",
    },
    {
      title: "Hapus Semuanya",
      class: "btn-notif btn-notif-hapus-semua",
    },
  ];

  const listNotifications = [
    {
      type: "comment",
      username: "EmmaRiver01",
      action: " membalas komentar anda",
      read: false,
      comment:
        "Menurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarahMenurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarah",
      commentTime: "Minggu, 22 Juni 2022",
      profile: "/assets/icon/manProfile.png",
    },
    {
      type: "comment",
      username: "AlexBrown",
      action: " membalas komentar anda",
      read: true,
      comment:
        "Kutu adalah serangga yang hidup sebagai parasit pada inang yang berdarah panas, salah satunya manusia. Kutu biasanya menghabiskan hidup mereka di satu inang dan bertelur banyak",
      commentTime: "Minggu, 22 Juni 2022",
      profile: "/assets/icon/manProfile.png",
    },
    {
      type: "follow",
      username: "Ana2007",
      action: " Mulai Mengikuti anda",
      read: true,
      comment: false,
      commentTime: "Minggu, 22 Juni 2022",
      profile: "/assets/icon/manProfile.png",
    },
    {
      type: "comment",
      username: "EmmaRiver01",
      action: " membalas komentar anda",
      read: true,
      comment:
        "Menurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarahMenurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarah",
      commentTime: "Minggu, 22 Juni 2022",
      profile: "/assets/icon/manProfile.png",
    },
    {
      type: "comment",
      username: "EmmaRiver01",
      action: " membalas komentar anda",
      read: false,
      comment:
        "Menurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarahMenurut pendapat saya bahwa bukan cacing, tetapi kutu adalah penemuan paling kontroversial dalam sejarah",
      commentTime: "Minggu, 22 Juni 2022",
      profile: "/assets/icon/manProfile.png",
    },
  ];

  return (
    <div className="notification-section">
      <Navigationbar />
      <section className="body-section ">
        <div className="row">
          <div className="sidebar-left col-3">
            <SidebarLeft />
          </div>
          <div className="content-section col-9 container-fluid">
            <div className="col-10">
              {listNotifType.map((item, itemIdx) => (
                <Button
                  title={item.title}
                  className={item.class}
                  key={itemIdx}
                />
              ))}
              {listNotifications.map((item, itemIdx) => (
                <Notification data={item} key={itemIdx} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Notifikasi;
