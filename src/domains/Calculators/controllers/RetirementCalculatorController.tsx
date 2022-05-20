import React from "react";
import { Calculator } from "../components/Calculator";
import { RETIREMENT_CALCULATOR_FIELDS_METADATA } from "../helpers/calculatorDefinitions";
import { formatDollars } from "../helpers/formatters";
import { useCalculatorInputForm } from "../helpers/useCalculatorInputForm";


type RetirementCalculatorControllerProps = {};

export const RetirementCalculatorController = ({}: RetirementCalculatorControllerProps) => {

  const { inputFieldsState: fields, handleChange } = useCalculatorInputForm(
    RETIREMENT_CALCULATOR_FIELDS_METADATA
  );
  const [result, setResult] = React.useState(0);

  const calculate = () => {
    var answer = 10
    setResult(answer);
  };

  const explanation: () => React.ReactNode = () => {
    return (
    <>
      <div>
          assuming a 6% ROI, you would need to put away this amount 
          <br/>
          every month for {parseInt(fields.get("targetYears"))} years to retire with {formatDollars(parseFloat(fields.get("targetAmount")))}
        </div>
        <br />
    </>);
  }


  return <Calculator 
          result={formatDollars(result)}
          explanation={explanation()}
          calculate={calculate}
          fields={fields}
          fieldsMetadata={RETIREMENT_CALCULATOR_FIELDS_METADATA}
          onChange={handleChange}
          />;
};
    