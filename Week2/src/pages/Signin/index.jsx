import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Container from "react-bootstrap/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { submitLogin } from "../../store/Login";

import fgdApi from "../../api/fgdApi";
import Cookies from "js-cookie";

export default function Login() {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.login);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState([
    {
      label: "Username",
      type: "text",
      placeholder: "Masukkan username",
      name: "username",
      value: "",
    },
    {
      label: "Kata Sandi",
      type: "password",
      placeholder: "Type your password",
      name: "password",
      value: "",
    },
  ]);

  const onChangeHandler = (e) => {
    setInputs(
      inputs.map((input) => {
        if (input.name === e.target.name) {
          input.value = e.target.value;
        }
        return input;
      })
    );
  };

  const getUserById = async (id) => {
    let res = null;
    res = await fgdApi.getUserById(id);
    // console.log(res.data);
    Cookies.set("roles", res.data?.roles);
  };

  const getLogin = async () => {
    let res = null;
    const params = {
      username: inputs[0].value,
      password: inputs[1].value,
    };
    try {
      res = await fgdApi.login(params);
      // console.log(res);
      const token = res.data.token;
      const userId = res.data.id;
      dispatch(submitLogin({ token: token, id: userId }));

      Swal.fire({
        title: "Success",
        text: "Yeay login berhasil",
        icon: "success",
        confirmButtonText: "OK",
      });

      getUserById(res.data.id);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Akun tidak terdaftar / Password salah",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    getLogin();
  };

  useEffect(() => {
    const getAuth = Cookies.get("token");
    if (getAuth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Grid container minHeight="70vh" alignItems="center" marginTop="6rem">
          <Grid item xs={12} md={6}>
            <img src="/assets/icon/Login.png" alt="loginImage" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box pl="1vw">
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#26B893",
                  fontSize: "28px",
                  width: "327px",
                  fontWeight: "600",
                }}
              >
                Halo! Selamat datang kembali!
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  color: "#ABABAB",
                  width: "327px",
                  fontWeight: "400",
                }}
              >
                Halo lagi, Anda telah dirindukan!
              </Typography>
              <Box pt="1vw">
                <Form onSubmit={handleSubmitForm}>
                  {inputs.map((input, inputIdx) => (
                    <Form.Group
                      key={inputIdx}
                      className="mb-3"
                      controlId="formBasicEmail"
                    >
                      <Form.Label style={{ color: "#26B893" }}>
                        {input.label}
                      </Form.Label>
                      <Form.Control
                        onChange={onChangeHandler}
                        value={input.value}
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        autoComplete="on"
                      />
                    </Form.Group>
                  ))}

                  <Link
                    to="/lupa-password"
                    style={{ textDecoration: "none", color: "#26B893" }}
                  >
                    Lupa password ?
                  </Link>
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#26B893" }}
                    >
                      Masuk
                    </Button>
                  </div>
                  <center>
                    <p style={{ color: "#959AA1" }}>
                      Belum punya akun ?{" "}
                      <Link style={{ color: "#26B893" }} to="/register">
                        Daftar
                      </Link>
                    </p>
                  </center>
                </Form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
