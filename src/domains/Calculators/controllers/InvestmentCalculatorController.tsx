import React from "react";
import { INVESTMENT_CALCULATOR_FIELDS_METADATA } from "../helpers/calculatorDefinitions";
import { Calculator } from "../components/Calculator";
import { formatDollars } from "../helpers/formatters";
import { useCalculatorInputForm } from "../helpers/useCalculatorInputForm";

type CalculatorControllerProps = {};

export const InvestmentCalculatorController = ({}: CalculatorControllerProps) => {

  const { inputFieldsState: fields, handleChange } = useCalculatorInputForm(
    INVESTMENT_CALCULATOR_FIELDS_METADATA
  );
  const [result, setResult] = React.useState(0);

  const calculate = () => {
    var answer = parseFloat(fields.get("startingBalance"));
    const numMonths = parseInt(fields.get("numberYears")) * 12;
    const periodInterestRate =
      1 + parseFloat(fields.get("interestRate")) / 12;
    const monthlyDeposit = parseFloat(fields.get("monthlyDeposit"));
    for (let i = 0; i < numMonths; i++) {
      answer += monthlyDeposit;
      answer *= periodInterestRate;
    }
    setResult(answer);
  };

  const explanation: () => React.ReactNode = () => {
    return (
    <>
      <div>
          If you start with{" "}
          {formatDollars(parseFloat(fields.get("startingBalance")))}, after
          investing {formatDollars(parseFloat(fields.get("monthlyDeposit")))}{" "}
          every month <br />
          for {fields.get("numberYears")} years, assuming a{" "}
          {parseFloat(fields.get("interestRate")) * 100}% ROI, you would have:
        </div>
        <br />
    </>);
  }


  return <Calculator 
          result={formatDollars(result)}
          explanation={explanation()}
          calculate={calculate}
          fields={fields}
          fieldsMetadata={INVESTMENT_CALCULATOR_FIELDS_METADATA}
          onChange={handleChange}
          />;
};
    