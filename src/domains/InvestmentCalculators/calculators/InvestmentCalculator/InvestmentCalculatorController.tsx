import { Button } from "@mui/material";
import React from "react";
import { formatDollars } from "../../helpers/formatters";
import { getFieldMetadataByName } from "../../helpers/getFieldMetadata";
import { InputFieldComponent } from "../../helpers/InputFieldComponent";
import { useCalculatorInputForm } from "../../helpers/useCalculatorInputForm";
import { FieldType, FieldMetadata } from "../../sharedTypes";
import { FieldsWrapper, MainCalculatorContainer } from "./InvestmentCalculator.elements";
type InvestmentCalculatorControllerProps = {};

export const INVESTMENT_CALCULATOR_FIELDS: FieldMetadata[] = [
  {
    name: "interestRate",
    label: "Interest Rate",
    type: FieldType.NUMBER
  },
  {
    name: "monthlyDeposit",
    label: "Monthly Deposit",
    type: FieldType.NUMBER
  },
  {
    name: "numberYears",
    label: "Number of Years",
    type: FieldType.NUMBER
  },

]



export const InvestmentCalculatorController =
  ({}: InvestmentCalculatorControllerProps) => {
    const {inputFieldsState: fields, handleChange} = useCalculatorInputForm(INVESTMENT_CALCULATOR_FIELDS);
    const [result, setResult] = React.useState(0);
    // DEBUG-----------------------------------------------------
    console.log(fields);
    const fieldNames = Array.from(fields.keys());
    const fieldsAsList = fieldNames.map((key) => [key, fields.get(key)])
    // DEBUG-----------------------------------------------------

    const calculate = () => {
      var answer = 0;
      const numMonths = parseInt(fields.get("numberYears")) * 12;
      const periodInterestRate = 1 + (parseFloat(fields.get("interestRate")) / 12);
      const monthlyDeposit = parseFloat(fields.get("monthlyDeposit"));
      console.log({numMonths, monthlyDeposit, periodInterestRate, interest: fields.get("interestRate")})
      for (let i=0; i < numMonths; i++) {
        console.log({i, answer});
        answer += monthlyDeposit;
        answer *= periodInterestRate;
      }
      setResult(answer);
    }

    React.useEffect(() => {
      calculate();
    }, [fields])



    return (
    <>
    <MainCalculatorContainer>
      <FieldsWrapper >
        {Array.from(fields.keys()).map((key) => {
          return <InputFieldComponent 
            field={{...getFieldMetadataByName(INVESTMENT_CALCULATOR_FIELDS, key), value: fields.get(key)}}
            onChange={handleChange}
          />
        })}
        <Button onClick={calculate}>Submit</Button>
      </FieldsWrapper>
      <div>After investing {formatDollars(parseFloat(fields.get("monthlyDeposit")))} every month for {fields.get("numberYears")} years,<br></br> assuming a {parseFloat(fields.get("interestRate")) *100}% ROI, you would have:</div>
      {formatDollars(result)}
      </MainCalculatorContainer>
    </>);
  };

