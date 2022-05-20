// A hook to let you use all features of a form with unknown fields, accessing by name
import * as React from "react";
import { FieldType, FieldMetadata, InputFieldsState } from "../sharedTypes";

export const useCalculatorInputForm = (inputFields: FieldMetadata[]) => {
  const initialState = inputFields.reduce<InputFieldsState>(
    (result, nextField) => {
      if (nextField.type === FieldType.NUMBER) result.set(nextField.name, 0);
      else if (nextField.type === FieldType.BOOLEAN)
        result.set(nextField.name, false);
      else if (nextField.type === FieldType.STRING)
        result.set(nextField.name, "");
      return result;
    },
    new Map<string, any>()
  );

  const [inputFieldsState, setInputFieldsState] = React.useState(initialState);

  const handleChange = React.useCallback(
    ({ name, value }: { name: string; value: any }) => {
      var newInputFieldsState = new Map(inputFieldsState);
      newInputFieldsState.set(name, value);
      setInputFieldsState(newInputFieldsState);
    },
    [inputFieldsState, setInputFieldsState]
  );
  //todo: allow error validators
  const inputFieldsErrors = new Map<string, string | undefined>();
  return {
    handleChange,
    inputFieldsState,
    inputFieldsErrors,
  };
};
