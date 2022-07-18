import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navigationbar from "../../components/Navbar";
import { SidebarLeft } from "../../components/Sidebar";
import Footer from "../../components/Footer";
import HeaderProfile from "../../components/HeaderProfile";
import "./EditProfile.scss";

import Cookies from "js-cookie";
import fgdApi from "../../api/fgdApi";

import { Formik, Form } from "formik";
import CustomInput from "../../components/Form/CustomInput";
import { schemas } from "../../components/Form/Schemas";
import CustomSelect from "../../components/Form/CustomSelect";

import Swal from "sweetalert2";

const EditProfile = () => {
  const [userAttribute, setUserAttribute] = useState({});
  const navigate = useNavigate();
  const userId = Cookies.get("id");
  const tokenCookies = Cookies.get("token");
  // console.log(userId);

  const getUserById = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);

    const data = res.data;
    // console.log(data);
    setUserAttribute(data);

    // console.log(userAttribute.first_name);
  };

  const editProfile = async (data) => {
    let res = null;
    res = await fgdApi.editProfile(data, tokenCookies);
    // console.log(res);

    if (res.message === "Success!") {
      await Swal.fire({
        title: "Success",
        text: "Data berhasil disimpan !",
        icon: "success",
        confirmButtonText: "OK",
        timer: 1500,
        timerProgressBar: true,
      });
      navigate("/profile");
    }
  };

  const onSubmitHandler = async (values, actions) => {
    // console.log(values);

    const formData = new FormData();
    formData.append("json", JSON.stringify(values));
    // console.log(formData);

    editProfile(formData);
  };

  useEffect(() => {
    getUserById(userId);
  }, []);

  return (
    <>
      <Navigationbar />
      <div className="row">
        <div className="col-3">
          <SidebarLeft />
        </div>
        <div className="col-9">
          <div className="header-profile">
            <HeaderProfile data={userAttribute} getUserById={getUserById} />
          </div>

          <div className="section-form">
            <div className="title-edit-profile">EditProfile</div>

            <Formik
              initialValues={{
                first_name: userAttribute?.first_name,
                last_name: userAttribute?.last_name,
                phone: userAttribute?.phone,
                email: userAttribute?.email,
                birth_date: userAttribute?.birth_date,
                education: userAttribute?.education,
                country: userAttribute?.country,
                city: userAttribute.city,
                zip_code: userAttribute?.zip_code,
              }}
              validationSchema={schemas}
              onSubmit={onSubmitHandler}
              enableReinitialize={true}
            >
              {(props) => (
                <Form className="row g-3">
                  <div className="col-md-6">
                    <CustomInput
                      label="Nama Depan"
                      name="first_name"
                      type="text"
                      placeholder="Masukan nama depan"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomInput
                      label="Nama Belakang"
                      name="last_name"
                      type="text"
                      placeholder="Masukan nama belakang"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="No Handphone"
                      name="phone"
                      type="number"
                      placeholder="+62 | Masukan nomor handphone"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Masukkan Email"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Tanggal Lahir"
                      name="birth_date"
                      type="date"
                      placeholder="Masukan tanggal lahir"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomSelect
                      label="Pendidikan Terakhir"
                      name="education"
                      placeholder="Masukkan pendidikan terakhir"
                      classSelect="form-select"
                      classLabel="form-label"
                    >
                      <option defaultValue>Masukan Tingkat Pendidikan</option>
                      <option value="1">SMP</option>
                      <option value="2">SMA/SMK</option>
                      <option value="3">S1/D3</option>
                    </CustomSelect>
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Negara"
                      name="country"
                      type="text"
                      placeholder="Masukan nama negara"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Kota"
                      name="city"
                      type="text"
                      placeholder="Masukan kota"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div className="col-md-12">
                    <CustomInput
                      label="Kode Pos"
                      name="zip_code"
                      type="number"
                      placeholder="Masukan kode pos"
                      classInput="form-control"
                      classLabel="form-label"
                    />
                  </div>
                  <div>
                    <button className="btn-kembali">kembali</button>
                    <button type="submit" className="btn-simpan">
                      simpan
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Nama Awal
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Masukan Nama Awal"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">
                  Nama AKhir
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Masukan Nama Akhir"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Nomor Handphone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Masukan Nomor Handphone"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Muhammadyogi413@gmail.com"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Masukan Tanggal Lahir"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Tingkat Pendidikan
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue>Masukan Tingkat Pendidikan</option>
                  <option value="1">SMP</option>
                  <option value="2">SMA/SMK</option>
                  <option value="3">S1/D3</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Negara
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Masukan Negara"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Kota
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Masukan Kota"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Kode Pos
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Masukan Kode POS"
                />
              </div>
              <div>
                <button className="btn-kembali">kembali</button>
                <button className="btn-simpan">simpan</button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
