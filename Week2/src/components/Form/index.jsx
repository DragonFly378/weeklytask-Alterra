import React from "react";

const Form = ({ inputs, submit, changeHandler, btnTitle, type }) => {
  return (
    <>
      <label>{inputs.type}</label>
      <br />
      <input
        required
        onChange={changeHandler}
        type={inputs.type}
        placeholder={inputs.placeholder}
        value={inputs.value}
        name={inputs.name}
        autoComplete="on"
      />
    </>
  );
};

export default Form;
