import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

import { InputWrapper, LabelWrapper } from "./TheTower.elements";

type InputFieldProps = {
  name: string;
  handleChange: (name: string, value: any) => void;
  label?: string;
};

export const InputField = ({ name, handleChange, label }: InputFieldProps) => {
  label = label ?? name;
  const [value, setValue] = useState(10);

  const onchange = (e: any) => {
    handleChange(name, e.target.value);
    setValue(e.target.value);
  };
  return (
    <InputWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={onchange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </InputWrapper>
  );
};
