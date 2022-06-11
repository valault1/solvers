import { Button } from "@mui/material";
import {
  CalculatorFieldsWrapper,
  MainCalculatorContainer,
  ResultWrapper,
} from "domains/Calculators/components/Calculator.elements";
import { InputFieldComponent } from "domains/Calculators/components/InputField";
import { getFieldMetadataByName } from "domains/Calculators/helpers/getFieldMetadata";
import {
  InputFieldsState,
  FieldMetadata,
} from "domains/Calculators/sharedTypes";
import React from "react";

type CalculatorProps = {
  result: React.ReactNode;
  explanation: React.ReactNode;
  calculate: () => void;
  fields: InputFieldsState;
  onChange: ({ name, value }: { name: string; value: any }) => void;
  fieldsMetadata: FieldMetadata[];
};
export const Calculator = ({
  result,
  explanation,
  calculate,
  fields,
  onChange,
  fieldsMetadata,
}: CalculatorProps) => {
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
        <CalculatorFieldsWrapper>
          {Array.from(fields.keys()).map((key) => {
            return (
              <InputFieldComponent
                field={{
                  ...getFieldMetadataByName(fieldsMetadata, key),
                  value: fields.get(key),
                }}
                onChange={onChange}
              />
            );
          })}
          <Button variant="contained" onClick={calculate}>
            Submit
          </Button>
        </CalculatorFieldsWrapper>
        <ResultWrapper>
          {explanation}
          {result}
        </ResultWrapper>
      </MainCalculatorContainer>
    </>
  );
};
