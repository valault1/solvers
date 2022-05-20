import { Button } from "@mui/material";
import React from "react";
import { formatDollars } from "../helpers/formatters";
import { getFieldMetadataByName } from "../helpers/getFieldMetadata";
import { InputFieldComponent } from "./InputField";
import { useCalculatorInputForm } from "../helpers/useCalculatorInputForm";
import { FieldType, FieldMetadata, InputFieldsState } from "../sharedTypes";
import {
  FieldsWrapper,
  MainCalculatorContainer,
  ResultWrapper,
} from "./Calculator.elements";



type CalculatorProps = {
  result: React.ReactNode,
  explanation: React.ReactNode,
  calculate: () => void,
  fields: InputFieldsState,
  onChange: ({name, value}: {name: string, value: any}) => void,
  fieldsMetadata: FieldMetadata[]
};
export const Calculator =
  ({result, explanation, calculate, fields, onChange, fieldsMetadata}: CalculatorProps) => {
    // DEBUG-----------------------------------------------------
    const fieldNames = Array.from(fields.keys());
    const fieldsAsList = fieldNames.map((key) => [key, fields.get(key)]);
    // DEBUG-----------------------------------------------------



    React.useEffect(() => {
      calculate();
    }, [fields]);

    return (
      <>
        <MainCalculatorContainer>
          <FieldsWrapper>
            {Array.from(fields.keys()).map((key) => {
              return (
                <InputFieldComponent
                  field={{
                    ...getFieldMetadataByName(
                      fieldsMetadata,
                      key
                    ),
                    value: fields.get(key),
                  }}
                  onChange={onChange}
                />
              );
            })}
            <Button variant="contained" onClick={calculate}>Submit</Button>
          </FieldsWrapper>
          <ResultWrapper>
            {explanation}
            {result}
          </ResultWrapper>
        </MainCalculatorContainer>
      </>
    );
  };
