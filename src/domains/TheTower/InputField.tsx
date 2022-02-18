import { MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";

import { InputWrapper, LabelWrapper } from "./TheTower.elements";

export enum FieldType {
  STRING = "STRING",
  NUMBER = "NUMBER",
}

type InputFieldProps = {
  name: string;
  handleChange: (name: string, value: any) => void;
  fieldType: FieldType;
  label?: string;
};

export const InputField = ({
  name,
  handleChange,
  fieldType,
  label,
}: InputFieldProps) => {
  label = label ?? name;
  const [value, setValue] = useState(10);

  const onchange = (e: any) => {
    if (fieldType === FieldType.NUMBER) {
      handleChange(name, parseFloat(e.target.value));
    } else {
      handleChange(name, e.target.value);
    }

    setValue(e.target.value);
  };
  return (
    <InputWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <TextField
        variant="filled"
        label={label}
        id={name}
        value={value}
        onChange={onchange}
      ></TextField>
    </InputWrapper>
  );
};
