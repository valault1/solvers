import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../../theme";
import { InputField } from "./InputField";
import { MainCard, TheTowerContainer } from "./TheTower.elements";

type TheTowerControllerProps = {};

export const TheTowerController = ({}: TheTowerControllerProps) => {
  const fields = [
    { name: "testField1" },
    { name: "testField2" },
    { name: "testField3" },
    { name: "testField4" },
  ];
  const initialState: Record<string, any> = {};
  const [values, SetValues] = useState(initialState);

  const handleChange = (name: string, value: any) => {
    let newValues = { ...values };
    newValues[name] = value;
    SetValues(newValues);
  };

  return (
    <TheTowerContainer style={{ color: theme.colors.textPrimary }}>
      <MainCard>
        Welcome to the tower!
        {fields.map((field) => {
          return <InputField name={field.name} handleChange={handleChange} />;
        })}
        The current values:
        {JSON.stringify(values)}
      </MainCard>
    </TheTowerContainer>
  );
};
