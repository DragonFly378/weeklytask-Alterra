import React, { useState, useEffect } from "react";
import imgbanner from "../../assets/icon/Login.png";
import { Link, useNavigate } from "react-router-dom";
// import Form from "../../components/Form";
import Footer from "../../components/Footer";
import Button from "../../components/Button/Button";

import fgdApi from "../../api/fgdApi";
import "./Signup.scss";
import Swal from "sweetalert2";

import { Formik, Form } from "formik";
import CustomInput from "../../components/Form/CustomInput";
import { registSchemas } from "../../components/Form/Schemas";

import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([
    {
      label: "Username",
      type: "text",
      placeholder: "Masukkan username anda ",
      name: "username",
      value: "",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Masukan email anda",
      name: "email",
      value: "",
    },
    {
      label: "Kata Sandi",
      type: "password",
      placeholder: "Type your password",
      name: "password",
      value: "",
    },
    {
      label: "Ketik Ulang Sandi",
      type: "password",
      placeholder: "Re-type your password",
      name: "passwordConfirmation",
      value: "",
    },
  ]);

  // console.log(data);

  const getRegister = async (values) => {
    let res = null;
    const params = {
      email: values.email,
      password: values.password,
      total_user_followers: 0,
      username: values.username,
    };
    try {
      res = await fgdApi.register(params);
      console.log(res.message);

      Swal.fire({
        title: "Success",
        text: "Yeay akun berhasil terdaftar",
        icon: "success",
        confirmButtonText: "OK",
      }).then(navigate("/login"));
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: error.response.data.data,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const onSubmitHandler = async (values, actions) => {
    console.log(values);
    getRegister(values);
  };

  useEffect(() => {
    const getAuth = Cookies.get("token");
    if (getAuth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="signup-section col-md-12 ">
        {/* <Navigationbar /> */}
        <div
          className="container"
          style={{ minHeight: "70vh", marginTop: "6rem" }}
        >
          <div className="row">
            <div className="konten ">
              <div className="row">
                <div className="col-lg-6 col-md-12 m-auto">
                  {<KontenKiri />}
                </div>
                <div className="col-lg-6 col-md-12 m-auto">
                  <div className="kanan">
                    <h2>Selamat datang silahkan daftar</h2>
                    <p className="halo"> Halo lagi, Anda telah dirindukan!</p>

                    <div className="form-section pt-3">
                      <Formik
                        initialValues={{
                          username: "",
                          email: "",
                          password: "",
                        }}
                        validationSchema={registSchemas}
                        onSubmit={onSubmitHandler}
                        enableReinitialize={true}
                      >
                        {(props) => (
                          <Form className="row g-3">
                            {inputs.map((input, inputIdx) => (
                              <div key={inputIdx} className="konten-form ">
                                <CustomInput
                                  label={input.label}
                                  name={input.name}
                                  type={input.type}
                                  placeholder={input.placeholder}
                                  classInput="form-control"
                                  classLabel="form-label"
                                />
                              </div>
                            ))}

                            <div>
                              <Button
                                title="Daftar"
                                type="submit"
                                className={`submit-regist btn  `}
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>

                      {/* <form onSubmit={handleSubmitForm}>
                        {inputs.map((input, inputIdx) => (
                          <div key={inputIdx} className="konten-form mb-3">
                            <Form
                              changeHandler={onChangeHandler}
                              inputs={input}
                              setInputs={setInputs}
                              submit={handleSubmitForm}
                              // validation={...}
                            />
                          </div>
                        ))}
                        {inputs[2].value === "" ? (
                          <></>
                        ) : inputs[2].value !== inputs[3].value ? (
                          <>
                            <p className="text-danger mb-2">
                              **password tidak sama
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-success mb-2">
                              **password sama{" "}
                            </p>
                          </>
                        )}
                        <Button
                          onClick={handleSubmitForm}
                          title="Daftar"
                          type="submit"
                          className={`submit-regist btn  ${
                            inputs[0].value === "" ||
                            inputs[1].value === "" ||
                            inputs[2].value === "" ||
                            inputs[3].value === ""
                              ? "disabled"
                              : inputs[2].value !== inputs[3].value
                              ? "disabled"
                              : " "
                          }`}
                        />
                      </form> */}
                      <p style={{ color: "#959AA1" }} className="text-center">
                        sudah punya akun?{" "}
                        <Link style={{ color: "#26B893" }} to="/login">
                          klik disini
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

const KontenKiri = () => {
  return (
    <>
      <div className="kiri">
        <img src={imgbanner} alt="banner-profile" />
      </div>
    </>
  );
};

export default Signup;
