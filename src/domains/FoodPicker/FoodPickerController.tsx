import { InputRow, PrimaryButton, TextInput } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
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

  console.log(watch("First Name")); // watch input value by passing the name of it
  return (
    <MainContainer>
      <h1>Food Picker</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputRow>
          <Controller
            name="First Name"
            control={control}
            defaultValue=""
            rules={{ required: "First name required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput label="First Name" value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="Last Name"
            control={control}
            defaultValue=""
            rules={{ required: "Last name required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput label="Last Name" value={value} onChange={onChange} />
            )}
          />
        </InputRow>
        <PrimaryButton type="submit"> Submit</PrimaryButton>
      </form>
    </MainContainer>
  );
};
