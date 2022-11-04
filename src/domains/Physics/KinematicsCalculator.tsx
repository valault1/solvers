import styled from "@emotion/styled";
import { Button, Radio, Switch } from "@mui/material";
import { PrimaryButton } from "components/Form.elements";
import { MainContainer } from "components/MainPage.elements";
import { FormsSwitch } from "components/rhf/FormsSwitch";
import { FormsTextInput } from "components/rhf/FormsTextInput";
import { TabsComponent } from "components/Tabs";
import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

type KinematicsCalculatorData = {
  knowsVelocityInitial: boolean;
  knowsVelocityFinal: boolean;
  knowsAcceleration: boolean;
  knowsDistance: boolean;
  knowsTime: boolean;
  velocityFinal: number;
  velocityInitial: number;
  acceleration: number;
  distance: number;
  time: number;
};

const RowWrapper = styled.div(() => ({
  display: "flex",
  flexDirection: "row",
}));

export const KinematicsCalculator: React.VFC = () => {
  const { control, getValues } = useForm<KinematicsCalculatorData>({
    defaultValues: {},
  });
  const values = useWatch({ control });
  const numValuesKnown = React.useMemo(() => {
    let result = 0;
    result += values.knowsVelocityInitial ? 1 : 0;
    result += values.knowsVelocityFinal ? 1 : 0;
    result += values.knowsAcceleration ? 1 : 0;
    result += values.knowsDistance ? 1 : 0;
    result += values.knowsTime ? 1 : 0;
    return result;
  }, [values]);
  const isDisabled = (name: keyof typeof values) =>
    numValuesKnown >= 3 && !values[name];
  return (
    <>
      {"Which values do you know? (Select 3)"}
      <RowWrapper>
        <FormsSwitch
          control={control}
          label="Initial Velocity (Vf)"
          name="knowsVelocityInitial"
          disabled={isDisabled("knowsVelocityInitial")}
        />
        <FormsSwitch
          control={control}
          label="Final Velocity (Vi)"
          name="knowsVelocityFinal"
          disabled={isDisabled("knowsVelocityFinal")}
        />
        <FormsSwitch
          control={control}
          label="Time (t)"
          name="knowsTime"
          disabled={isDisabled("knowsTime")}
        />
        <FormsSwitch
          control={control}
          label="Distance (Δx)"
          name="knowsDistance"
          disabled={isDisabled("knowsDistance")}
        />
        <FormsSwitch
          control={control}
          label="Acceleration (a)"
          name="knowsAcceleration"
          disabled={isDisabled("knowsAcceleration")}
        />
      </RowWrapper>
      {values.knowsVelocityInitial && (
        <FormsTextInput
          control={control}
          label="Initial Velocity"
          name={"velocityInitial"}
          type="number"
        />
      )}
      {values.knowsVelocityFinal && (
        <FormsTextInput
          control={control}
          label="Final Velocity"
          name={"velocityFinal"}
          type="number"
        />
      )}
      {values.knowsAcceleration && (
        <FormsTextInput
          control={control}
          label="Acceleration"
          name={"acceleration"}
          type="number"
        />
      )}
      {values.knowsTime && (
        <FormsTextInput
          control={control}
          label="Time"
          name={"time"}
          type="number"
        />
      )}
      {values.knowsDistance && (
        <FormsTextInput
          control={control}
          label="Distance"
          name={"distance"}
          type="number"
        />
      )}
      <PrimaryButton> Submit</PrimaryButton>
    </>
  );
};
