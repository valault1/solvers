import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../../theme";
import { FieldType, InputField } from "./InputField";
import { MainCard, TheTowerContainer } from "./TheTower.elements";

type TheTowerControllerProps = {};

export const TheTowerController = ({}: TheTowerControllerProps) => {
  const fields = [
    { name: "testField1", type: FieldType.STRING },
    { name: "testField2", type: FieldType.STRING },
    { name: "testField3", type: FieldType.STRING },
    { name: "testField4", type: FieldType.STRING },
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
          return (
            <InputField
              name={field.name}
              handleChange={handleChange}
              fieldType={field.type}
            />
          );
        })}
        The current values:
        {JSON.stringify(values)}
      </MainCard>
    </TheTowerContainer>
  );
};
