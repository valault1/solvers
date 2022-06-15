import { Checkbox, FormControlLabel } from "@mui/material";
import { InputRow, PrimaryButton, TextInput } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { FieldMetadata, FieldType } from "domains/Calculators/sharedTypes";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export const FoodPickerController = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const foodPickerFormMetada: FieldMetadata[] = [
    {
      name: "firstName",
      type: FieldType.STRING,
      label: "First Name",
    },
    {
      name: "lastName",
      type: FieldType.STRING,
      label: "Last Name",
    },
    {
      name: "isFlexible",
      type: FieldType.BOOLEAN,
      label: "Flexible Limit",
    },
  ];

  console.log(watch("First Name")); // watch input value by passing the name of it
  return (
    <MainContainer>
      <h1>Food Picker</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputRow>
          {foodPickerFormMetada.map((field) => (
            <Controller
              name={field.name}
              control={control}
              defaultValue=""
              rules={{ required: `${field.label} required` }}
              render={({ field: { onChange, value } }) => {
                if (field.type === FieldType.STRING) {
                  return (
                    <TextInput
                      label={field.label}
                      value={value}
                      onChange={onChange}
                    />
                  );
                } else if (field.type === FieldType.BOOLEAN) {
                  return (
                    <FormControlLabel
                      label={field.label}
                      control={<Checkbox value={value} onChange={onChange} />}
                    />
                  );
                } else {
                  return <div>That's not a real field...</div>;
                }
              }}
            />
          ))}
        </InputRow>
        <PrimaryButton type="submit"> Submit</PrimaryButton>
      </form>
    </MainContainer>
  );
};
