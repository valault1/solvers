import { FieldMetadata, FieldType } from "domains/Calculators/sharedTypes";

export const INVESTMENT_CALCULATOR_FIELDS_METADATA: FieldMetadata[] = [
  {
    name: "startingBalance",
    label: "Starting Balance",
    type: FieldType.NUMBER,
  },
  {
    name: "interestRate",
    label: "Interest Rate",
    type: FieldType.NUMBER,
  },
  {
    name: "monthlyDeposit",
    label: "Monthly Deposit",
    type: FieldType.NUMBER,
  },
  {
    name: "numberYears",
    label: "Number of Years",
    type: FieldType.NUMBER,
  },
];

export const RETIREMENT_CALCULATOR_FIELDS_METADATA: FieldMetadata[] = [
  {
    name: "targetYears",
    label: "Years before you retire",
    type: FieldType.NUMBER,
  },
  {
    name: "targetAmount",
    label: "Amount to retire with",
    type: FieldType.NUMBER,
  },
];
