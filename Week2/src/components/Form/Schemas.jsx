import * as yup from "yup";

export const schemas = yup.object().shape({
  first_name: yup.string().required("Nama depan wajib diisi"),
  last_name: yup.string(),
  phone: yup.number().required("nomor handphone wajib diisi"),
  email: yup
    .string()
    .email("isi email dengan benar")
    .required("email wajib diisi"),
  birth_date: yup.date().required("tanggal lahir wajib diisi"),
  education: yup
    .number()
    .oneOf([1, 2, 3])
    .required("Silahkan isi tanggal lahir"),
  country: yup.string().required("negara wajib diisi"),
  city: yup.string().required("kota wajib diisi"),
  zip_code: yup
    .number()
    .min(5, "minimal 5 angka")
    .required("kode pos wajib diisi"),
});

export const registSchemas = yup.object().shape({
  username: yup.string().required("username wajib diisi"),
  email: yup
    .string()
    .email("isi email dengan benar")
    .required("email wajib diisi"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number "
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
