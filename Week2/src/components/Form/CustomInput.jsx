import React from "react";
import { useField } from "formik";

const CustomInput = ({ label, classLabel, classInput, ...props }) => {
  const [field, meta] = useField(props);
  // console.log("field", field);
  // console.log("meta", meta);
  return (
    <>
      <label className={classLabel}>{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "input-error" : ""
        } ${classInput}`}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export default CustomInput;
